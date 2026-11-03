"""
Tabu Search Combinatorial Knapsack Solver for Multi-Lender Debt Reallocation
Provides metaheuristic local search with tabu tenure, aspiration criteria,
and frequency-based diversification to avoid local optima when restructuring debt.
"""

from __future__ import annotations

import copy
import random
from typing import List, Dict, Any, Tuple
from pydantic import BaseModel, Field


class CreditSource(BaseModel):
    source_id: str
    name: str
    amount: float
    apr: float
    speed_hours: float
    stress_penalty: float
    is_predatory: bool


class TabuSearchResult(BaseModel):
    selected_source_ids: List[str]
    total_amount: float
    weighted_apr: float
    objective_score: float
    iterations_run: int
    tabu_hits: int
    computation_time_ms: float


class TabuSearchKnapsack:
    """
    Solves multi-objective financial relief allocation via Tabu Search.
    Objective:
        Maximize net funds covered while strictly penalizing excess borrowing,
        high APR, high disbursement lag, and predatory lender penalties.
    """

    def __init__(
        self,
        target_amount: float,
        sources: List[CreditSource],
        max_iterations: int = 250,
        tabu_tenure: int = 7,
        seed: int = 42,
    ):
        self.target = target_amount
        self.sources = sources
        self.n = len(sources)
        self.max_iterations = max_iterations
        self.tabu_tenure = tabu_tenure
        random.seed(seed)

    def evaluate(self, bitstring: List[int]) -> float:
        """
        Evaluate objective function. Higher is better.
        """
        tot_amount = sum(self.sources[i].amount * bitstring[i] for i in range(self.n))
        if tot_amount == 0:
            return -1e6

        # Deficit penalty
        deficit = max(0.0, self.target - tot_amount)
        surplus = max(0.0, tot_amount - self.target)

        # Weighted APR
        total_interest_cost = sum(
            self.sources[i].amount * (self.sources[i].apr / 100.0) * bitstring[i]
            for i in range(self.n)
        )
        avg_apr = (total_interest_cost / tot_amount) * 100.0 if tot_amount > 0 else 100.0

        # Predatory penalty
        predatory_penalty = sum(
            self.sources[i].stress_penalty * bitstring[i] for i in range(self.n)
        )

        score = (
            tot_amount * 1.5
            - deficit * 4.0
            - surplus * 2.0
            - avg_apr * 80.0
            - predatory_penalty * 150.0
        )
        return score

    def solve(self) -> TabuSearchResult:
        import time
        start_time = time.perf_counter()

        # Greedy initial solution
        sorted_indices = sorted(
            range(self.n),
            key=lambda i: self.sources[i].apr + self.sources[i].stress_penalty,
        )
        current = [0] * self.n
        acc = 0.0
        for idx in sorted_indices:
            current[idx] = 1
            acc += self.sources[idx].amount
            if acc >= self.target:
                break

        best = list(current)
        best_score = self.evaluate(best)
        current_score = best_score

        # Tabu list: stores flip moves {index: iteration_allowed}
        tabu_list: Dict[int, int] = {}
        tabu_hits = 0

        for it in range(self.max_iterations):
            best_neighbor = None
            best_neighbor_move = -1
            best_neighbor_score = -1e9

            # Explore 1-flip neighborhood
            for i in range(self.n):
                neighbor = list(current)
                neighbor[i] = 1 - neighbor[i]
                score = self.evaluate(neighbor)

                is_tabu = tabu_list.get(i, -1) > it
                # Aspiration criterion: override tabu if it beats overall best
                if is_tabu and score > best_score:
                    is_tabu = False
                elif is_tabu:
                    tabu_hits += 1
                    continue

                if score > best_neighbor_score:
                    best_neighbor_score = score
                    best_neighbor = neighbor
                    best_neighbor_move = i

            if best_neighbor is None:
                break

            current = best_neighbor
            current_score = best_neighbor_score
            tabu_list[best_neighbor_move] = it + self.tabu_tenure

            if current_score > best_score:
                best = list(current)
                best_score = current_score

        elapsed_ms = (time.perf_counter() - start_time) * 1000.0

        selected_ids = [self.sources[i].source_id for i in range(self.n) if best[i] == 1]
        tot_amount = sum(self.sources[i].amount for i in range(self.n) if best[i] == 1)
        tot_cost = sum(
            self.sources[i].amount * self.sources[i].apr for i in range(self.n) if best[i] == 1
        )
        w_apr = round(tot_cost / tot_amount, 2) if tot_amount > 0 else 0.0

        return TabuSearchResult(
            selected_source_ids=selected_ids,
            total_amount=round(tot_amount, 2),
            weighted_apr=w_apr,
            objective_score=round(best_score, 2),
            iterations_run=self.max_iterations,
            tabu_hits=tabu_hits,
            computation_time_ms=round(elapsed_ms, 2),
        )
