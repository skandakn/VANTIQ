"""
VANTIQ Synthetic Borrower & Crisis Shock Dataset Generator
Generates realistic Indian middle-income household financial profiles
with log-normal income distributions, medical crisis shocks, and repayment trajectories.
Used for training and calibrating default risk models and TreeSHAP explainability.
"""

import math
import random
from typing import List, Dict, Any
import numpy as np


class SyntheticDataGenerator:
    """
    Generates synthetic crisis shock profiles modeled on Indian urban salaried demographics.
    Parameters calibrated against RBI household finance reports and CMIE consumer surveys.
    """

    CITIES = [
        {"city": "Bengaluru", "tier": 1, "rent_mult": 1.35, "living_mult": 1.25},
        {"city": "Mumbai", "tier": 1, "rent_mult": 1.65, "living_mult": 1.30},
        {"city": "Delhi NCR", "tier": 1, "rent_mult": 1.30, "living_mult": 1.20},
        {"city": "Hyderabad", "tier": 1, "rent_mult": 1.15, "living_mult": 1.10},
        {"city": "Pune", "tier": 2, "rent_mult": 1.10, "living_mult": 1.05},
        {"city": "Ahmedabad", "tier": 2, "rent_mult": 0.95, "living_mult": 0.95},
        {"city": "Coimbatore", "tier": 2, "rent_mult": 0.85, "living_mult": 0.90},
        {"city": "Jaipur", "tier": 2, "rent_mult": 0.80, "living_mult": 0.85},
    ]

    HEALTH_PROCEDURES = [
        {"procedure": "Cardiac Angioplasty / Stenting", "cost_mean": 95000, "cost_std": 25000},
        {"procedure": "Urgent Knee / Orthopedic Surgery", "cost_mean": 75000, "cost_std": 18000},
        {"procedure": "ICU Severe Infection / Sepsis", "cost_mean": 120000, "cost_std": 45000},
        {"procedure": "Emergency Gallbladder Laparoscopy", "cost_mean": 45000, "cost_std": 12000},
        {"procedure": "Accidental Trauma Stabilization", "cost_mean": 60000, "cost_std": 20000},
        {"procedure": "Chemotherapy & Oncology Cycle", "cost_mean": 85000, "cost_std": 30000},
    ]

    def __init__(self, random_seed: int = 42):
        self.seed = random_seed
        random.seed(random_seed)
        np.random.seed(random_seed)

    def generate_single_profile(self) -> Dict[str, Any]:
        """Synthesizes a single high-dimensional borrower profile."""
        city_info = random.choice(self.CITIES)
        procedure_info = random.choice(self.HEALTH_PROCEDURES)

        # Salary distribution: Log-normal centered around INR 55,000 (sigma = 0.45)
        raw_salary = float(np.random.lognormal(mean=10.9, sigma=0.45))
        monthly_salary = round(float(np.clip(raw_salary, 22000.0, 220000.0)), -2)

        # Rent cost proportional to salary and city multiplier
        rent_ratio = random.uniform(0.20, 0.32) * city_info["rent_mult"]
        monthly_rent = round(monthly_salary * min(rent_ratio, 0.42), -2)

        # Living expenses (food, transport, groceries)
        living_ratio = random.uniform(0.18, 0.28) * city_info["living_mult"]
        monthly_living = round(monthly_salary * min(living_ratio, 0.35), -2)

        # Pre-existing debt obligations (two-wheeler loan, personal loan, electronics EMI)
        has_debt = random.random() < 0.68
        if has_debt:
            dti = random.uniform(0.10, 0.35)
            active_emis = round(monthly_salary * dti, -2)
        else:
            active_emis = 0.0

        # Liquid cash buffer in savings
        savings_months = float(np.random.exponential(scale=1.4))
        liquid_savings = round(monthly_salary * min(savings_months, 5.0), -2)

        # Medical crisis shock bill
        shock_cost = float(np.random.normal(procedure_info["cost_mean"], procedure_info["cost_std"]))
        shock_amount = round(float(np.clip(shock_cost, 20000.0, 300000.0)), -2)

        # Corporate or private health insurance cover
        has_insurance = random.random() < 0.42
        if has_insurance:
            cover_rate = random.uniform(0.30, 0.75)
            insurance_cover = round(shock_amount * cover_rate, -2)
        else:
            insurance_cover = 0.0

        out_of_pocket_gap = max(10000.0, shock_amount - insurance_cover)

        # Absorptive surplus computation
        total_monthly_burn = monthly_rent + monthly_living + active_emis
        absorptive_surplus = max(0.0, monthly_salary - total_monthly_burn)
        buffer_days = round(liquid_savings / max(total_monthly_burn / 30.0, 1.0), 1)

        # Ground truth label: Predatory debt default risk (Day 32 collision under 36% APR)
        predatory_emi = (out_of_pocket_gap * 1.18) / 3.0
        collides_day_32 = (absorptive_surplus < predatory_emi) and (liquid_savings < predatory_emi * 1.5)
        default_label = 1 if collides_day_32 else 0

        return {
            "city": city_info["city"],
            "city_tier": city_info["tier"],
            "procedure": procedure_info["procedure"],
            "monthly_salary": monthly_salary,
            "monthly_rent": monthly_rent,
            "monthly_living": monthly_living,
            "active_emis": active_emis,
            "liquid_savings": liquid_savings,
            "buffer_days": buffer_days,
            "absorptive_surplus": absorptive_surplus,
            "shock_amount": shock_amount,
            "insurance_cover": insurance_cover,
            "out_of_pocket_gap": out_of_pocket_gap,
            "predatory_emi": round(predatory_emi, 2),
            "collides_day_32": collides_day_32,
            "default_label": default_label,
        }

    def generate_dataset(self, num_records: int = 5000) -> List[Dict[str, Any]]:
        """Generates a complete tabular dataset of borrower crisis profiles."""
        dataset = []
        for _ in range(num_records):
            dataset.append(self.generate_single_profile())
        return dataset


generator = SyntheticDataGenerator()
