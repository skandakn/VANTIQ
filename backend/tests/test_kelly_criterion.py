import pytest
from backend.quant.kelly_criterion_allocation import (
    KellyDebtAllocator,
    DebtTranche,
)


def test_kelly_debt_allocator():
    tranches = [
        DebtTranche(tranche_id="T1", lender_name="Payday Shark", principal_balance=25000, monthly_rate_pct=3.5, late_fee_penalty_inr=1500, is_predatory=True),
        DebtTranche(tranche_id="T2", lender_name="Bank Overdraft", principal_balance=30000, monthly_rate_pct=1.2, late_fee_penalty_inr=500, is_predatory=False),
    ]

    res = KellyDebtAllocator.compare_strategies(
        monthly_income=60000.0,
        mandatory_living_costs=38000.0,
        tranches=tranches,
    )

    assert "VANTIQ Coordinated (Predatory & Collision Intercept)" in res
    vantiq_res = res["VANTIQ Coordinated (Predatory & Collision Intercept)"]
    assert vantiq_res.liquidity_ruin_probability_pct < 5.0
