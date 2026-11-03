"""
Unit tests for TreeSHAP Explainable AI attribution
"""

import pytest
from app.services.shap_explainer import shap_explainer


def test_shap_explanation_waterfall():
    res = shap_explainer.explain(
        salary=68500.0,
        shock_amount=50000.0,
        liquid_savings=31000.0,
        active_emis=11200.0,
        tenure_months=6,
    )

    assert "waterfall" in res
    assert len(res["waterfall"]) == 5, "Must explain all 5 core financial factors"
    assert 0.0 <= res["predicted_risk"] <= 1.0, "Risk probability must be bounded in [0, 1]"
    assert res["base_risk"] == 0.52
    assert "summary_text" in res
