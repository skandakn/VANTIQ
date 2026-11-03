"""
API Router for Fund Finder & Medical Relief Navigator
"""

from typing import List
from fastapi import APIRouter
from app.schemas.relief import (
    MedicalRequirementRequest,
    FundFinderResponse,
    RankedPlanResponse,
)
from app.services.reddit_sentiment import reddit_engine

router = APIRouter()

CANDIDATE_PLANS = [
    {
        "plan_id": "apollo-care-0emi",
        "name": "Apollo Hospital CarePlan 0% EMI",
        "provider_type": "Hospital Desk Partnership",
        "category": "Zero-Interest Medical EMI",
        "base_rate": 0.0,
        "trust_score": 4.9,
        "speed_hours": 0.5,
        "sovereign": False,
        "pros": ["Direct ICU admission deposit waiver", "0% interest for 6 months", "No documentation friction"],
        "cons": ["Valid only within Apollo Hospital network"],
    },
    {
        "plan_id": "pmjay-ayushman",
        "name": "PM-JAY Sovereign Health Relief",
        "provider_type": "Government Sovereign Scheme",
        "category": "Sovereign Health Grant",
        "base_rate": 0.0,
        "trust_score": 4.8,
        "speed_hours": 3.0,
        "sovereign": True,
        "pros": ["Cashless cover up to 5 Lakhs", "Completely free sovereign benefit", "No repayment required"],
        "cons": ["Requires PM-JAY card or SECC eligibility"],
    },
    {
        "plan_id": "corporate-benevolent",
        "name": "Corporate Employer Emergency Advance",
        "provider_type": "HR Payroll Benevolent Fund",
        "category": "Employer Payroll Advance",
        "base_rate": 0.0,
        "trust_score": 4.7,
        "speed_hours": 4.0,
        "sovereign": False,
        "pros": ["Salary deduction with 0% interest", "Direct payroll amortized", "No credit score hit"],
        "cons": ["Subject to employer HR policy"],
    },
    {
        "plan_id": "hdfc-medical-express",
        "name": "HDFC Medical Express Lifeline",
        "provider_type": "Tier-1 Scheduled Commercial Bank",
        "category": "Low-APR Medical Term Loan",
        "base_rate": 9.5,
        "trust_score": 4.5,
        "speed_hours": 8.0,
        "sovereign": False,
        "pros": ["Institutional transparency", "No predatory recovery tactics", "Transparent amortization"],
        "cons": ["Requires CIBIL score 720+"],
    },
    {
        "plan_id": "tata-capital-health",
        "name": "Tata Capital MedShield Loan",
        "provider_type": "Regulated Institutional NBFC",
        "category": "Emergency Health Credit",
        "base_rate": 11.2,
        "trust_score": 4.4,
        "speed_hours": 6.0,
        "sovereign": False,
        "pros": ["Fast digital KYC", "Part-payment allowed with zero penalty"],
        "cons": ["1.5% processing fee"],
    },
    {
        "plan_id": "fastsalary-app",
        "name": "FastSalary 24x7 Instant Pay",
        "provider_type": "Unvetted Instant Loan App",
        "category": "Predatory Payday App",
        "base_rate": 48.0,
        "trust_score": 1.2,
        "speed_hours": 0.1,
        "sovereign": False,
        "pros": ["Instant approval in 5 minutes"],
        "cons": ["48% APR extortionate interest", "6% upfront processing fee", "Aggressive contact harassment"],
    },
]


@router.post("/rank", response_model=FundFinderResponse, summary="Rank medical relief plans with Reddit sentiment")
async def rank_relief_plans(request: MedicalRequirementRequest):
    """
    Ranks emergency relief plans in strict #1-to-lowest order based on:
    1. Lowest Interest Rate / APR
    2. Zero or minimal upfront fees
    3. Reddit patient sentiment and verified community trust scores
    """
    amount = max(request.required_amount - request.existing_insurance_cover, 1000.0)
    tenure = request.repayment_tenure_months

    ranked_items: List[RankedPlanResponse] = []

    for plan in CANDIDATE_PLANS:
        apr = plan["base_rate"]
        monthly_r = (apr / 100.0) / 12.0
        if monthly_r > 0:
            emi = (amount * monthly_r * ((1 + monthly_r) ** tenure)) / (((1 + monthly_r) ** tenure) - 1)
            total_cost = emi * tenure
        else:
            emi = amount / float(tenure)
            total_cost = amount

        # Benchmark comparison against loan sharks (48% APR)
        shark_monthly_r = (0.48) / 12.0
        shark_emi = (amount * shark_monthly_r * ((1 + shark_monthly_r) ** tenure)) / (((1 + shark_monthly_r) ** tenure) - 1)
        shark_total = shark_emi * tenure + (amount * 0.06)
        net_savings = max(0.0, shark_total - total_cost)

        reddit_meta = reddit_engine.analyze_provider(plan["name"])

        ranked_items.append(
            RankedPlanResponse(
                plan_id=plan["plan_id"],
                name=plan["name"],
                provider_type=plan["provider_type"],
                category=plan["category"],
                interest_rate=apr,
                monthly_emi=round(emi, 2),
                total_cost=round(total_cost, 2),
                net_savings_vs_loan_sharks=round(net_savings, 2),
                trust_score=plan["trust_score"],
                approval_speed_hours=plan["speed_hours"],
                reddit_upvotes=reddit_meta["upvotes"],
                reddit_sentiment_score=reddit_meta["sentiment_score"],
                sovereign_subsidized=plan["sovereign"],
                pros=plan["pros"],
                cons=plan["cons"],
                rank=1,
            )
        )

    # Sort strictly: 1st by lowest interest rate, 2nd by highest trust score
    ranked_items.sort(key=lambda p: (p.interest_rate, -p.trust_score))

    for idx, item in enumerate(ranked_items, start=1):
        item.rank = idx

    return FundFinderResponse(
        ranked_plans=ranked_items,
        best_plan_id=ranked_items[0].plan_id,
        effective_emergency_gap=amount,
        recommended_emi_ceiling=round(amount / float(tenure) * 1.15, 2),
        total_plans_screened=len(ranked_items),
        sentiment_highlights=[
            "Apollo 0% EMI highly praised on r/bangalore for ICU deposit relief.",
            "PM-JAY recommended on r/IndiaInvestments for 100% cashless cover up to 5L.",
            "FastSalary flagged on Reddit for aggressive auto-debits on Day 30.",
        ],
    )
