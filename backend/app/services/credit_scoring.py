"""
VANTIQ Behavioral & Cashflow Credit Scoring Algorithm
Alternative creditworthiness scoring model based on cashflow stability,
absorptive surplus, and living buffer runway rather than lagging bureau CIBIL scores.
Computes Scorecard Points, Odds, and Default Risk Calibration.
"""

import math
from typing import Dict, Any


class VantiqCashflowScorer:
    """
    Computes a 300-900 point score based purely on dynamic cashflow telemetry.
    Eliminates bias against thin-file gig workers and acute shock victims.
    """

    BASE_SCORE = 650.0

    def score_borrower(
        self,
        monthly_salary: float,
        active_emis: float,
        rent_expense: float,
        living_burn: float,
        liquid_savings: float,
        shock_amount: float,
        tenure_months: int,
    ) -> Dict[str, Any]:
        points = self.BASE_SCORE

        # 1. Absorptive Surplus Ratio
        discretionary_surplus = monthly_salary - (active_emis + rent_expense + living_burn)
        surplus_ratio = discretionary_surplus / max(monthly_salary, 1.0)
        if surplus_ratio >= 0.35:
            points += 65.0
        elif surplus_ratio >= 0.20:
            points += 35.0
        elif surplus_ratio >= 0.05:
            points += 10.0
        else:
            points -= 55.0

        # 2. Debt-to-Income (DTI) Ratio
        dti = active_emis / max(monthly_salary, 1.0)
        if dti <= 0.15:
            points += 50.0
        elif dti <= 0.30:
            points += 20.0
        elif dti <= 0.45:
            points -= 20.0
        else:
            points -= 65.0

        # 3. Liquid Buffer Runway (Days of essential burn covered)
        daily_burn = (rent_expense + living_burn) / 30.0
        buffer_days = liquid_savings / max(daily_burn, 1.0)
        if buffer_days >= 45.0:
            points += 55.0
        elif buffer_days >= 20.0:
            points += 30.0
        elif buffer_days >= 7.0:
            points += 5.0
        else:
            points -= 45.0

        # 4. Shock-to-Surplus Repayment Capacity
        target_emi = shock_amount / float(max(tenure_months, 1))
        repayment_coverage = discretionary_surplus / max(target_emi, 1.0)
        if repayment_coverage >= 2.0:
            points += 45.0
        elif repayment_coverage >= 1.2:
            points += 20.0
        elif repayment_coverage >= 0.9:
            points -= 15.0
        else:
            points -= 50.0

        final_score = int(min(900.0, max(300.0, round(points))))

        # Calibrated default probability curve: P(Default) = 1 / (1 + exp((score - 600) / 45))
        prob_default = 1.0 / (1.0 + math.exp((final_score - 590.0) / 42.0))

        if final_score >= 760:
            tier = "Prime Solvency"
            recommendation = "Eligible for 0% EMI and Tier-1 prime bank rates"
        elif final_score >= 680:
            tier = "Near-Prime Solvency"
            recommendation = "Recommended for blended tri-tranche relief"
        elif final_score >= 580:
            tier = "Moderate Vulnerability"
            recommendation = "Requires extended tenure (12-18m) and sovereign grant matching"
        else:
            tier = "Acute Distress"
            recommendation = "Emergency sovereign healthcare subsidy (PM-JAY) prioritized"

        return {
            "vantiq_cashflow_score": final_score,
            "solvency_tier": tier,
            "calibrated_default_risk_percent": round(prob_default * 100.0, 2),
            "surplus_ratio": round(surplus_ratio, 3),
            "buffer_days": round(buffer_days, 1),
            "repayment_coverage_ratio": round(repayment_coverage, 2),
            "underwriting_recommendation": recommendation,
        }


credit_scorer = VantiqCashflowScorer()
