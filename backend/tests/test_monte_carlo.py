import pytest
from backend.app.services.monte_carlo_engine import MonteCarloEngine, MonteCarloSimulationConfig


def test_monte_carlo_simulation():
    config = MonteCarloSimulationConfig(num_paths=100, horizon_days=30, seed=42)
    engine = MonteCarloEngine(config=config)

    res = engine.run_simulation(
        starting_cash=20000.0,
        monthly_income=50000.0,
        monthly_expenses=32000.0,
        emergency_amount=40000.0,
    )

    assert res.uncoordinated_metrics.insolvency_probability >= 0.0
    assert res.vantiq_metrics.insolvency_probability <= res.uncoordinated_metrics.insolvency_probability
    assert res.delta_insolvency_reduction_pct >= 0.0
    assert len(res.sample_paths_uncoordinated) == 5
    assert len(res.sample_paths_vantiq) == 5
