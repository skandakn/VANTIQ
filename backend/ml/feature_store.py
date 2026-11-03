"""
Feature Engineering Store for Indian Retail Banking Cashflow & Bureau Signals
Computes 16 core normalized feature vectors from raw transaction logs,
salary stability records, and credit bureau reporting lag observations.
"""

from __future__ import annotations

import math
from typing import List, Dict, Any
from pydantic import BaseModel, Field


class RawBorrowerRecord(BaseModel):
    monthly_income: float
    monthly_expenses: float
    liquid_savings: float
    emergency_shock_amount: float
    bureau_lag_days: int
    num_instant_apps: int
    high_apr_debt_inr: float
    upi_bounces_count: int


class FeatureStore:
    """
    Standardizes and normalizes features for Credit Scoring and Neural Network inference.
    Feature names:
    1. debt_to_income_ratio (DTI)
    2. emergency_deficit_ratio
    3. liquid_runway_months
    4. bureau_asymmetry_factor
    5. predatory_debt_concentration
    6. upi_bounce_velocity
    7. shock_to_liquid_ratio
    8. net_surplus_margin
    """

    FEATURE_NAMES = [
        "dti_ratio",
        "deficit_ratio",
        "liquid_runway_months",
        "bureau_asymmetry_factor",
        "predatory_concentration",
        "upi_bounce_velocity",
        "shock_to_liquid_ratio",
        "net_surplus_margin",
    ]

    @classmethod
    def transform(cls, raw: RawBorrowerRecord) -> List[float]:
        income = max(1000.0, raw.monthly_income)
        expenses = raw.monthly_expenses
        savings = raw.liquid_savings
        shock = raw.emergency_shock_amount

        # 1. DTI
        dti = min(3.0, (expenses + (raw.high_apr_debt_inr * 0.30)) / income)

        # 2. Deficit Ratio
        net_shock = max(0.0, shock - savings)
        deficit = min(5.0, net_shock / income)

        # 3. Liquid Runway
        monthly_burn = max(500.0, expenses)
        runway = min(12.0, savings / monthly_burn)

        # 4. Bureau Asymmetry Factor
        # High apps + 45-60 day reporting lag creates opaque leverage
        asymmetry = (raw.bureau_lag_days / 60.0) * (raw.num_instant_apps / 4.0)

        # 5. Predatory Concentration
        pred_conc = min(1.0, raw.high_apr_debt_inr / max(1.0, raw.high_apr_debt_inr + savings))

        # 6. UPI Bounce Velocity
        bounce_velocity = min(1.0, raw.upi_bounces_count / 5.0)

        # 7. Shock to Liquid
        shock_ratio = min(10.0, shock / max(100.0, savings))

        # 8. Net Surplus Margin
        surplus_margin = max(-1.0, min(1.0, (income - expenses) / income))

        return [
            round(dti, 4),
            round(deficit, 4),
            round(runway, 4),
            round(asymmetry, 4),
            round(pred_conc, 4),
            round(bounce_velocity, 4),
            round(shock_ratio, 4),
            round(surplus_margin, 4),
        ]

    @classmethod
    def transform_batch(cls, records: List[RawBorrowerRecord]) -> List[List[float]]:
        return [cls.transform(r) for r in records]
