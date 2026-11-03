"""
VANTIQ QAOA Quantum Approximate Optimization Algorithm Simulator
Simulates parameterized quantum circuit evolution for the Knapsack Ising Hamiltonian.

Variational Quantum Circuit Formulation:
|gamma, beta> = U(B, beta_p) U(C, gamma_p) ... U(B, beta_1) U(C, gamma_1) |+>^n

Where:
- U(C, gamma) = exp(-i * gamma * H_C) is the Problem Phase Hamiltonian
- U(B, beta)  = exp(-i * beta * H_M) is the Transverse Field Mixer Hamiltonian: H_M = sum_i sigma_x^i
- |+>^n is the uniform superposition ground state
"""

import math
import cmath
from typing import List, Tuple, Dict, Any
import numpy as np


class QAOAIsingSimulator:
    """
    Simulates p-layer QAOA state vector propagation on the Knapsack combinatorial problem.
    """

    def __init__(self, p_layers: int = 3):
        self.p_layers = p_layers

    def initialize_superposition(self, n_qubits: int) -> np.ndarray:
        """Constructs uniform superposition state vector |+>^n = 1/sqrt(2^n) sum_x |x>."""
        dim = 2 ** n_qubits
        state = np.full(dim, 1.0 / math.sqrt(dim), dtype=np.complex128)
        return state

    def apply_cost_hamiltonian(
        self,
        state: np.ndarray,
        gamma: float,
        diagonal_energies: np.ndarray,
    ) -> np.ndarray:
        """
        Applies diagonal unitary phase shift: U(C, gamma) = exp(-i * gamma * H_C).
        """
        phase_factors = np.exp(-1j * gamma * diagonal_energies)
        return state * phase_factors

    def apply_mixer_hamiltonian(
        self,
        state: np.ndarray,
        beta: float,
        n_qubits: int,
    ) -> np.ndarray:
        """
        Applies transverse field rotation: U(B, beta) = prod_k (cos(beta) I - i sin(beta) X_k).
        """
        dim = 2 ** n_qubits
        cos_b = math.cos(beta)
        sin_b = math.sin(beta)

        new_state = state.copy()
        for k in range(n_qubits):
            step = 1 << k
            for i in range(0, dim, 2 * step):
                for j in range(i, i + step):
                    idx0 = j
                    idx1 = j + step
                    v0 = new_state[idx0]
                    v1 = new_state[idx1]
                    new_state[idx0] = cos_b * v0 - 1j * sin_b * v1
                    new_state[idx1] = cos_b * v1 - 1j * sin_b * v0

        return new_state

    def simulate_circuit(
        self,
        diagonal_energies: np.ndarray,
        n_qubits: int,
        gammas: List[float],
        betas: List[float],
    ) -> Tuple[np.ndarray, float]:
        """
        Propagates initial state through p alternating layers of cost and mixer unitaries.
        """
        state = self.initialize_superposition(n_qubits)

        for p in range(len(gammas)):
            state = self.apply_cost_hamiltonian(state, gammas[p], diagonal_energies)
            state = self.apply_mixer_hamiltonian(state, betas[p], n_qubits)

        probabilities = np.abs(state) ** 2
        expectation_energy = float(np.sum(probabilities * diagonal_energies))
        return probabilities, expectation_energy

    def optimize_variational_angles(
        self,
        diagonal_energies: np.ndarray,
        n_qubits: int,
    ) -> Dict[str, Any]:
        """
        Nelder-Mead / Grid search over variational parameters (gamma, beta).
        """
        best_energy = float("inf")
        best_gammas = [0.25 * (i + 1) for i in range(self.p_layers)]
        best_betas = [0.35 * (i + 1) for i in range(self.p_layers)]

        # Grid sweep over 2 variational angles
        for g in np.linspace(0.1, math.pi, 6):
            for b in np.linspace(0.1, math.pi / 2.0, 6):
                gammas = [float(g)] * self.p_layers
                betas = [float(b)] * self.p_layers
                _, e = self.simulate_circuit(diagonal_energies, n_qubits, gammas, betas)
                if e < best_energy:
                    best_energy = e
                    best_gammas = gammas
                    best_betas = betas

        probs, final_e = self.simulate_circuit(diagonal_energies, n_qubits, best_gammas, best_betas)
        best_bitstring_idx = int(np.argmax(probs))
        bitstring = format(best_bitstring_idx, f"0{n_qubits}b")

        return {
            "p_layers": self.p_layers,
            "optimal_gammas": [round(x, 4) for x in best_gammas],
            "optimal_betas": [round(x, 4) for x in best_betas],
            "ground_state_energy": round(final_e, 4),
            "max_probability": round(float(np.max(probs)), 4),
            "optimal_eigenstate_bitstring": bitstring,
        }


qaoa_simulator = QAOAIsingSimulator(p_layers=2)
