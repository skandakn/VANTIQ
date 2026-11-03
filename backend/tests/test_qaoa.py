"""
Unit tests for QAOA Quantum Circuit Simulator
"""

import pytest
import numpy as np
from app.services.ising_qaoa_simulator import qaoa_simulator


def test_qaoa_superposition_norm():
    state = qaoa_simulator.initialize_superposition(n_qubits=3)
    norm = np.sum(np.abs(state) ** 2)
    assert np.isclose(norm, 1.0), "Initial state must have unit Euclidean norm"


def test_qaoa_optimization_sweep():
    energies = np.array([-2.0, 1.0, 3.0, -5.0])
    res = qaoa_simulator.optimize_variational_angles(energies, n_qubits=2)
    assert "optimal_gammas" in res
    assert "optimal_betas" in res
    assert res["ground_state_energy"] <= np.mean(energies), "Optimized energy must be below random expectation"
