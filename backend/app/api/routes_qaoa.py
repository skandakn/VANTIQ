"""
API Router for QAOA Quantum Circuit Simulator
"""

from fastapi import APIRouter, Query
import numpy as np

from app.services.ising_qaoa_simulator import qaoa_simulator

router = APIRouter()


@router.get("/simulate", summary="Simulate QAOA Variational Quantum Circuit")
async def simulate_qaoa(
    n_qubits: int = Query(4, ge=2, le=8, description="Number of qubits in the quantum register"),
    p_layers: int = Query(2, ge=1, le=4, description="Number of QAOA alternating variational layers"),
):
    """
    Executes a classical simulation of a p-layer Quantum Approximate Optimization Algorithm (QAOA)
    circuit on an Ising knapsack problem instance.
    """
    # Generate synthetic diagonal problem Hamiltonian
    dim = 2 ** n_qubits
    np.random.seed(42)
    energies = np.random.uniform(-5.0, 5.0, dim)
    energies[0] = -12.5  # Distinct ground state

    simulator = qaoa_simulator if p_layers == 2 else type(qaoa_simulator)(p_layers=p_layers)
    result = simulator.optimize_variational_angles(energies, n_qubits)
    return result
