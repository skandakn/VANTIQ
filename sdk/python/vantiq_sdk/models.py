"""
Data models and request contracts for VANTIQ Python SDK.
"""

from __future__ import annotations

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class BorrowerProfile(BaseModel):
    user_id: str
    monthly_income_inr: float
    monthly_expenses_inr: float
    liquid_savings_inr: float
    emergency_amount_inr: float
    repayment_horizon_months: int = 6


class QuantumKnapsackRequest(BaseModel):
    target_amount_inr: float
    max_apr_threshold_pct: float = 24.0
    include_sovereign_grants: bool = True
    include_hospital_plans: bool = True
    annealing_steps: int = 150


class CashflowSimulationRequest(BaseModel):
    monthly_income: float
    monthly_expenses: float
    liquid_savings: float
    emergency_amount: float
    horizon_days: int = 90
    repayment_tenure_months: int = 6


class ReliefRecommendation(BaseModel):
    plan_id: str
    title: str
    category: str
    funded_amount_inr: float
    effective_apr_pct: float
    monthly_emi_inr: float
    disbursement_eta_hours: float
    risk_abatement_score: float
