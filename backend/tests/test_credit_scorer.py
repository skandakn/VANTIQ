"""
Unit tests for VANTIQ Cashflow Credit Scorer
"""

import pytest
from app.services.credit_scoring import credit_scorer


def test_credit_scorer_prime():
    res = credit_scorer.score_borrower(
        monthly_salary=95000.0,
        active_emis=8000.0,
        rent_expense=18000.0,
        living_burn=16000.0,
        liquid_savings=120000.0,
        shock_amount=40000.0,
        tenure_months=6,
    )
    assert res["vantiq_cashflow_score"] >= 750
    assert res["solvency_tier"] == "Prime Solvency"
    assert res["calibrated_default_risk_percent"] < 10.0


def test_credit_scorer_distress():
    res = credit_scorer.score_borrower(
        monthly_salary=28000.0,
        active_emis=14000.0,
        rent_expense=10000.0,
        living_burn=8000.0,
        liquid_savings=2000.0,
        shock_amount=60000.0,
        tenure_months=3,
    )
    assert res["vantiq_cashflow_score"] < 600
    assert res["solvency_tier"] in ("Moderate Vulnerability", "Acute Distress")
