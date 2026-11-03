"""
Conditional Value at Risk (CoVaR) & Systemic Spillover Engine
Implements Adrian & Brunnermeier (2016) Delta-CoVaR to quantify how default
at one instant micro-lending app triggers contagion cascades across the borrower's other lenders.
"""

from __future__ import annotations

import math
from typing import List, Dict, Any, Tuple
from pydantic import BaseModel, Field


class LenderRiskProfile(BaseModel):
    lender_id: str
    lender_name: str
    exposure_inr: float
    standalone_var_95_inr: float
    recovery_rate: float
    auto_debit_priority_day: int


class SystemicContagionResult(BaseModel):
    source_lender_id: str
    source_lender_name: str
    standalone_var_inr: float
    covar_system_inr: float
    delta_covar_inr: float
    spillover_multiplier: float
    is_systemically_dangerous: bool


class CoVaREngine:
    """
    Computes Delta-CoVaR = CoVaR(System | Lender_i in Distress) - CoVaR(System | Lender_i in Median State).
    Reveals how payday lenders draining bank accounts early in the month cause cascades into later lenders.
    """

    @classmethod
    def calculate_delta_covar(
        cls,
        trigger_lender: LenderRiskProfile,
        peer_lenders: List[LenderRiskProfile],
        borrower_monthly_income: float,
    ) -> SystemicContagionResult:
        standalone_var = trigger_lender.standalone_var_95_inr

        # Baseline loss across peer lenders in median state
        median_loss = sum(p.exposure_inr * (1.0 - p.recovery_rate) * 0.05 for p in peer_lenders)

        # Distressed state: trigger lender executes auto-debit on Day 1-15, draining liquid funds
        # Remaining debt service capacity for peer lenders shrinks
        exposure_drain = trigger_lender.exposure_inr * 1.15  # Includes aggressive penalty debits
        residual_income = max(0.0, borrower_monthly_income - exposure_drain)

        # Peer loss in conditional distressed state
        peer_shortfall = max(0.0, sum(p.exposure_inr for p in peer_lenders) - residual_income)
        covar_distressed = standalone_var + (peer_shortfall * 0.85)

        covar_median = standalone_var + median_loss
        delta_covar = max(0.0, covar_distressed - covar_median)

        spillover_mult = (
            (covar_distressed / standalone_var) if standalone_var > 0 else 1.0
        )

        return SystemicContagionResult(
            source_lender_id=trigger_lender.lender_id,
            source_lender_name=trigger_lender.lender_name,
            standalone_var_inr=round(standalone_var, 2),
            covar_system_inr=round(covar_distressed, 2),
            delta_covar_inr=round(delta_covar, 2),
            spillover_multiplier=round(spillover_mult, 2),
            is_systemically_dangerous=spillover_mult > 1.75 or delta_covar > 15000.0,
        )

    @classmethod
    def rank_systemic_culprits(
        cls,
        lenders: List[LenderRiskProfile],
        monthly_income: float,
    ) -> List[SystemicContagionResult]:
        results = []
        for i, target in enumerate(lenders):
            peers = [l for j, l in enumerate(lenders) if j != i]
            res = cls.calculate_delta_covar(target, peers, monthly_income)
            results.append(res)

        results.sort(key=lambda r: r.delta_covar_inr, reverse=True)
        return results
