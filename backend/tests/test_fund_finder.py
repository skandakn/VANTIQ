"""
Unit tests for Fund Finder ranking and Reddit sentiment integration
"""

import pytest
import asyncio
from app.schemas.relief import MedicalRequirementRequest
from app.api.routes_fund_finder import rank_relief_plans


def test_fund_finder_ranking_logic():
    req = MedicalRequirementRequest(
        health_problem="Cardiac Surgery",
        required_amount=50000.0,
        repayment_tenure_months=6,
        existing_insurance_cover=10000.0,
    )

    res = asyncio.run(rank_relief_plans(req))

    assert res.effective_emergency_gap == 40000.0, "Should deduct insurance cover"
    assert len(res.ranked_plans) >= 4, "Should return screened relief options"
    assert res.ranked_plans[0].rank == 1, "Top plan must have rank 1"
    assert res.ranked_plans[0].interest_rate == 0.0, "Rank 1 must be lowest interest rate (0% EMI or grant)"
    assert res.ranked_plans[-1].interest_rate >= 40.0, "Last rank should be high-APR payday app"
