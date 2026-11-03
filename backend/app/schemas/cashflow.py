"""
Pydantic Schemas for 90-Day Cashflow Digital Twin Engine
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class DailyCashflowPoint(BaseModel):
    day: int = Field(..., ge=0, le=180)
    naive_balance: float
    vantiq_balance: float
    income_delta: float
    expense_delta: float
    naive_cumulative_interest: float
    vantiq_cumulative_interest: float
    is_insolvent_naive: bool
    is_insolvent_vantiq: bool


class CashflowSimRequest(BaseModel):
    monthly_income: float = Field(default=68500.0, gt=0, description="Net household monthly salary")
    fixed_living_costs: float = Field(default=31600.0, ge=0, description="Rent, provisions, utilities")
    existing_emis: float = Field(default=11200.0, ge=0, description="Pre-existing auto/personal loan EMIs")
    current_savings: float = Field(default=31000.0, ge=0, description="Liquid cash buffer in savings accounts")
    shock_amount: float = Field(default=50000.0, gt=0, description="Emergency hospital or crisis shock")
    tenure_months: int = Field(default=6, ge=1, le=36, description="Planned repayment window")
    horizon_days: int = Field(default=90, ge=30, le=180, description="Projection duration")
    volatility: float = Field(default=0.05, ge=0.0, le=0.5, description="Stochastic monthly cost variation")


class CashflowSimResponse(BaseModel):
    points: List[DailyCashflowPoint]
    day_32_naive_balance: float
    day_90_naive_balance: float
    day_90_vantiq_balance: float
    solvency_delta: float
    default_collision_day_naive: Optional[int]
    vantiq_remains_solvent: bool
    total_repaid_naive: float
    total_repaid_vantiq: float
    avoided_penalty_charges: float
