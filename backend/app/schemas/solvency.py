"""
Pydantic Schemas for Dual Capacity & Labor Life-Energy Calculator
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class BorrowerProfile(BaseModel):
    monthly_salary: float = Field(..., gt=0)
    monthly_rent: float = Field(default=0.0, ge=0)
    monthly_groceries: float = Field(default=0.0, ge=0)
    monthly_utilities: float = Field(default=0.0, ge=0)
    monthly_commute: float = Field(default=0.0, ge=0)
    active_loan_emis: float = Field(default=0.0, ge=0)
    liquid_savings: float = Field(default=0.0, ge=0)
    working_hours_per_month: int = Field(default=160, gt=0)


class LaborEnergyResult(BaseModel):
    hourly_net_wage: float
    predatory_debt_labor_hours: float
    vantiq_debt_labor_hours: float
    labor_hours_liberated: float
    working_days_liberated: float
    cortisol_overload_index: float
    freedom_milestone_day: int
