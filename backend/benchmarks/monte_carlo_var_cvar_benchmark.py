"""
Monte Carlo Value at Risk (VaR) & Conditional VaR (Expected Shortfall) Stress Benchmark
Runs 1,000 multi-asset stochastic paths to validate tail risk convergence.
"""

from __future__ import annotations

import time
from typing import Dict, Any
from backend.app.services.monte_carlo_engine import MonteCarloEngine, MonteCarloSimulationConfig


def run_tail_risk_benchmark() -> Dict[str, Any]:
    print("Executing Monte Carlo VaR & CVaR Stress Benchmark (1,000 paths)...")
    t0 = time.perf_counter()

    config = MonteCarloSimulationConfig(
        num_paths=1000,
        horizon_days=90,
        jump_intensity=0.12,
        seed=101,
    )
    engine = MonteCarloEngine(config=config)
    res = engine.run_simulation(
        starting_cash=20000.0,
        monthly_income=60000.0,
        monthly_expenses=38000.0,
        emergency_amount=75000.0,
    )
    elapsed_ms = (time.perf_counter() - t0) * 1000.0

    return {
        "benchmark_name": "Merton Jump Diffusion Tail Risk",
        "num_paths": 1000,
        "horizon_days": 90,
        "execution_time_ms": round(elapsed_ms, 2),
        "uncoordinated_insolvency_rate_pct": round(res.uncoordinated_metrics.insolvency_probability * 100.0, 2),
        "vantiq_insolvency_rate_pct": round(res.vantiq_metrics.insolvency_probability * 100.0, 2),
        "uncoordinated_var_95_inr": res.uncoordinated_metrics.value_at_risk_95,
        "uncoordinated_cvar_95_inr": res.uncoordinated_metrics.conditional_var_95,
        "vantiq_var_95_inr": res.vantiq_metrics.value_at_risk_95,
        "vantiq_cvar_95_inr": res.vantiq_metrics.conditional_var_95,
        "risk_abatement_percentage": res.delta_insolvency_reduction_pct,
    }


if __name__ == "__main__":
    report = run_tail_risk_benchmark()
    for k, v in report.items():
        print(f"{k}: {v}")
