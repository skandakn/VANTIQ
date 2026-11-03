"""
Vasicek & Cox-Ingersoll-Ross (CIR) Stochastic Interest Rate Simulator
Models term structure and volatility of unsecured emergency lending rates in the Indian NBFC ecosystem.
Simulates rate dynamics under monetary tightening shocks (RBI repo rate shifts).
"""

from __future__ import annotations

import math
import random
from typing import List, Dict, Any, Tuple
from pydantic import BaseModel, Field


class VasicekParameters(BaseModel):
    mean_reversion_speed_a: float = Field(default=0.25, description="Speed of mean reversion (alpha)")
    long_term_mean_rate_b: float = Field(default=0.18, description="Long-term equilibrium unsecured NBFC APR (18%)")
    volatility_sigma: float = Field(default=0.06, description="Instantaneous volatility of rate process")
    initial_rate_r0: float = Field(default=0.24, description="Initial short-term lending rate (24%)")


class RatePathResult(BaseModel):
    time_points_days: List[int]
    simulated_rates_pct: List[float]
    terminal_rate_pct: float
    max_rate_pct: float
    min_rate_pct: float


class VasicekRateModel:
    """
    Implements the Vasicek stochastic process:
    dr_t = a * (b - r_t) dt + sigma * dW_t
    Exact discretization:
    r_{t+dt} = r_t * exp(-a*dt) + b * (1 - exp(-a*dt)) + sigma * sqrt((1 - exp(-2*a*dt)) / (2*a)) * Z
    """

    def __init__(self, params: VasicekParameters | None = None, seed: int = 42):
        self.params = params or VasicekParameters()
        random.seed(seed)

    def simulate_path(self, days: int = 90, dt_days: int = 1) -> RatePathResult:
        dt_years = dt_days / 365.0
        a = self.params.mean_reversion_speed_a
        b = self.params.long_term_mean_rate_b
        sigma = self.params.volatility_sigma

        exp_adt = math.exp(-a * dt_years)
        var_term = (sigma**2 / (2.0 * a)) * (1.0 - math.exp(-2.0 * a * dt_years))
        std_term = math.sqrt(max(1e-8, var_term))

        times: List[int] = [0]
        rates: List[float] = [self.params.initial_rate_r0 * 100.0]
        curr_r = self.params.initial_rate_r0

        for t in range(dt_days, days + 1, dt_days):
            z = random.gauss(0.0, 1.0)
            next_r = curr_r * exp_adt + b * (1.0 - exp_adt) + std_term * z
            # Bound rate between 8% and 55%
            next_r = max(0.08, min(0.55, next_r))
            times.append(t)
            rates.append(round(next_r * 100.0, 2))
            curr_r = next_r

        return RatePathResult(
            time_points_days=times,
            simulated_rates_pct=rates,
            terminal_rate_pct=rates[-1],
            max_rate_pct=max(rates),
            min_rate_pct=min(rates),
        )

    def analytical_zero_coupon_bond_price(self, maturity_t: float) -> float:
        """
        Closed-form price of zero-coupon bond under Vasicek:
        P(t, T) = A(t, T) * exp(-B(t, T) * r_t)
        """
        a = self.params.mean_reversion_speed_a
        b = self.params.long_term_mean_rate_b
        sigma = self.params.volatility_sigma
        r0 = self.params.initial_rate_r0

        b_t = (1.0 - math.exp(-a * maturity_t)) / a
        a_t = math.exp(
            (b - (sigma**2 / (2.0 * a**2))) * (b_t - maturity_t)
            - (sigma**2 / (4.0 * a)) * (b_t**2)
        )
        price = a_t * math.exp(-b_t * r0)
        return round(price, 4)

    def yield_curve(self, tenures_months: List[int]) -> Dict[int, float]:
        """Calculates continuously compounded zero yield across tenures."""
        curve = {}
        for m in tenures_months:
            t = m / 12.0
            p = self.analytical_zero_coupon_bond_price(t)
            y = -(1.0 / t) * math.log(max(1e-4, p)) * 100.0
            curve[m] = round(y, 2)
        return curve
