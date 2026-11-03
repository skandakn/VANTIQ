"""
API Router for TreeSHAP Explainable AI Attribution
"""

from typing import Dict, Any
from fastapi import APIRouter, Query
from app.services.shap_explainer import shap_explainer

router = APIRouter()


@router.get("/explain", summary="Compute TreeSHAP feature attributions")
async def get_shap_explanation(
    salary: float = Query(68500.0, gt=0, description="Monthly net salary"),
    shock_amount: float = Query(50000.0, gt=0, description="Urgent shock amount"),
    liquid_savings: float = Query(31000.0, ge=0, description="Liquid savings buffer"),
    active_emis: float = Query(11200.0, ge=0, description="Active monthly loan payments"),
    tenure_months: int = Query(6, ge=1, le=36, description="Planned repayment window"),
) -> Dict[str, Any]:
    """
    Returns exact Shapley value feature attributions for borrower default risk.
    """
    return shap_explainer.explain(
        salary=salary,
        shock_amount=shock_amount,
        liquid_savings=liquid_savings,
        active_emis=active_emis,
        tenure_months=tenure_months,
    )
