"""
API Router for Dual Capacity & Life-Energy Labor Metrics
"""

from fastapi import APIRouter, Query
from app.schemas.solvency import BorrowerProfile, LaborEnergyResult
from app.services.life_energy import life_energy_engine

router = APIRouter()


@router.get("/life-energy", response_model=LaborEnergyResult, summary="Calculate debt in human labor hours")
async def calculate_life_energy(
    salary: float = Query(68500.0, gt=0, description="Monthly net salary"),
    shock_amount: float = Query(50000.0, gt=0, description="Emergency bill amount"),
    monthly_hours: int = Query(160, gt=0, description="Standard monthly work hours"),
):
    """
    Translates monetary loan debt into physical hours and working days of human labor.
    """
    return life_energy_engine.calculate(
        salary=salary,
        shock_amount=shock_amount,
        monthly_hours=monthly_hours,
    )


@router.post("/absorptive-capacity", summary="Evaluate dual absorptive surplus")
async def evaluate_absorptive_capacity(profile: BorrowerProfile):
    """
    Evaluates real absorptive surplus: Net Salary minus rent, living, and existing debt obligations.
    """
    total_living = profile.monthly_rent + profile.monthly_groceries + profile.monthly_utilities + profile.monthly_commute
    net_surplus = max(0.0, profile.monthly_salary - total_living - profile.active_loan_emis)
    safe_emi_threshold = round(net_surplus * 0.65, 2)
    dti_percent = round((profile.active_loan_emis / max(profile.monthly_salary, 1.0)) * 100, 1)

    return {
        "monthly_salary": profile.monthly_salary,
        "total_living_expenses": round(total_living, 2),
        "active_loan_emis": profile.active_loan_emis,
        "liquid_savings": profile.liquid_savings,
        "real_absorptive_surplus": round(net_surplus, 2),
        "safe_monthly_emi_ceiling": safe_emi_threshold,
        "debt_to_income_percent": dti_percent,
        "is_capacity_healthy": dti_percent <= 40.0,
    }
