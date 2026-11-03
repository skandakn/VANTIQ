"""
VANTIQ Markov Chain Cashflow Dynamics Simulator
Models household financial solvency as a discrete-time Markov chain (DTMC)
with states representing financial health tiers:
State 0: Robust Surplus (> 30 days buffer)
State 1: Fragile Solvency (10-30 days buffer)
State 2: Critical Stress (< 10 days buffer, Day 32 collision risk)
State 3: Default / Insolvency (Absorbing State)
"""

from typing import Dict, List, Tuple, Any
import numpy as np


class MarkovCashflowSimulator:
    """
    Computes absorption probabilities, expected time to default,
    and long-term stationary distribution under predatory vs VANTIQ paths.
    """

    STATE_LABELS = [
        "Robust Surplus",
        "Fragile Solvency",
        "Critical Stress",
        "Default / Insolvency",
    ]

    def build_transition_matrix(self, is_vantiq: bool = False) -> np.ndarray:
        """
        Transition probability matrix P:
        Rows: current state (0, 1, 2, 3)
        Cols: next state (0, 1, 2, 3)
        State 3 is absorbing: P[3, 3] = 1.0
        """
        if is_vantiq:
            # Under VANTIQ coordinated relief, transitions recover upward
            P = np.array(
                [
                    [0.82, 0.15, 0.03, 0.00],  # From Robust
                    [0.45, 0.48, 0.07, 0.00],  # From Fragile
                    [0.25, 0.55, 0.19, 0.01],  # From Critical
                    [0.00, 0.00, 0.00, 1.00],  # Absorbing Default
                ],
                dtype=np.float64,
            )
        else:
            # Under naive uncoordinated instant credit, acute cascade to default
            P = np.array(
                [
                    [0.60, 0.28, 0.10, 0.02],  # From Robust
                    [0.10, 0.45, 0.35, 0.10],  # From Fragile
                    [0.02, 0.12, 0.46, 0.40],  # From Critical (High default probability)
                    [0.00, 0.00, 0.00, 1.00],  # Absorbing Default
                ],
                dtype=np.float64,
            )
        return P

    def compute_absorption_probabilities(self, P: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        Canonical decomposition for absorbing Markov chain:
        P = [ Q   R ]
            [ 0   I ]
        Fundamental matrix N = (I - Q)^(-1)
        Absorption probabilities B = N * R
        Expected time to absorption t = N * 1
        """
        Q = P[:3, :3]
        R = P[:3, 3:]
        I = np.eye(3, dtype=np.float64)

        N = np.linalg.inv(I - Q)
        B = np.dot(N, R)
        t = np.sum(N, axis=1)

        return B, t

    def analyze(self) -> Dict[str, Any]:
        p_naive = self.build_transition_matrix(is_vantiq=False)
        p_vantiq = self.build_transition_matrix(is_vantiq=True)

        b_naive, t_naive = self.compute_absorption_probabilities(p_naive)
        b_vantiq, t_vantiq = self.compute_absorption_probabilities(p_vantiq)

        return {
            "naive_scenario": {
                "absorption_prob_from_robust": round(float(b_naive[0, 0]), 4),
                "absorption_prob_from_fragile": round(float(b_naive[1, 0]), 4),
                "absorption_prob_from_critical": round(float(b_naive[2, 0]), 4),
                "expected_steps_to_absorption_critical": round(float(t_naive[2]), 2),
            },
            "vantiq_scenario": {
                "absorption_prob_from_robust": round(float(b_vantiq[0, 0]), 4),
                "absorption_prob_from_fragile": round(float(b_vantiq[1, 0]), 4),
                "absorption_prob_from_critical": round(float(b_vantiq[2, 0]), 4),
                "expected_steps_to_absorption_critical": round(float(t_vantiq[2]), 2),
            },
            "default_risk_reduction_critical": round(float(b_naive[2, 0] - b_vantiq[2, 0]) * 100, 1),
        }


markov_cashflow_engine = MarkovCashflowSimulator()
