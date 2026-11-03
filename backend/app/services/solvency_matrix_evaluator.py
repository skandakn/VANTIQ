"""
VANTIQ 2D Solvency Surface & Parameter Sensitivity Evaluator
Computes 2D grid matrix evaluating borrower solvency across combinations of
Monthly Salary (INR 25,000 - 150,000) vs Emergency Shock (INR 10,000 - 200,000).
"""

from typing import List, Dict, Any
import numpy as np


class SolvencyMatrixEvaluator:
    """
    Evaluates solvency resilience surfaces across income and shock grids.
    """

    SALARY_TICKS = [25000, 40000, 60000, 80000, 100000, 150000]
    SHOCK_TICKS = [15000, 30000, 50000, 75000, 100000, 150000]

    def evaluate_grid(self) -> Dict[str, Any]:
        grid_results: List[Dict[str, Any]] = []

        for sal in self.SALARY_TICKS:
            for shk in self.SHOCK_TICKS:
                living = sal * 0.45
                existing_debt = sal * 0.18
                surplus = max(0.0, sal - living - existing_debt)

                # Naive 3-month loan
                naive_emi = (shk * 1.18) / 3.0
                naive_solvent = surplus >= naive_emi

                # VANTIQ 6-month loan
                vantiq_emi = (shk * 1.049) / 6.0
                vantiq_solvent = surplus >= vantiq_emi

                grid_results.append(
                    {
                        "salary": sal,
                        "shock": shk,
                        "absorptive_surplus": round(surplus, 0),
                        "naive_emi": round(naive_emi, 0),
                        "vantiq_emi": round(vantiq_emi, 0),
                        "naive_solvent": naive_solvent,
                        "vantiq_solvent": vantiq_solvent,
                        "solvency_gap": round(max(0.0, naive_emi - surplus), 0),
                    }
                )

        return {
            "salaries": self.SALARY_TICKS,
            "shocks": self.SHOCK_TICKS,
            "total_cells": len(grid_results),
            "cells": grid_results,
        }


solvency_grid_evaluator = SolvencyMatrixEvaluator()
