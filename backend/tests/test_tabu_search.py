import pytest
from backend.app.services.tabu_search_solver import CreditSource, TabuSearchKnapsack


def test_tabu_search_knapsack():
    sources = [
        CreditSource(source_id="S1", name="Instant App 1", amount=25000, apr=38.0, speed_hours=0.5, stress_penalty=40, is_predatory=True),
        CreditSource(source_id="S2", name="Hospital Trust", amount=30000, apr=0.0, speed_hours=6.0, stress_penalty=0, is_predatory=False),
        CreditSource(source_id="S3", name="Credit Card Adv", amount=20000, apr=42.0, speed_hours=1.0, stress_penalty=30, is_predatory=True),
        CreditSource(source_id="S4", name="NBFC Low-Cost", amount=40000, apr=11.5, speed_hours=24.0, stress_penalty=5, is_predatory=False),
    ]

    solver = TabuSearchKnapsack(target_amount=50000.0, sources=sources, max_iterations=50)
    res = solver.solve()

    assert res.total_amount >= 30000.0
    assert "S2" in res.selected_source_ids  # Should prefer 0% APR Hospital Trust
    assert res.weighted_apr < 35.0
