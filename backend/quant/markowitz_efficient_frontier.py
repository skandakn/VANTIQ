"""
Markowitz Mean-Variance Portfolio Optimizer for Emergency Liquidity Reserves
Calculates the efficient frontier balancing liquidity yield against disbursement latency and tail risk.
Used to structure optimal liquidity reserves across cash, liquid mutual funds, FD, and gold.
"""

from __future__ import annotations

import math
from typing import List, Dict, Any, Tuple
from pydantic import BaseModel, Field


class LiquidityAsset(BaseModel):
    asset_name: str
    expected_annual_return_pct: float
    volatility_annual_pct: float
    liquidation_speed_hours: float
    early_exit_penalty_pct: float


class PortfolioAllocation(BaseModel):
    weights: Dict[str, float]
    expected_return_pct: float
    portfolio_volatility_pct: float
    sharpe_ratio: float
    weighted_liquidation_hours: float


class MarkowitzOptimizer:
    """
    Mean-variance optimizer solving quadratic optimization for emergency buffers.
    """

    def __init__(
        self,
        assets: List[LiquidityAsset],
        correlation_matrix: List[List[float]] | None = None,
        risk_free_rate_pct: float = 6.5,
    ):
        self.assets = assets
        self.n = len(assets)
        self.rf = risk_free_rate_pct

        if correlation_matrix is not None:
            self.corr = correlation_matrix
        else:
            # Default mild correlations
            self.corr = [
                [1.0 if i == j else 0.15 for j in range(self.n)]
                for i in range(self.n)
            ]

        # Construct covariance matrix
        self.cov = [[0.0] * self.n for _ in range(self.n)]
        for i in range(self.n):
            for j in range(self.n):
                sig_i = self.assets[i].volatility_annual_pct
                sig_j = self.assets[j].volatility_annual_pct
                self.cov[i][j] = self.corr[i][j] * sig_i * sig_j

    def compute_portfolio_stats(self, weights: List[float]) -> Tuple[float, float, float, float]:
        """Returns (ret, vol, sharpe, speed_hours)"""
        ret = sum(w * self.assets[i].expected_annual_return_pct for i, w in enumerate(weights))

        var = 0.0
        for i in range(self.n):
            for j in range(self.n):
                var += weights[i] * weights[j] * self.cov[i][j]
        vol = math.sqrt(max(0.0, var))

        sharpe = (ret - self.rf) / max(0.01, vol)
        speed = sum(w * self.assets[i].liquidation_speed_hours for i, w in enumerate(weights))

        return (ret, vol, sharpe, speed)

    def optimize_minimum_variance(self) -> PortfolioAllocation:
        """
        Numerically approximates global minimum variance portfolio using grid search / gradient projection.
        """
        best_vol = 1e9
        best_w = [1.0 / self.n] * self.n

        # Monte Carlo sampling on simplex
        import random
        random.seed(42)
        for _ in range(2500):
            raw = [random.expovariate(1.0) for _ in range(self.n)]
            tot = sum(raw)
            w = [r / tot for r in raw]
            _, vol, _, _ = self.compute_portfolio_stats(w)
            if vol < best_vol:
                best_vol = vol
                best_w = w

        ret, vol, sharpe, speed = self.compute_portfolio_stats(best_w)
        return PortfolioAllocation(
            weights={self.assets[i].asset_name: round(best_w[i], 4) for i in range(self.n)},
            expected_return_pct=round(ret, 2),
            portfolio_volatility_pct=round(vol, 2),
            sharpe_ratio=round(sharpe, 3),
            weighted_liquidation_hours=round(speed, 2),
        )

    def optimize_maximum_sharpe(self) -> PortfolioAllocation:
        """Finds tangency portfolio maximizing Sharpe ratio."""
        best_sharpe = -1e9
        best_w = [1.0 / self.n] * self.n

        import random
        random.seed(42)
        for _ in range(3500):
            raw = [random.expovariate(1.0) for _ in range(self.n)]
            tot = sum(raw)
            w = [r / tot for r in raw]
            _, _, sharpe, _ = self.compute_portfolio_stats(w)
            if sharpe > best_sharpe:
                best_sharpe = sharpe
                best_w = w

        ret, vol, sharpe, speed = self.compute_portfolio_stats(best_w)
        return PortfolioAllocation(
            weights={self.assets[i].asset_name: round(best_w[i], 4) for i in range(self.n)},
            expected_return_pct=round(ret, 2),
            portfolio_volatility_pct=round(vol, 2),
            sharpe_ratio=round(sharpe, 3),
            weighted_liquidation_hours=round(speed, 2),
        )

    def generate_efficient_frontier(self, points: int = 15) -> List[PortfolioAllocation]:
        """Generates risk-return frontier points."""
        frontier: List[PortfolioAllocation] = []
        import random
        random.seed(101)

        samples = []
        for _ in range(5000):
            raw = [random.expovariate(1.0) for _ in range(self.n)]
            tot = sum(raw)
            w = [r / tot for r in raw]
            ret, vol, sharpe, speed = self.compute_portfolio_stats(w)
            samples.append((ret, vol, sharpe, speed, w))

        # Sort by return and find minimum vol in bins
        samples.sort(key=lambda s: s[0])
        bin_size = max(1, len(samples) // points)

        for b in range(points):
            subset = samples[b * bin_size : (b + 1) * bin_size]
            if not subset:
                continue
            best = min(subset, key=lambda s: s[1])
            ret, vol, sharpe, speed, w = best
            frontier.append(
                PortfolioAllocation(
                    weights={self.assets[i].asset_name: round(w[i], 4) for i in range(self.n)},
                    expected_return_pct=round(ret, 2),
                    portfolio_volatility_pct=round(vol, 2),
                    sharpe_ratio=round(sharpe, 3),
                    weighted_liquidation_hours=round(speed, 2),
                )
            )

        return frontier
