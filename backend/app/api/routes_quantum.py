"""
API Router for Quantum Knapsack QUBO Solver
"""

from fastapi import APIRouter, HTTPException, status
from app.schemas.quantum import QuantumSolveRequest, QuantumSolveResponse
from app.services.quantum_solver import quantum_solver
from app.core.logging import logger

router = APIRouter()


@router.post("/solve", response_model=QuantumSolveResponse, summary="Optimize relief allocation via QUBO Annealing")
async def solve_quantum_knapsack(request: QuantumSolveRequest):
    """
    Executes simulated annealing on a Quadratic Unconstrained Binary Optimization (QUBO)
    Ising matrix to find the optimal combination of relief instruments.
    """
    try:
        logger.info(f"Solving quantum knapsack for required amount: INR {request.required_amount:,.2f}")
        result = quantum_solver.solve(request)
        return result
    except Exception as e:
        logger.error(f"Quantum optimization failed: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
