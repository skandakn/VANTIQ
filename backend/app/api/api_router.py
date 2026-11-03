"""
Central API Router for VANTIQ Backend
"""

from fastapi import APIRouter
from app.api import (
    routes_quantum,
    routes_cashflow,
    routes_shap,
    routes_fund_finder,
    routes_parser,
    routes_solvency,
    routes_qaoa,
    routes_credit_score,
    routes_bureau,
    routes_benchmarks,
    routes_quant,
)

api_router = APIRouter()

api_router.include_router(routes_quantum.router, prefix="/quantum-knapsack", tags=["Quantum Knapsack QUBO"])
api_router.include_router(routes_cashflow.router, prefix="/cashflow-twin", tags=["90-Day Cashflow Digital Twin"])
api_router.include_router(routes_shap.router, prefix="/shap-explainer", tags=["TreeSHAP Explainable AI"])
api_router.include_router(routes_fund_finder.router, prefix="/fund-finder", tags=["Fund Finder Relief Ranker"])
api_router.include_router(routes_parser.router, prefix="/statement-parser", tags=["Bank Statement Parser"])
api_router.include_router(routes_solvency.router, prefix="/solvency", tags=["Dual Capacity & Life Energy"])
api_router.include_router(routes_qaoa.router, prefix="/qaoa-quantum", tags=["QAOA Quantum Circuit Simulation"])
api_router.include_router(routes_credit_score.router, prefix="/credit-score", tags=["Dynamic Cashflow Credit Score"])
api_router.include_router(routes_bureau.router, prefix="/bureau-asymmetry", tags=["Credit Bureau Lag Simulator"])
api_router.include_router(routes_benchmarks.router, prefix="/benchmarks", tags=["Algorithmic Benchmarks"])
api_router.include_router(routes_quant.router)
