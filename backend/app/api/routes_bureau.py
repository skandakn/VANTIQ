"""
API Router for Credit Bureau Information Asymmetry Simulator
"""

from fastapi import APIRouter, Query
from app.services.credit_bureau_simulator import bureau_lag_simulator

router = APIRouter()


@router.get("/lag-simulation", summary="Simulate 30-to-60 day bureau reporting lag")
async def simulate_bureau_lag(
    salary: float = Query(68500.0, gt=0),
    cibil_score: int = Query(742, ge=300, le=900),
):
    """
    Demonstrates how multi-lender credit stacking occurs undetected
    due to monthly batch bureau reporting.
    """
    return bureau_lag_simulator.simulate_lag(applicant_income=salary, initial_cibil=cibil_score)
