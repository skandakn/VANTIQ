"""
Unit tests for Credit Bureau Reporting Lag Simulator
"""

import pytest
from app.services.credit_bureau_simulator import bureau_lag_simulator


def test_bureau_lag_simulation_output():
    res = bureau_lag_simulator.simulate_lag(applicant_income=68500.0, initial_cibil=742)
    assert res["initial_cibil_score"] == 742
    assert res["cibil_score_drop"] > 100
    assert res["total_stacked_debt"] == 75000.0
    assert len(res["asymmetry_timeline"]) == 3
