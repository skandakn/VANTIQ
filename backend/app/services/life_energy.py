"""
VANTIQ Life-Energy Labor Hours Calculator
Translates abstract percentage interest rates and emergency debt
into physical hours and working days of human labor freedom.
"""

from app.schemas.solvency import BorrowerProfile, LaborEnergyResult


class LifeEnergyEngine:
    """
    Translates monetary liabilities into real labor hours:
    Hourly Wage = Net Monthly Income / Working Hours per Month
    Labor Hours = Debt / Hourly Wage
    """

    def calculate(
        self,
        salary: float,
        shock_amount: float,
        monthly_hours: int = 160,
    ) -> LaborEnergyResult:
        net_salary = max(salary, 10000.0)
        hours = max(monthly_hours, 80)
        hourly_wage = round(net_salary / float(hours), 2)

        # Predatory instant credit scenario (36% APR + 4.5% upfront fee over 3 months)
        predatory_repayment = shock_amount * 1.18 + (shock_amount * 0.045)
        predatory_hours = round(predatory_repayment / hourly_wage, 1)

        # VANTIQ coordinated relief (0-9.8% blended APR over 6 months)
        vantiq_repayment = shock_amount * 1.049
        vantiq_hours = round(vantiq_repayment / hourly_wage, 1)

        hours_saved = max(0.0, round(predatory_hours - vantiq_hours, 1))
        days_saved = round(hours_saved / 8.0, 1)

        # Cortisol overload index (1-100 scale)
        cortisol_index = min(95.0, max(15.0, (predatory_hours / (hours * 1.5)) * 100.0))

        # Freedom milestone day in month
        freedom_day = min(30, max(5, int(28 - (days_saved * 0.8))))

        return LaborEnergyResult(
            hourly_net_wage=hourly_wage,
            predatory_debt_labor_hours=predatory_hours,
            vantiq_debt_labor_hours=vantiq_hours,
            labor_hours_liberated=hours_saved,
            working_days_liberated=days_saved,
            cortisol_overload_index=round(cortisol_index, 1),
            freedom_milestone_day=freedom_day,
        )


life_energy_engine = LifeEnergyEngine()
