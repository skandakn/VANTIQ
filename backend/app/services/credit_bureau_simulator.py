"""
VANTIQ Credit Bureau Reporting Lag & Information Asymmetry Simulator
Simulates the 30-to-60 day reporting latency of traditional Indian credit bureaus
(CIBIL, Experian, CRIF High Mark, Equifax) which enables multi-lender debt stacking.
"""

from typing import List, Dict, Any


class CreditBureauLagSimulator:
    """
    Models the information blindspot between 4 simultaneous loan applications.
    Each lender assesses the borrower with stale bureau data (T - 45 days),
    unaware that 3 other lenders have approved simultaneous credit lines.
    """

    def simulate_lag(
        self,
        applicant_income: float = 68500.0,
        initial_cibil: int = 742,
        applications: List[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        if applications is None:
            applications = [
                {"app_name": "QuickRupee Instant Pay", "amount": 20000, "apr": 36.0, "upfront_fee": 900},
                {"app_name": "SplitNow BNPL", "amount": 15000, "apr": 28.0, "upfront_fee": 450},
                {"app_name": "ApexCard Cash Advance", "amount": 30000, "apr": 42.0, "upfront_fee": 1500},
                {"app_name": "FastSalary 24x7", "amount": 10000, "apr": 48.0, "upfront_fee": 600},
            ]

        total_stacked_debt = sum(a["amount"] for a in applications)
        total_upfront_fees = sum(a["upfront_fee"] for a in applications)
        blended_predatory_apr = round(
            sum(a["amount"] * a["apr"] for a in applications) / max(total_stacked_debt, 1), 2
        )

        timeline = [
            {
                "day": 0,
                "event": "Simultaneous 4-App Loan Applications",
                "bureau_visibility": "Zero visibility. Bureaus show initial clean CIBIL score 742.",
                "lender_decisions": "All 4 apps approve independently in isolated blindspots.",
                "cash_received": total_stacked_debt - total_upfront_fees,
            },
            {
                "day": 30,
                "event": "First Month Auto-Debit Collision",
                "bureau_visibility": "Still unreported. Bureau updates lag by 30-45 days.",
                "lender_decisions": "All 4 lenders attempt aggressive auto-debits on Day 30-32.",
                "cash_received": 0,
            },
            {
                "day": 45,
                "event": "Bureau Batch Ingestion & Default Report",
                "bureau_visibility": "All 4 defaults report simultaneously. CIBIL crashes from 742 to 568 (-174 points).",
                "lender_decisions": "Accounts frozen, aggressive collection agencies triggered.",
                "cash_received": 0,
            },
        ]

        return {
            "initial_cibil_score": initial_cibil,
            "post_collapse_cibil_score": 568,
            "cibil_score_drop": 174,
            "total_stacked_debt": total_stacked_debt,
            "total_upfront_fees_drained": total_upfront_fees,
            "blended_predatory_apr": blended_predatory_apr,
            "reporting_lag_days": 45,
            "asymmetry_timeline": timeline,
            "vantiq_solution": (
                "VANTIQ solves the information asymmetry through client-side zero-credential aggregation. "
                "Instead of allowing invisible multi-lender stacking, VANTIQ consolidates emergency debt into a single, "
                "coordinated repayment schedule with zero upfront fees."
            ),
        }


bureau_lag_simulator = CreditBureauLagSimulator()
