"""
Pydantic Schemas for Quantum Knapsack QUBO Solver
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class ReliefSource(BaseModel):
    source_id: str = Field(..., description="Unique source identifier")
    name: str = Field(..., description="Name of relief instrument or lender")
    category: str = Field(default="loan", description="Category: grant, zero_emi, corporate, nbfc")
    available_amount: float = Field(..., gt=0, description="Maximum liquidity offered in INR")
    effective_apr: float = Field(..., ge=0, description="Annual percentage rate as percentage")
    processing_fee_rate: float = Field(default=0.0, ge=0, description="Upfront processing fee rate 0-1")
    tenure_months: int = Field(..., gt=0, description="Repayment horizon in months")
    risk_score: float = Field(default=1.0, ge=0, le=5.0, description="Risk penalty index (1 low, 5 high)")


class QuantumSolveRequest(BaseModel):
    required_amount: float = Field(..., gt=0, description="Urgent emergency capital requirement")
    max_monthly_repayment_capacity: float = Field(..., gt=0, description="Maximum allowable monthly EMI")
    sources: List[ReliefSource] = Field(..., min_length=1, description="Candidate funding sources")
    penalty_weight: Optional[float] = Field(default=2.5, description="Constraint violation multiplier")
    annealing_steps: Optional[int] = Field(default=1200, description="Number of Monte Carlo sweeps")
    temperature_start: Optional[float] = Field(default=10.0, description="Initial annealing temperature")
    temperature_end: Optional[float] = Field(default=0.01, description="Final quench temperature")


class QuantumAllocation(BaseModel):
    source_id: str
    name: str
    category: str
    allocated_amount: float
    effective_apr: float
    monthly_emi: float
    total_interest: float
    allocation_ratio: float


class QuantumSolveResponse(BaseModel):
    allocations: List[QuantumAllocation]
    total_allocated: float
    unfunded_shortfall: float
    blended_apr: float
    total_monthly_emi: float
    total_interest_cost: float
    energy_hamiltonian: float
    is_fully_funded: bool
    is_capacity_adherent: bool
    execution_time_ms: float
    method_used: str
