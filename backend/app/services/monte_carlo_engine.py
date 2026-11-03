"""
VANTIQ Monte Carlo Stochastic Cashflow & Jump Diffusion Engine
Simulates forward-looking insolvency probability using Jump-Diffusion (Merton model)
and stochastic geometric Brownian motion for household cash balances under medical emergency shocks.
"""

from __future__ import annotations

import math
import random
from typing import List, Dict, Any, Tuple
from pydantic import BaseModel, Field


class MonteCarloSimulationConfig(BaseModel):
    num_paths: int = Field(default=1000, description="Number of stochastic simulated paths")
    horizon_days: int = Field(default=90, description="Simulation horizon in days")
    drift_annual: float = Field(default=0.04, description="Expected annual real cash balance drift")
    volatility_annual: float = Field(default=0.25, description="Annualized volatility of discretionary expenses")
    jump_intensity: float = Field(default=0.08, description="Poisson arrival intensity of secondary shock")
    jump_mean: float = Field(default=-15000.0, description="Mean severity of unexpected medical expense (INR)")
    jump_std: float = Field(default=8000.0, description="Standard deviation of unexpected shock (INR)")
    seed: int | None = Field(default=42, description="Random seed for reproducibility")


class PathMetrics(BaseModel):
    final_balance_p05: float
    final_balance_p25: float
    final_balance_p50: float
    final_balance_p75: float
    final_balance_p95: float
    insolvency_probability: float
    value_at_risk_95: float
    conditional_var_95: float
    median_days_to_insolvency: float | None


class MonteCarloResult(BaseModel):
    config: MonteCarloSimulationConfig
    uncoordinated_metrics: PathMetrics
    vantiq_metrics: PathMetrics
    delta_insolvency_reduction_pct: float
    sample_paths_uncoordinated: List[List[float]]
    sample_paths_vantiq: List[List[float]]
    summary_text: str


class MonteCarloEngine:
    """
    Monte Carlo stochastic simulator implementing jump-diffusion processes
    to model household cashflow trajectories under high-stress emergency liquidity shocks.
    """

    def __init__(self, config: MonteCarloSimulationConfig | None = None):
        self.config = config or MonteCarloSimulationConfig()
        if self.config.seed is not None:
            random.seed(self.config.seed)

    def _simulate_single_path(
        self,
        starting_cash: float,
        monthly_income: float,
        monthly_expenses: float,
        monthly_debt_service: float,
        is_coordinated: bool,
    ) -> List[float]:
        """
        Simulate a single 90-day trajectory.
        If is_coordinated, interest rate is capped and repayment schedule is structured (VANTIQ model).
        If uncoordinated, fragmented high-APR auto-debits trigger cash draining and default spirals.
        """
        dt = 1.0 / 365.0
        daily_drift = self.config.drift_annual * dt
        daily_vol = self.config.volatility_annual * math.sqrt(dt)

        # Baseline net daily cash flow
        net_monthly_operating = monthly_income - monthly_expenses
        daily_operating = net_monthly_operating / 30.0

        daily_debt_drain = monthly_debt_service / 30.0
        if is_coordinated:
            # VANTIQ optimization smooths outflows and cuts predatory penalties
            daily_debt_drain *= 0.58

        path: List[float] = [starting_cash]
        current_balance = starting_cash

        for day in range(1, self.config.horizon_days + 1):
            # Monthly paycheck arrival on Day 30 and Day 60
            if day in (30, 60):
                current_balance += monthly_income * 0.95  # net after withholding

            # Brownian motion shock
            z = random.gauss(0.0, 1.0)
            diffusion = current_balance * (daily_drift + daily_vol * z) if current_balance > 0 else (daily_drift + daily_vol * z) * 1000

            # Jump shock (Poisson process: secondary medical crisis / pharmacy refill)
            jump = 0.0
            if random.random() < (self.config.jump_intensity / 30.0):
                jump_shock = random.gauss(self.config.jump_mean, self.config.jump_std)
                # Uncoordinated loans cannot absorb jumps; VANTIQ buffers absorb 60% through insurance/CSR
                jump = jump_shock * (0.35 if is_coordinated else 1.0)

            # Scheduled debt auto-debit collisions (Day 15, Day 30, Day 32, Day 35)
            collision_penalty = 0.0
            if not is_coordinated and day in (15, 30, 32, 35):
                # Predatory bounce fees + compounding interest penalty
                collision_penalty = 1250.0

            current_balance = current_balance + daily_operating - daily_debt_drain + diffusion + jump - collision_penalty
            path.append(round(current_balance, 2))

        return path

    def run_simulation(
        self,
        starting_cash: float,
        monthly_income: float,
        monthly_expenses: float,
        emergency_amount: float,
    ) -> MonteCarloResult:
        """
        Run parallel Monte Carlo paths for both Uncoordinated and VANTIQ scenarios.
        """
        initial_balance = max(0.0, starting_cash - (emergency_amount * 0.20))
        uncoordinated_monthly_debt = emergency_amount * 0.38  # 36%-48% APR short tenure
        vantiq_monthly_debt = emergency_amount * 0.16         # 12%-14% APR buffered multi-tranche

        uncoord_paths: List[List[float]] = []
        vantiq_paths: List[List[float]] = []

        for _ in range(self.config.num_paths):
            uncoord_paths.append(
                self._simulate_single_path(
                    starting_cash=initial_balance,
                    monthly_income=monthly_income,
                    monthly_expenses=monthly_expenses,
                    monthly_debt_service=uncoordinated_monthly_debt,
                    is_coordinated=False,
                )
            )
            vantiq_paths.append(
                self._simulate_single_path(
                    starting_cash=initial_balance,
                    monthly_income=monthly_income,
                    monthly_expenses=monthly_expenses,
                    monthly_debt_service=vantiq_monthly_debt,
                    is_coordinated=True,
                )
            )

        uncoord_metrics = self._calculate_metrics(uncoord_paths, initial_balance)
        vantiq_metrics = self._calculate_metrics(vantiq_paths, initial_balance)

        delta_reduction = round(
            max(0.0, uncoord_metrics.insolvency_probability - vantiq_metrics.insolvency_probability) * 100.0, 1
        )

        return MonteCarloResult(
            config=self.config,
            uncoordinated_metrics=uncoord_metrics,
            vantiq_metrics=vantiq_metrics,
            delta_insolvency_reduction_pct=delta_reduction,
            sample_paths_uncoordinated=uncoord_paths[:5],
            sample_paths_vantiq=vantiq_paths[:5],
            summary_text=(
                f"Across {self.config.num_paths} stochastic Monte Carlo trajectories over {self.config.horizon_days} days, "
                f"uncoordinated fragmented lending results in a {uncoord_metrics.insolvency_probability*100:.1f}% default rate. "
                f"VANTIQ coordinated structuring reduces insolvency risk to {vantiq_metrics.insolvency_probability*100:.1f}%, "
                f"yielding an absolute risk abatement of {delta_reduction}%."
            ),
        )

    def _calculate_metrics(self, paths: List[List[float]], initial_cash: float) -> PathMetrics:
        final_balances = sorted([p[-1] for p in paths])
        num_paths = len(paths)

        def percentile(p: float) -> float:
            idx = int(p * (num_paths - 1))
            return final_balances[idx]

        # Calculate insolvency
        insolvent_count = sum(1 for p in paths if min(p) < 0)
        insolvency_prob = round(insolvent_count / num_paths, 4)

        # Days to insolvency
        days_to_insolvency: List[int] = []
        for p in paths:
            for day, balance in enumerate(p):
                if balance < 0:
                    days_to_insolvency.append(day)
                    break

        median_days = None
        if days_to_insolvency:
            days_to_insolvency.sort()
            median_days = float(days_to_insolvency[len(days_to_insolvency) // 2])

        # Value at Risk 95%
        losses = sorted([initial_cash - b for b in final_balances], reverse=True)
        var_idx = int(0.05 * num_paths)
        var_95 = max(0.0, losses[var_idx])
        cvar_95 = max(0.0, sum(losses[:var_idx + 1]) / max(1, var_idx + 1))

        return PathMetrics(
            final_balance_p05=round(percentile(0.05), 2),
            final_balance_p25=round(percentile(0.25), 2),
            final_balance_p50=round(percentile(0.50), 2),
            final_balance_p75=round(percentile(0.75), 2),
            final_balance_p95=round(percentile(0.95), 2),
            insolvency_probability=insolvency_prob,
            value_at_risk_95=round(var_95, 2),
            conditional_var_95=round(cvar_95, 2),
            median_days_to_insolvency=median_days,
        )
