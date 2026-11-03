"""
Pydantic Schemas for Open-Source Bank Statement Parser
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class TransactionItem(BaseModel):
    date: str
    narration: str
    type: str  # Debit or Credit
    amount: float
    running_balance: float
    category: str


class StatementParseRequest(BaseModel):
    csv_content: str = Field(..., description="Raw CSV string or uploaded bank statement rows")


class ParsedFinancialSummary(BaseModel):
    detected_monthly_salary: float
    detected_active_emis: float
    detected_rent_expense: float
    detected_living_burn: float
    detected_current_savings: float
    absorptive_surplus: float
    safe_maximum_emi: float
    debt_to_income_ratio: float
    total_transactions_parsed: int
    categorized_transactions: List[TransactionItem]
