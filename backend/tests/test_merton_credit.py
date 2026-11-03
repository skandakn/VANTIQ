import pytest
from backend.quant.merton_structural_credit import (
    MertonStructuralModel,
    MertonHouseholdCreditRisk,
)


def test_merton_structural_model_eval():
    params = MertonHouseholdCreditRisk(
        asset_value_inr=150000.0,
        debt_face_value_inr=40000.0,
        horizon_years=0.25,
        risk_free_rate=0.065,
        asset_volatility=0.25,
    )
    res = MertonStructuralModel.evaluate(params)

    assert res.distance_to_default > 1.0
    assert res.expected_default_frequency_pct < 10.0
    assert res.risk_category in ("PRIME", "MODERATE_STRESS")
    assert res.equity_value_inr > 0.0
