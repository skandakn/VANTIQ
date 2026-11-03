"""
VANTIQ Algorithmic Command Line Interface (CLI)
Provides command-line commands to run quantum optimization, 90-day cashflow simulation,
statement parsing, or start the backend FastAPI server.
"""

import argparse
import sys
import json

from app.schemas.quantum import ReliefSource, QuantumSolveRequest
from app.services.quantum_solver import quantum_solver
from app.schemas.cashflow import CashflowSimRequest
from app.services.cashflow_twin import cashflow_simulator
from app.services.shap_explainer import shap_explainer
from app.services.bank_parser import bank_parser


def main():
    parser = argparse.ArgumentParser(
        prog="vantiq-cli",
        description="VANTIQ Algorithmic Relief & Quantum Optimization CLI",
    )
    subparsers = parser.add_subparsers(dest="command", help="Available subcommands")

    # Command: solve-knapsack
    knapsack_p = subparsers.add_parser("solve-knapsack", help="Run QUBO Quantum Knapsack optimizer")
    knapsack_p.add_argument("--amount", type=float, default=50000.0, help="Required emergency amount in INR")
    knapsack_p.add_argument("--capacity", type=float, default=12000.0, help="Maximum monthly repayment capacity")
    knapsack_p.add_argument("--steps", type=int, default=1200, help="Annealing Monte Carlo sweeps")

    # Command: simulate-cashflow
    cashflow_p = subparsers.add_parser("simulate-cashflow", help="Run 90-day cashflow digital twin trajectory")
    cashflow_p.add_argument("--salary", type=float, default=68500.0, help="Net monthly income")
    cashflow_p.add_argument("--shock", type=float, default=50000.0, help="Emergency medical shock amount")
    cashflow_p.add_argument("--savings", type=float, default=31000.0, help="Liquid savings buffer")
    cashflow_p.add_argument("--tenure", type=int, default=6, help="Repayment tenure in months")

    # Command: explain-risk
    explain_p = subparsers.add_parser("explain-risk", help="Compute TreeSHAP attribution for borrower risk")
    explain_p.add_argument("--salary", type=float, default=68500.0)
    explain_p.add_argument("--shock", type=float, default=50000.0)
    explain_p.add_argument("--savings", type=float, default=31000.0)

    # Command: serve
    serve_p = subparsers.add_parser("serve", help="Start the FastAPI backend service")
    serve_p.add_argument("--host", default="0.0.0.0", help="Binding host")
    serve_p.add_argument("--port", type=int, default=8000, help="Listening port")
    serve_p.add_argument("--reload", action="store_true", help="Enable live auto-reload")

    args = parser.parse_args()

    if args.command == "solve-knapsack":
        sources = [
            ReliefSource(
                source_id="apollo-0emi",
                name="Apollo Hospital 0% EMI",
                available_amount=30000.0,
                effective_apr=0.0,
                tenure_months=6,
            ),
            ReliefSource(
                source_id="pmjay",
                name="PM-JAY Sovereign Grant",
                available_amount=25000.0,
                effective_apr=0.0,
                tenure_months=6,
            ),
            ReliefSource(
                source_id="hdfc-med",
                name="HDFC Medical Lifeline",
                available_amount=50000.0,
                effective_apr=9.5,
                tenure_months=12,
            ),
        ]
        req = QuantumSolveRequest(
            required_amount=args.amount,
            max_monthly_repayment_capacity=args.capacity,
            sources=sources,
            annealing_steps=args.steps,
        )
        res = quantum_solver.solve(req)
        print("\n=== VANTIQ Quantum Knapsack Optimization Result ===")
        print(f"Total Allocated: INR {res.total_allocated:,.2f} / INR {args.amount:,.2f}")
        print(f"Blended APR:     {res.blended_apr:.2f}%")
        print(f"Monthly EMI:     INR {res.total_monthly_emi:,.2f}")
        print(f"Total Interest:  INR {res.total_interest_cost:,.2f}")
        print(f"Execution Latency: {res.execution_time_ms:.1f} ms")
        print("\nAllocated Instruments:")
        for a in res.allocations:
            print(f" - {a.name}: INR {a.allocated_amount:,.2f} ({a.effective_apr}% APR, EMI: INR {a.monthly_emi:,.2f})")

    elif args.command == "simulate-cashflow":
        req = CashflowSimRequest(
            monthly_income=args.salary,
            shock_amount=args.shock,
            current_savings=args.savings,
            tenure_months=args.tenure,
        )
        res = cashflow_simulator.simulate(req)
        print("\n=== VANTIQ 90-Day Cashflow Digital Twin Trajectory ===")
        print(f"Day 32 Collision Balance (Naive Instant Loan): INR {res.day_32_naive_balance:,.2f}")
        print(f"Day 90 Terminal Balance (Naive Path):         INR {res.day_90_naive_balance:,.2f}")
        print(f"Day 90 Terminal Balance (VANTIQ Path):        INR {res.day_90_vantiq_balance:,.2f}")
        print(f"90-Day Solvency Delta:                        INR {res.solvency_delta:,.2f}")
        print(f"Avoided Penalty & Default Charges:            INR {res.avoided_penalty_charges:,.2f}")

    elif args.command == "explain-risk":
        res = shap_explainer.explain(
            salary=args.salary,
            shock_amount=args.shock,
            liquid_savings=args.savings,
            active_emis=11200.0,
            tenure_months=6,
        )
        print("\n=== VANTIQ TreeSHAP Attribution Waterfall ===")
        print(f"Base Population Default Risk: {res['base_risk']:.1%}")
        print(f"Calculated Default Risk:     {res['predicted_risk']:.1%}")
        for w in res["waterfall"]:
            print(f" - {w['feature']:28}: {w['shap_value']:+.3f} ({w['direction']})")

    elif args.command == "serve":
        import uvicorn
        uvicorn.run("app.main:app", host=args.host, port=args.port, reload=args.reload)

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
