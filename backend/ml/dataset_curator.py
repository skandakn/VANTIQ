"""
Synthetic Household Crisis Financial Dataset Curator
Generates multi-attribute Indian demographic and cashflow profiles with realistic
multi-lender credit bureau lag variables, medical expenditure shocks, and default labels.
"""

from __future__ import annotations

import csv
import math
import random
from typing import List, Dict, Any


def generate_curated_crisis_dataset(
    num_samples: int = 5000,
    output_filepath: str | None = None,
    seed: int = 42,
) -> List[Dict[str, Any]]:
    """
    Generates realistic Indian salaried household emergency stress records.
    Features include:
    - monthly_income_inr: 25k to 150k
    - monthly_expenses_inr: 15k to 95k
    - liquid_savings_inr: 0 to 80k
    - emergency_shock_inr: 20k to 250k
    - bureau_reporting_lag_days: 30 to 60 days
    - active_instant_loans: 1 to 5
    - high_apr_debt_stack_inr: aggregate short-term debt
    - upi_bounces_last_90d: 0 to 6
    - medical_procedure_category: Cardiology, Oncology, Orthopedic, Trauma, Pediatric
    - default_within_90d: 0 or 1
    """
    random.seed(seed)
    records: List[Dict[str, Any]] = []

    procedure_types = ["Cardiology", "Trauma", "Orthopedic", "Oncology", "Pediatric ICU"]

    for i in range(num_samples):
        income = random.gauss(52000, 18000)
        income = max(18000.0, min(160000.0, income))

        # Discretionary & mandatory expenses
        expense_ratio = random.uniform(0.55, 0.88)
        expenses = income * expense_ratio

        # Liquid buffer
        savings = max(0.0, random.gauss(income * 0.45, income * 0.3))

        # Emergency medical expense shock
        shock = random.choice([25000, 45000, 75000, 120000, 180000, 240000])
        shock *= random.uniform(0.85, 1.25)

        # Bureau lag & app stacking
        bureau_lag = random.randint(30, 60)
        num_apps = random.choices([1, 2, 3, 4, 5], weights=[0.25, 0.35, 0.20, 0.12, 0.08])[0]
        instant_debt = sum(random.randint(10000, 35000) for _ in range(num_apps))

        # Upfront fees paid
        fees_paid = instant_debt * random.uniform(0.03, 0.08)

        # UPI auto-debit bounce count
        bounces = random.choices([0, 1, 2, 3, 4, 5], weights=[0.40, 0.25, 0.18, 0.10, 0.05, 0.02])[0]

        # Calculate empirical default risk
        dti = (expenses + (instant_debt * 0.35)) / income
        deficit_ratio = (shock - savings) / income

        default_score = (
            (dti * 0.45)
            + (deficit_ratio * 0.35)
            + (bounces * 0.08)
            + (num_apps * 0.06)
            + (bureau_lag / 100.0 * 0.06)
            + random.gauss(0, 0.05)
        )
        is_default = 1 if default_score > 0.85 else 0

        record = {
            "borrower_id": f"IND-BORROWER-{i+1:05d}",
            "monthly_income_inr": round(income, 2),
            "monthly_expenses_inr": round(expenses, 2),
            "liquid_savings_inr": round(savings, 2),
            "emergency_shock_inr": round(shock, 2),
            "bureau_reporting_lag_days": bureau_lag,
            "active_instant_loans_count": num_apps,
            "high_apr_debt_stack_inr": round(instant_debt, 2),
            "upfront_processing_fees_inr": round(fees_paid, 2),
            "upi_bounces_last_90d": bounces,
            "medical_procedure": random.choice(procedure_types),
            "debt_to_income_ratio": round(dti, 3),
            "deficit_to_income_ratio": round(deficit_ratio, 3),
            "default_within_90d": is_default,
        }
        records.append(record)

    if output_filepath:
        keys = list(records[0].keys())
        with open(output_filepath, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=keys)
            writer.writeheader()
            writer.writerows(records)

    return records
