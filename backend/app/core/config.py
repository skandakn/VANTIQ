"""
VANTIQ Backend Core Configuration
Central configuration definitions for algorithmic parameters, CORS, and runtime environment.
"""

from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "VANTIQ Algorithmic Solvency & Relief Engine"
    VERSION: str = "2.4.0"
    API_V1_STR: str = "/api/v1"
    DESCRIPTION: str = (
        "High-performance Python backend for VANTIQ: QUBO Quantum Knapsack optimizer, "
        "90-Day Cashflow Digital Twin simulation, TreeSHAP Explainable AI attribution, "
        "and medical emergency relief ranking."
    )
    
    # Cross-Origin Resource Sharing
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "https://vantiq-khaki.vercel.app",
        "https://*.vercel.app",
        "*",
    ]
    
    # Algorithmic Parameters
    QUANTUM_ANNEALING_STEPS: int = 1500
    QUANTUM_INITIAL_TEMPERATURE: float = 12.0
    QUANTUM_FINAL_TEMPERATURE: float = 0.05
    QUANTUM_COOLING_RATE: float = 0.985
    QUANTUM_PENALTY_MULTIPLIER: float = 2.5
    
    # Cashflow Digital Twin Simulation Parameters
    CASHFLOW_DEFAULT_HORIZON_DAYS: int = 90
    MONTE_CARLO_SIMULATION_RUNS: int = 500
    INCOME_SHOCK_VOLATILITY: float = 0.08
    
    # Financial Benchmarks
    DEFAULT_MONTHLY_HOURS: int = 160
    DEFAULT_MINIMUM_SAFETY_BUFFER_DAYS: int = 15
    MAX_ALLOWABLE_DTI_RATIO: float = 0.45

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
