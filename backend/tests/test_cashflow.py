"""
Unit tests for 90-Day Cashflow Digital Twin Simulator
"""

import pytest
from app.schemas.cashflow import CashflowSimRequest
from app.services.cashflow_twin import cashflow_simulator


def test_cashflow_simulation_collision_and_solvency():
    req = CashflowSimRequest(
        monthly_income=68500.0,
        fixed_living_costs=31600.0,
        existing_emis=11200.0,
        current_savings=31000.0,
        shock_amount=50000.0,
        tenure_months=6,
        horizon_days=90,
    )

    res = cashflow_simulator.simulate(req)

    assert len(res.points) == 91, "Should have Day 0 through Day 90 (91 points)"
    assert res.points[0].day == 0
    assert res.points[-1].day == 90
    assert res.day_90_vantiq_balance > res.day_90_naive_balance, "VANTIQ balance should exceed naive path"
    assert res.solvency_delta > 0.0, "Solvency delta must be strictly positive"
    assert res.default_collision_day_naive in range(25, 45), "Collision should occur around Day 30-35"
