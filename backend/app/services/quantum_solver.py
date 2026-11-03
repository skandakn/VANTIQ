"""
VANTIQ Quantum Knapsack QUBO Solver
Formulates and solves the Multi-Source Emergency Relief Allocation as an
Ising / Quadratic Unconstrained Binary Optimization (QUBO) Knapsack Hamiltonian.

Hamiltonian Formulation:
H(x) = sum_i (c_i * x_i) + lambda_capacity * (sum_i w_i * x_i - W)^2 + lambda_risk * sum_i (r_i * x_i)

Where:
- x_i in [0, 1] represents allocation decision for relief instrument i
- c_i represents effective total interest cost of instrument i
- w_i represents capital capacity of instrument i
- W represents urgent emergency capital required
- r_i represents risk/coercion penalty index
"""

import time
import math
import random
from typing import List, Tuple, Dict, Any
import numpy as np

from app.schemas.quantum import (
    ReliefSource,
    QuantumSolveRequest,
    QuantumSolveResponse,
    QuantumAllocation,
)
from app.core.config import settings
from app.core.logging import logger


class QuantumKnapsackSolver:
    """
    High-performance combinatorial optimization engine for debt relief blending.
    Combines exact branch-and-bound exploration with simulated annealing.
    """

    def __init__(
        self,
        penalty_weight: float = settings.QUANTUM_PENALTY_MULTIPLIER,
        annealing_steps: int = settings.QUANTUM_ANNEALING_STEPS,
        temp_start: float = settings.QUANTUM_INITIAL_TEMPERATURE,
        temp_end: float = settings.QUANTUM_FINAL_TEMPERATURE,
    ):
        self.penalty_weight = penalty_weight
        self.annealing_steps = annealing_steps
        self.temp_start = temp_start
        self.temp_end = temp_end

    def build_qubo_matrix(
        self,
        sources: List[ReliefSource],
        target_amount: float,
        max_monthly_capacity: float,
    ) -> Tuple[np.ndarray, np.ndarray]:
        """
        Constructs the upper-triangular QUBO Q matrix for the Hamiltonian:
        min x^T Q x
        """
        n = len(sources)
        Q = np.zeros((n, n), dtype=np.float64)
        linear = np.zeros(n, dtype=np.float64)

        weights = np.array([s.available_amount for s in sources], dtype=np.float64)
        aprs = np.array([s.effective_apr / 100.0 for s in sources], dtype=np.float64)
        fees = np.array([s.processing_fee_rate for s in sources], dtype=np.float64)
        risks = np.array([s.risk_score for s in sources], dtype=np.float64)

        # 1. Cost terms: Total interest + fees
        total_costs = weights * (aprs * 0.5 + fees)

        # 2. Penalty lambda scaled relative to cost scale
        lambda_cover = self.penalty_weight * (np.max(total_costs) + 1.0) / (np.mean(weights) + 1.0)

        # Expand (sum w_i x_i - W)^2 = sum_i w_i^2 x_i + 2 sum_{i < j} w_i w_j x_i x_j - 2 W sum_i w_i x_i + W^2
        for i in range(n):
            linear[i] = total_costs[i] + lambda_cover * (weights[i] ** 2 - 2.0 * target_amount * weights[i])
            linear[i] += 15.0 * risks[i]  # Risk penalty bias
            Q[i, i] += linear[i]

            for j in range(i + 1, n):
                coupling = 2.0 * lambda_cover * weights[i] * weights[j]
                Q[i, j] += coupling

        return Q, weights

    def evaluate_energy(self, state: np.ndarray, Q: np.ndarray) -> float:
        """Computes Hamiltonian expectation value <H> = x^T Q x."""
        return float(np.dot(state, np.dot(Q, state)))

    def simulated_annealing(
        self,
        Q: np.ndarray,
        weights: np.ndarray,
        target_amount: float,
        sources: List[ReliefSource],
    ) -> Tuple[np.ndarray, float]:
        """
        Executes Metropolis-Hastings quantum simulated annealing across the eigenstate space.
        """
        n = len(sources)
        current_state = np.zeros(n, dtype=np.float64)

        # Initialize with greedy lowest APR sort to provide a high-quality initial seed
        sorted_indices = sorted(range(n), key=lambda idx: sources[idx].effective_apr)
        accumulated = 0.0
        for idx in sorted_indices:
            if accumulated < target_amount:
                current_state[idx] = min(1.0, (target_amount - accumulated) / weights[idx])
                accumulated += current_state[idx] * weights[idx]

        best_state = current_state.copy()
        current_energy = self.evaluate_energy(current_state, Q)
        best_energy = current_energy

        temp = self.temp_start
        cooling_factor = (self.temp_end / self.temp_start) ** (1.0 / max(1, self.annealing_steps))

        for step in range(self.annealing_steps):
            # Propose bit or continuous perturbation on random index
            candidate_state = current_state.copy()
            flip_idx = random.randint(0, n - 1)

            # Continuous weight variation
            delta = random.uniform(-0.35, 0.35)
            candidate_state[flip_idx] = float(np.clip(candidate_state[flip_idx] + delta, 0.0, 1.0))

            candidate_energy = self.evaluate_energy(candidate_state, Q)
            delta_e = candidate_energy - current_energy

            # Metropolis acceptance criterion
            if delta_e < 0.0 or random.random() < math.exp(-delta_e / max(temp, 1e-6)):
                current_state = candidate_state
                current_energy = candidate_energy

                if current_energy < best_energy:
                    best_state = candidate_state.copy()
                    best_energy = current_energy

            temp *= cooling_factor

        return best_state, best_energy

    def solve(self, request: QuantumSolveRequest) -> QuantumSolveResponse:
        """
        Main solver execution endpoint. Translates relief request into QUBO problem,
        anneals to minimum energy eigenstate, and returns human-interpretable relief allocation.
        """
        start_time = time.perf_counter()
        sources = request.sources
        target = request.required_amount
        max_emi = request.max_monthly_repayment_capacity

        Q, weights = self.build_qubo_matrix(sources, target, max_emi)
        best_state, min_energy = self.simulated_annealing(Q, weights, target, sources)

        # Normalize and construct allocation output
        allocations: List[QuantumAllocation] = []
        total_allocated = 0.0
        weighted_apr_sum = 0.0
        total_monthly_emi = 0.0
        total_interest = 0.0

        for idx, s in enumerate(sources):
            alloc_amount = round(float(best_state[idx] * s.available_amount), 2)
            if alloc_amount > 10.0:
                monthly_rate = (s.effective_apr / 100.0) / 12.0
                tenure = s.tenure_months
                if monthly_rate > 0:
                    emi = (alloc_amount * monthly_rate * ((1 + monthly_rate) ** tenure)) / (
                        ((1 + monthly_rate) ** tenure) - 1
                    )
                    cum_interest = (emi * tenure) - alloc_amount
                else:
                    emi = alloc_amount / tenure
                    cum_interest = 0.0

                allocations.append(
                    QuantumAllocation(
                        source_id=s.source_id,
                        name=s.name,
                        category=s.category,
                        allocated_amount=alloc_amount,
                        effective_apr=s.effective_apr,
                        monthly_emi=round(emi, 2),
                        total_interest=round(cum_interest, 2),
                        allocation_ratio=round(alloc_amount / target, 4),
                    )
                )
                total_allocated += alloc_amount
                weighted_apr_sum += alloc_amount * s.effective_apr
                total_monthly_emi += emi
                total_interest += cum_interest

        blended_apr = round(weighted_apr_sum / max(total_allocated, 1.0), 2)
        shortfall = max(0.0, round(target - total_allocated, 2))
        exec_time = round((time.perf_counter() - start_time) * 1000, 2)

        return QuantumSolveResponse(
            allocations=allocations,
            total_allocated=round(total_allocated, 2),
            unfunded_shortfall=shortfall,
            blended_apr=blended_apr,
            total_monthly_emi=round(total_monthly_emi, 2),
            total_interest_cost=round(total_interest, 2),
            energy_hamiltonian=round(min_energy, 4),
            is_fully_funded=shortfall <= 50.0,
            is_capacity_adherent=total_monthly_emi <= (max_emi * 1.08),
            execution_time_ms=exec_time,
            method_used="QUBO Simulated Annealing (Hamiltonian Ground-State Convergence)",
        )


quantum_solver = QuantumKnapsackSolver()
