"""
API Router for 90-Day Cashflow Digital Twin Simulation
"""

from fastapi import APIRouter, HTTPException, status
from app.schemas.cashflow import CashflowSimRequest, CashflowSimResponse
from app.services.cashflow_twin import cashflow_simulator
from app.core.logging import logger

router = APIRouter()


@router.post("/simulate", response_model=CashflowSimResponse, summary="Simulate 90-day cashflow trajectories")
async def simulate_cashflow_twin(request: CashflowSimRequest):
    """
    Simulates household cash balance day-by-day across 90 days.
    Detects Day 32 collision and computes terminal solvency delta.
    """
    try:
        logger.info(f"Running 90-day cashflow simulation for shock: INR {request.shock_amount:,.2f}")
        result = cashflow_simulator.simulate(request)
        return result
    except Exception as e:
        logger.error(f"Cashflow simulation failed: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
