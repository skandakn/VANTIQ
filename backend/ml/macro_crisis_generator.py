"""
Macroeconomic Stress & Crisis Scenario Generator
Simulates nationwide multi-lender credit contraction under high inflation,
repo rate shocks, and hospital healthcare inflation in Indian Tier-1/2 metros.
"""

from __future__ import annotations

import random
from typing import List, Dict, Any
from pydantic import BaseModel, Field


class MacroStressScenario(BaseModel):
    scenario_id: str
    scenario_name: str
    rbi_repo_rate_pct: float
    cpi_inflation_pct: float
    healthcare_inflation_pct: float
    unsecured_nbfc_apr_spike_bps: float
    household_real_wage_growth_pct: float
    default_cascade_multiplier: float


class HouseholdCrisisBatch(BaseModel):
    scenario: MacroStressScenario
    sample_households_count: int
    aggregate_unfunded_deficit_inr: float
    average_household_dti_pre_shock: float
    average_household_dti_post_shock: float
    projected_macro_default_rate_pct: float


MACRO_PRESET_SCENARIOS = [
    MacroStressScenario(
        scenario_id="SCEN-01-BASELINE",
        scenario_name="Mild Growth & Steady Rates",
        rbi_repo_rate_pct=6.50,
        cpi_inflation_pct=4.80,
        healthcare_inflation_pct=11.2,
        unsecured_nbfc_apr_spike_bps=0.0,
        household_real_wage_growth_pct=2.5,
        default_cascade_multiplier=1.0,
    ),
    MacroStressScenario(
        scenario_id="SCEN-02-STAGFLATION",
        scenario_name="Monetary Tightening & Medical Cost Shock",
        rbi_repo_rate_pct=7.50,
        cpi_inflation_pct=7.20,
        healthcare_inflation_pct=16.8,
        unsecured_nbfc_apr_spike_bps=450.0,
        household_real_wage_growth_pct=-1.8,
        default_cascade_multiplier=2.4,
    ),
    MacroStressScenario(
        scenario_id="SCEN-03-PANDEMIC-SURGE",
        scenario_name="Severe Emergency Hospital Run",
        rbi_repo_rate_pct=5.50,
        cpi_inflation_pct=8.50,
        healthcare_inflation_pct=24.5,
        unsecured_nbfc_apr_spike_bps=900.0,
        household_real_wage_growth_pct=-5.2,
        default_cascade_multiplier=4.2,
    ),
]


class MacroCrisisGenerator:
    """
    Simulates thousands of synthetic households under macro stress scenarios.
    """

    @classmethod
    def simulate_macro_batch(
        cls,
        scenario: MacroStressScenario,
        num_households: int = 1000,
        seed: int = 42,
    ) -> HouseholdCrisisBatch:
        random.seed(seed)
        total_deficit = 0.0
        sum_dti_pre = 0.0
        sum_dti_post = 0.0
        defaults = 0

        for _ in range(num_households):
            income = random.gauss(55000, 18000)
            income = max(20000.0, income)

            # Pre-shock expenses
            base_expenses = income * random.uniform(0.60, 0.78)
            dti_pre = base_expenses / income

            # Apply macro inflation
            exp_inflation = 1.0 + (scenario.cpi_inflation_pct / 100.0) * 0.5
            post_expenses = base_expenses * exp_inflation

            # Medical shock with healthcare inflation
            shock_base = random.choice([35000, 60000, 100000, 150000])
            shock_inflated = shock_base * (1.0 + scenario.healthcare_inflation_pct / 100.0)

            # Liquid savings
            savings = max(0.0, random.gauss(income * 0.40, income * 0.25))

            # Net deficit
            deficit = max(0.0, shock_inflated - savings)
            total_deficit += deficit

            # Monthly debt service under tightened rates
            apr_base = 0.28 + (scenario.unsecured_nbfc_apr_spike_bps / 10000.0)
            monthly_debt = deficit * (apr_base / 12.0)

            dti_post = (post_expenses + monthly_debt) / max(1.0, income)

            sum_dti_pre += dti_pre
            sum_dti_post += dti_post

            # Default condition under cascade multiplier
            if dti_post > 0.85 or (deficit > income * 2.5):
                defaults += 1

        avg_dti_pre = round(sum_dti_pre / num_households, 3)
        avg_dti_post = round(sum_dti_post / num_households, 3)
        def_rate = round((defaults / num_households) * 100.0, 2)

        return HouseholdCrisisBatch(
            scenario=scenario,
            sample_households_count=num_households,
            aggregate_unfunded_deficit_inr=round(total_deficit, 2),
            average_household_dti_pre_shock=avg_dti_pre,
            average_household_dti_post_shock=avg_dti_post,
            projected_macro_default_rate_pct=def_rate,
        )
