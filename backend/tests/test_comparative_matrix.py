"""
Unit tests for Comparative Rescue Matrix Engine
"""

import pytest
from app.services.comparative_matrix import comparative_engine


def test_comparative_matrix_savings():
    res = comparative_engine.compare(shock_amount=50000.0, tenure_months=6, salary=68500.0)
    assert res["net_household_savings_inr"] > 10000.0, "Must demonstrate significant net savings vs payday apps"
    assert res["labor_hours_saved"] > 20.0
    assert len(res["comparison_table"]) == 7, "Must contain all 7 comparison dimensions"
