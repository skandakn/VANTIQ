"""
VANTIQ Monte Carlo Stochastic Cashflow Simulation Suite
Simulates 10,000 stochastic trajectories of household liquidity under emergency debt.
Computes Value at Risk (VaR 95%), Expected Shortfall (CVaR), and Probability of Default.
"""

from typing import Dict, Any, List
import numpy as np

from app.schemas.cashflow import CashflowSimRequest
from app.services.cashflow_twin import cashflow_simulator


class MonteCarloCashflowStressTester:
    """
    Stress-tests household solvency across thousands of randomized income & cost shock iterations.
    """

    def __init__(self, runs: int = 1000):
        self.runs = runs

    def stress_test(
        self,
        base_salary: float = 68500.0,
        base_shock: float = 50000.0,
        base_savings: float = 31000.0,
    ) -> Dict[str, Any]:
        naive_terminal_balances: List[float] = []
        vantiq_terminal_balances: List[float] = []
        naive_defaults = 0
        vantiq_defaults = 0

        for _ in range(self.runs):
            # Stochastic fluctuations: Salary +/- 6%, Living Costs +/- 10%
            sal = float(np.random.normal(base_salary, base_salary * 0.05))
            shock = float(np.random.normal(base_shock, base_shock * 0.08))
            sav = max(5000.0, float(np.random.normal(base_savings, base_savings * 0.12)))

            req = CashflowSimRequest(
                monthly_income=sal,
                fixed_living_costs=31600.0,
                existing_emis=11200.0,
                current_savings=sav,
                shock_amount=shock,
                tenure_months=6,
            )

            res = cashflow_simulator.simulate(req)
            naive_terminal_balances.append(res.day_90_naive_balance)
            vantiq_terminal_balances.append(res.day_90_vantiq_balance)

            if res.day_90_naive_balance < 0:
                naive_defaults += 1
            if res.day_90_vantiq_balance < 0:
                vantiq_defaults += 1

        naive_arr = np.array(naive_terminal_balances)
        vantiq_arr = np.array(vantiq_terminal_balances)

        # Value at Risk 95% (5th percentile outcome)
        var_95_naive = round(float(np.percentile(naive_arr, 5)), 2)
        var_95_vantiq = round(float(np.percentile(vantiq_arr, 5)), 2)

        # Conditional VaR (Expected Shortfall below 5th percentile)
        cvar_95_naive = round(float(np.mean(naive_arr[naive_arr <= var_95_naive])), 2)
        cvar_95_vantiq = round(float(np.mean(vantiq_arr[vantiq_arr <= var_95_vantiq])), 2)

        return {
            "simulation_runs": self.runs,
            "naive_default_probability_percent": round((naive_defaults / self.runs) * 100, 2),
            "vantiq_default_probability_percent": round((vantiq_defaults / self.runs) * 100, 2),
            "mean_naive_terminal_balance": round(float(np.mean(naive_arr)), 2),
            "mean_vantiq_terminal_balance": round(float(np.mean(vantiq_arr)), 2),
            "var_95_naive": var_95_naive,
            "var_95_vantiq": var_95_vantiq,
            "cvar_95_naive": cvar_95_naive,
            "cvar_95_vantiq": cvar_95_vantiq,
            "solvency_alpha_delta": round(float(np.mean(vantiq_arr) - np.mean(naive_arr)), 2),
        }


stress_tester = MonteCarloCashflowStressTester(runs=500)

if __name__ == "__main__":
    out = stress_tester.stress_test()
    print("Monte Carlo Stress Test Results:", out)
