"""
FastAPI Router for Quantitative Finance, Merton Credit, Vasicek Rates, and CoVaR APIs.
"""

from __future__ import annotations

from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from backend.quant.merton_structural_credit import (
    MertonStructuralModel,
    MertonHouseholdCreditRisk,
    MertonDefaultOutput,
)
from backend.quant.vasicek_interest_rates import VasicekRateModel, VasicekParameters, RatePathResult
from backend.quant.markowitz_efficient_frontier import MarkowitzOptimizer, LiquidityAsset, PortfolioAllocation
from backend.quant.kelly_criterion_allocation import KellyDebtAllocator, DebtTranche, RepaymentStrategyResult
from backend.quant.systemic_covar import CoVaREngine, LenderRiskProfile, SystemicContagionResult
from backend.quant.copula_default_correlation import CopulaDefaultEngine, CopulaSimulationResult

router = APIRouter(prefix="/quant", tags=["Quantitative Finance & Structural Risk"])


class MertonHouseholdRequest(BaseModel):
    monthly_income_inr: float = Field(default=55000.0)
    liquid_savings_inr: float = Field(default=15000.0)
    monthly_expenses_inr: float = Field(default=38000.0)
    emergency_debt_inr: float = Field(default=50000.0)
    tenure_days: int = Field(default=90)


@router.post("/merton/household", response_model=MertonDefaultOutput)
async def evaluate_merton_household(req: MertonHouseholdRequest):
    """Computes Merton Distance-to-Default (DD) and Expected Default Frequency (EDF)."""
    return MertonStructuralModel.simulate_capitalized_household(
        monthly_income=req.monthly_income_inr,
        liquid_savings=req.liquid_savings_inr,
        monthly_expenses=req.monthly_expenses_inr,
        emergency_debt_inr=req.emergency_debt_inr,
        tenure_days=req.tenure_days,
    )


@router.get("/vasicek/simulate", response_model=RatePathResult)
async def simulate_vasicek_rates(days: int = 90, r0: float = 0.24, b: float = 0.18):
    """Simulates mean-reverting Vasicek short-rate trajectory for unsecured debt."""
    model = VasicekRateModel(VasicekParameters(initial_rate_r0=r0, long_term_mean_rate_b=b))
    return model.simulate_path(days=days)


@router.post("/covar/analyze", response_model=List[SystemicContagionResult])
async def analyze_systemic_spillover(lenders: List[LenderRiskProfile], monthly_income: float = 50000.0):
    """Computes Delta-CoVaR across multi-lender debt mesh."""
    return CoVaREngine.rank_systemic_culprits(lenders, monthly_income=monthly_income)


@router.get("/copula/joint-default", response_model=CopulaSimulationResult)
async def simulate_copula_joint_default(theta: float = 2.5, num_sims: int = 5000):
    """Simulates joint default probability with Clayton lower tail dependence."""
    engine = CopulaDefaultEngine(theta_clayton=theta)
    # 4 sample loan default probabilities
    probs = [0.15, 0.22, 0.18, 0.25]
    return engine.simulate_portfolio_cascade(probs, num_sims=num_sims)
