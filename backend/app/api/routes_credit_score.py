"""
API Router for Dynamic Cashflow Credit Scoring
"""

from fastapi import APIRouter, Query
from app.services.credit_scoring import credit_scorer

router = APIRouter()


@router.get("/evaluate", summary="Compute VANTIQ Cashflow Credit Score")
async def evaluate_credit_score(
    salary: float = Query(68500.0, gt=0),
    active_emis: float = Query(11200.0, ge=0),
    rent: float = Query(16500.0, ge=0),
    living: float = Query(15100.0, ge=0),
    savings: float = Query(31000.0, ge=0),
    shock: float = Query(50000.0, gt=0),
    tenure: int = Query(6, ge=1, le=24),
):
    """
    Evaluates borrower solvency score (300-900) based on absorptive surplus
    and runway rather than lagging bureau inquiries.
    """
    return credit_scorer.score_borrower(
        monthly_salary=salary,
        active_emis=active_emis,
        rent_expense=rent,
        living_burn=living,
        liquid_savings=savings,
        shock_amount=shock,
        tenure_months=tenure,
    )
