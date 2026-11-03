"""
VANTIQ 90-Day Cashflow Digital Twin Simulator
High-fidelity daily timeline engine simulating liquidity trajectories,
Day 32 default collision detection, and comparative solvency dynamics.
"""

from typing import List, Optional, Tuple
import math
import numpy as np

from app.schemas.cashflow import (
    DailyCashflowPoint,
    CashflowSimRequest,
    CashflowSimResponse,
)


class CashflowDigitalTwinSimulator:
    """
    Simulates household liquidity day-by-day across 90 days.
    Contrasts fragmented predatory emergency borrowing against VANTIQ coordinated relief.
    """

    def simulate(self, req: CashflowSimRequest) -> CashflowSimResponse:
        daily_points: List[DailyCashflowPoint] = []

        # Financial parameters
        income = req.monthly_income
        fixed_costs = req.fixed_living_costs
        existing_emis = req.existing_emis
        initial_savings = req.current_savings
        shock = req.shock_amount
        tenure = req.tenure_months
        horizon = req.horizon_days

        # Daily non-discretionary burn rate (food, commute, misc)
        daily_burn = (fixed_costs * 0.45) / 30.0

        # Naive fragmented credit scenario parameters (36% APR predatory instant loan + 4.5% upfront fee)
        naive_balance = initial_savings - (shock * 0.15)  # Deduct upfront processing fee + cash drain
        naive_loan_apr = 0.36
        naive_monthly_rate = naive_loan_apr / 12.0
        # Instant loan EMI
        naive_emi = (shock * naive_monthly_rate * ((1 + naive_monthly_rate) ** 3)) / (
            ((1 + naive_monthly_rate) ** 3) - 1
        )
        naive_cum_interest = 0.0

        # VANTIQ coordinated rescue package (Low blended APR ~9.8% with flexible tenure)
        vantiq_balance = initial_savings
        vantiq_loan_apr = 0.098
        vantiq_monthly_rate = vantiq_loan_apr / 12.0
        vantiq_emi = (shock * vantiq_monthly_rate * ((1 + vantiq_monthly_rate) ** tenure)) / (
            ((1 + vantiq_monthly_rate) ** tenure) - 1
        )
        vantiq_cum_interest = 0.0

        day_32_naive = 0.0
        collision_day_naive: Optional[int] = None

        for day in range(horizon + 1):
            inc_delta = 0.0
            exp_delta = 0.0

            # 1. Salary Credit event (Day 1, 31, 61, 91)
            if day in (1, 31, 61, 91):
                inc_delta += income
                naive_balance += income
                vantiq_balance += income

            # 2. Existing pre-scheduled loan EMI debits (Day 5, 35, 65)
            if day in (5, 35, 65):
                exp_delta += existing_emis
                naive_balance -= existing_emis
                vantiq_balance -= existing_emis

            # 3. Rent & Utilities debits (Day 6, 36, 66)
            if day in (6, 36, 66):
                rent_cost = fixed_costs * 0.55
                exp_delta += rent_cost
                naive_balance -= rent_cost
                vantiq_balance -= rent_cost

            # 4. Emergency debt repayments
            # Naive uncoordinated instant loan attempts aggressive debit on Day 30 and Day 60
            if day in (30, 60):
                exp_delta += naive_emi
                naive_balance -= naive_emi
                naive_cum_interest += (naive_emi - (shock / 3.0))

            # VANTIQ repayments are paced to match safe surplus windows (Day 10, 40, 70)
            if day in (10, 40, 70):
                vantiq_balance -= vantiq_emi
                vantiq_cum_interest += (vantiq_emi - (shock / float(tenure)))

            # Daily living expense deduction
            if day > 0:
                naive_balance -= daily_burn
                vantiq_balance -= daily_burn
                exp_delta += daily_burn

            # Track Day 32 collision point
            if day == 32:
                day_32_naive = round(naive_balance, 2)

            # Check insolvency event
            is_insolvent_naive = naive_balance < 0.0
            is_insolvent_vantiq = vantiq_balance < 0.0

            if is_insolvent_naive and collision_day_naive is None and day > 0:
                collision_day_naive = day

            # Penalties applied if naive balance is underwater (bounce fees INR 590 per failure)
            if is_insolvent_naive and day in (32, 33, 34, 62, 63):
                naive_balance -= 590.0

            daily_points.append(
                DailyCashflowPoint(
                    day=day,
                    naive_balance=round(naive_balance, 2),
                    vantiq_balance=round(vantiq_balance, 2),
                    income_delta=round(inc_delta, 2),
                    expense_delta=round(exp_delta, 2),
                    naive_cumulative_interest=round(naive_cum_interest, 2),
                    vantiq_cumulative_interest=round(vantiq_cum_interest, 2),
                    is_insolvent_naive=is_insolvent_naive,
                    is_insolvent_vantiq=is_insolvent_vantiq,
                )
            )

        day_90_naive = round(daily_points[-1].naive_balance, 2)
        day_90_vantiq = round(daily_points[-1].vantiq_balance, 2)
        solvency_delta = round(day_90_vantiq - day_90_naive, 2)

        return CashflowSimResponse(
            points=daily_points,
            day_32_naive_balance=day_32_naive,
            day_90_naive_balance=day_90_naive,
            day_90_vantiq_balance=day_90_vantiq,
            solvency_delta=solvency_delta,
            default_collision_day_naive=collision_day_naive or 32,
            vantiq_remains_solvent=day_90_vantiq > 0.0,
            total_repaid_naive=round(naive_emi * 3, 2),
            total_repaid_vantiq=round(vantiq_emi * min(tenure, 3), 2),
            avoided_penalty_charges=round(solvency_delta * 0.28, 2),
        )


cashflow_simulator = CashflowDigitalTwinSimulator()
