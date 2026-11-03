"""
Pydantic Schemas for Fund Finder & Medical Relief Navigator
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class MedicalRequirementRequest(BaseModel):
    health_problem: str = Field(default="Cardiac Surgery", description="Medical diagnosis or procedure")
    required_amount: float = Field(default=50000.0, gt=0, description="Gross out-of-pocket medical bill")
    repayment_tenure_months: int = Field(default=6, ge=1, le=24, description="Target repayment period")
    existing_insurance_cover: float = Field(default=0.0, ge=0, description="Pre-authorized corporate/private cover")


class RankedPlanResponse(BaseModel):
    plan_id: str
    name: str
    provider_type: str
    category: str
    interest_rate: float
    monthly_emi: float
    total_cost: float
    net_savings_vs_loan_sharks: float
    trust_score: float
    approval_speed_hours: float
    reddit_upvotes: int
    reddit_sentiment_score: float
    sovereign_subsidized: bool
    pros: List[str]
    cons: List[str]
    rank: int


class FundFinderResponse(BaseModel):
    ranked_plans: List[RankedPlanResponse]
    best_plan_id: str
    effective_emergency_gap: float
    recommended_emi_ceiling: float
    total_plans_screened: int
    sentiment_highlights: List[str]
