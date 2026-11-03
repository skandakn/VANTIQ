import pytest
from backend.quant.systemic_covar import CoVaREngine, LenderRiskProfile


def test_systemic_covar():
    lenders = [
        LenderRiskProfile(lender_id="L1", lender_name="Predatory Micro 1", exposure_inr=20000.0, standalone_var_95_inr=4500.0, recovery_rate=0.20, auto_debit_priority_day=1),
        LenderRiskProfile(lender_id="L2", lender_name="BNPL App 2", exposure_inr=15000.0, standalone_var_95_inr=2800.0, recovery_rate=0.40, auto_debit_priority_day=5),
        LenderRiskProfile(lender_id="L3", lender_name="Salary Advance 3", exposure_inr=25000.0, standalone_var_95_inr=5200.0, recovery_rate=0.30, auto_debit_priority_day=10),
    ]

    ranked = CoVaREngine.rank_systemic_culprits(lenders, monthly_income=50000.0)

    assert len(ranked) == 3
    assert ranked[0].delta_covar_inr >= 0.0
