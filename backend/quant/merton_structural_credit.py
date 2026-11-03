"""
Merton's Structural Model of Default Risk for Household Emergency Balances
Models household net worth as a contingent claim on human capital earnings.
Distance to Default (DD) and Expected Default Frequency (EDF) calculation
via standard Black-Scholes-Merton option pricing dynamics.
"""

from __future__ import annotations

import math
from typing import Dict, Any, Tuple
from pydantic import BaseModel, Field


def norm_cdf(x: float) -> float:
    """Standard normal cumulative distribution function approximation (erf)."""
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))


def norm_pdf(x: float) -> float:
    """Standard normal probability density function."""
    return (1.0 / math.sqrt(2.0 * math.pi)) * math.exp(-0.5 * x * x)


class MertonHouseholdCreditRisk(BaseModel):
    asset_value_inr: float = Field(..., description="Present value of household liquid assets + capitalized income (INR)")
    debt_face_value_inr: float = Field(..., description="Total nominal debt liabilities maturing at horizon (INR)")
    horizon_years: float = Field(default=0.25, description="Time horizon in years (0.25 = 90 days)")
    risk_free_rate: float = Field(default=0.065, description="Risk-free rate (RBI 91-day T-bill yield)")
    asset_volatility: float = Field(default=0.30, description="Annualized volatility of household net earnings")


class MertonDefaultOutput(BaseModel):
    distance_to_default: float
    expected_default_frequency_pct: float
    equity_value_inr: float
    debt_market_value_inr: float
    credit_spread_bps: float
    risk_category: str  # PRIME, MODERATE_STRESS, ELEVATED_DEFAULT, CRITICAL_INSOLVENCY


class MertonStructuralModel:
    """
    Evaluates household insolvency under the Merton (1974) structural framework.
    Household Default occurs if asset value V_T < Debt_T at horizon T.
    """

    @classmethod
    def compute_distance_to_default(
        cls,
        v_a: float,
        d_val: float,
        t_years: float,
        r: float,
        sigma_a: float,
    ) -> Tuple[float, float, float, float]:
        """
        Calculates d1, d2, distance to default (DD), and expected default frequency (EDF).
        d1 = [ln(V / D) + (r + 0.5 * sigma^2) * T] / [sigma * sqrt(T)]
        d2 = d1 - sigma * sqrt(T)
        DD = [ln(V / D) + (mu - 0.5 * sigma^2) * T] / [sigma * sqrt(T)]
        EDF = N(-DD)
        """
        if v_a <= 0 or d_val <= 0:
            return (0.0, 0.0, -5.0, 0.9999)

        vol_sqrt_t = sigma_a * math.sqrt(t_years)
        if vol_sqrt_t <= 1e-6:
            vol_sqrt_t = 1e-6

        d1 = (math.log(v_a / d_val) + (r + 0.5 * sigma_a**2) * t_years) / vol_sqrt_t
        d2 = d1 - vol_sqrt_t

        # Distance to default under physical measure (assuming expected growth mu = r + 0.02)
        mu = r + 0.02
        dd = (math.log(v_a / d_val) + (mu - 0.5 * sigma_a**2) * t_years) / vol_sqrt_t
        edf = norm_cdf(-dd)

        return (d1, d2, dd, edf)

    @classmethod
    def evaluate(cls, params: MertonHouseholdCreditRisk) -> MertonDefaultOutput:
        v = params.asset_value_inr
        d = params.debt_face_value_inr
        t = params.horizon_years
        r = params.risk_free_rate
        sigma = params.asset_volatility

        d1, d2, dd, edf = cls.compute_distance_to_default(v, d, t, r, sigma)

        # Black-Scholes call option value on household equity
        call_val = v * norm_cdf(d1) - d * math.exp(-r * t) * norm_cdf(d2)
        equity_val = max(0.0, call_val)

        # Market value of debt = V - Equity
        debt_market_val = min(d, max(0.0, v - equity_val))

        # Implied yield to maturity on debt: y = -(1/T) * ln(Debt_market / D)
        if debt_market_val > 0 and d > 0:
            yield_debt = -(1.0 / t) * math.log(debt_market_val / d)
            credit_spread = max(0.0, (yield_debt - r) * 10000.0)  # basis points
        else:
            credit_spread = 5000.0

        # Risk categorization
        edf_pct = edf * 100.0
        if edf_pct < 2.0:
            cat = "PRIME"
        elif edf_pct < 8.0:
            cat = "MODERATE_STRESS"
        elif edf_pct < 25.0:
            cat = "ELEVATED_DEFAULT"
        else:
            cat = "CRITICAL_INSOLVENCY"

        return MertonDefaultOutput(
            distance_to_default=round(dd, 3),
            expected_default_frequency_pct=round(edf_pct, 2),
            equity_value_inr=round(equity_val, 2),
            debt_market_value_inr=round(debt_market_val, 2),
            credit_spread_bps=round(credit_spread, 1),
            risk_category=cat,
        )

    @classmethod
    def simulate_capitalized_household(
        cls,
        monthly_income: float,
        liquid_savings: float,
        monthly_expenses: float,
        emergency_debt_inr: float,
        tenure_days: int = 90,
    ) -> MertonDefaultOutput:
        """
        Converts monthly household cashflows into capitalization asset value V_A.
        V_A = Liquid Savings + Present Value of 1-year Net Discretionary Surplus.
        """
        annual_surplus = max(0.0, (monthly_income - monthly_expenses) * 12.0)
        discount_factor = 1.0 / (1.0 + 0.08)  # 8% capitalization rate
        capitalized_human_capital = annual_surplus * discount_factor
        total_asset_v = liquid_savings + capitalized_human_capital

        params = MertonHouseholdCreditRisk(
            asset_value_inr=total_asset_v,
            debt_face_value_inr=emergency_debt_inr,
            horizon_years=tenure_days / 365.0,
            risk_free_rate=0.065,
            asset_volatility=0.28,
        )
        return cls.evaluate(params)
