"""
API Router for Algorithmic & Monte Carlo Benchmarks
"""

from fastapi import APIRouter, Query
from backend.benchmarks.qubo_benchmark import run_benchmark_trial
from backend.benchmarks.cashflow_monte_carlo import stress_tester

router = APIRouter()


@router.get("/qubo-vs-greedy", summary="Benchmark QUBO Annealing vs Classical Greedy")
async def benchmark_qubo(
    num_sources: int = Query(8, ge=4, le=16),
    iterations: int = Query(15, ge=5, le=50),
):
    """
    Benchmarks runtime latency and blended APR between Quantum Simulated Annealing
    and Classical Greedy Knapsack heuristic.
    """
    return run_benchmark_trial(num_sources=num_sources, num_iterations=iterations)


@router.get("/monte-carlo-stress", summary="Run Monte Carlo 500-iteration solvency stress test")
async def run_monte_carlo(
    salary: float = Query(68500.0, gt=0),
    shock: float = Query(50000.0, gt=0),
    savings: float = Query(31000.0, ge=0),
):
    """
    Runs stochastic stress testing to calculate Value at Risk (VaR 95%) and Expected Shortfall.
    """
    return stress_tester.stress_test(base_salary=salary, base_shock=shock, base_savings=savings)
