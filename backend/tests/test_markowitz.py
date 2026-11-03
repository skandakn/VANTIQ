import pytest
from backend.quant.markowitz_efficient_frontier import (
    MarkowitzOptimizer,
    LiquidityAsset,
)


def test_markowitz_optimizer():
    assets = [
        LiquidityAsset(asset_name="Liquid Cash", expected_annual_return_pct=3.5, volatility_annual_pct=0.5, liquidation_speed_hours=0.0, early_exit_penalty_pct=0.0),
        LiquidityAsset(asset_name="Liquid Mutual Fund", expected_annual_return_pct=6.8, volatility_annual_pct=1.8, liquidation_speed_hours=24.0, early_exit_penalty_pct=0.0),
        LiquidityAsset(asset_name="Fixed Deposit (Short)", expected_annual_return_pct=7.2, volatility_annual_pct=1.0, liquidation_speed_hours=48.0, early_exit_penalty_pct=1.0),
    ]

    opt = MarkowitzOptimizer(assets)
    min_var = opt.optimize_minimum_variance()
    max_sharpe = opt.optimize_maximum_sharpe()

    assert min_var.portfolio_volatility_pct < 2.5
    assert max_sharpe.expected_return_pct > 3.0
    assert len(min_var.weights) == 3
