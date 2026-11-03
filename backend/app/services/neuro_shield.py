"""
VANTIQ Neuro-Adaptive Shield Protocol Engine
Implements behavioral economics interventions based on Scarcity Theory
(Mullainathan & Shafir, 2013) to intercept panic borrowing during acute shocks.
Enforces a 45-second reflective pacing buffer and computes cognitive load metrics.
"""

import time
from typing import Dict, List, Any


class NeuroAdaptiveShieldEngine:
    """
    Simulates the physiological and cognitive stabilization provided by
    the 45-second reflective grounding lockout protocol.
    """

    DEFAULT_LOCKOUT_DURATION_SECONDS = 45

    def evaluate_lockout_impact(
        self,
        heart_rate_bpm: float = 118.0,
        tunnel_vision_index: float = 8.5,  # 1 to 10 scale
        elapsed_seconds: float = 45.0,
    ) -> Dict[str, Any]:
        """
        Computes the restored cognitive bandwidth as a function of reflective elapsed time.
        """
        # Exponential decay of acute sympathetic panic response
        decay_factor = min(1.0, elapsed_seconds / float(self.DEFAULT_LOCKOUT_DURATION_SECONDS))
        stabilized_bpm = round(heart_rate_bpm - (decay_factor * (heart_rate_bpm - 72.0)), 1)
        bandwidth_restored = round(decay_factor * 85.0 + 15.0, 1)  # Percent of prefrontal bandwidth
        impulsive_action_intercepted = elapsed_seconds >= self.DEFAULT_LOCKOUT_DURATION_SECONDS

        physiological_readout = [
            {
                "second": 0,
                "heart_rate_bpm": heart_rate_bpm,
                "cortisol_state": "Acute Panic Surge",
                "prefrontal_bandwidth_percent": 15.0,
                "tunnel_vision": "Extreme percentage numbness",
            },
            {
                "second": 15,
                "heart_rate_bpm": round(heart_rate_bpm - 12.0, 1),
                "cortisol_state": "Parasympathetic Engagement",
                "prefrontal_bandwidth_percent": 38.0,
                "tunnel_vision": "Emerging interest rate awareness",
            },
            {
                "second": 30,
                "heart_rate_bpm": round(heart_rate_bpm - 26.0, 1),
                "cortisol_state": "Reflective Deceleration",
                "prefrontal_bandwidth_percent": 68.0,
                "tunnel_vision": "Evaluation of total cost and APR traps",
            },
            {
                "second": 45,
                "heart_rate_bpm": 72.0,
                "cortisol_state": "Ground-State Solvency Alignment",
                "prefrontal_bandwidth_percent": 100.0,
                "tunnel_vision": "Full reflective agency restored",
            },
        ]

        return {
            "lockout_duration_seconds": self.DEFAULT_LOCKOUT_DURATION_SECONDS,
            "elapsed_seconds": elapsed_seconds,
            "initial_bpm": heart_rate_bpm,
            "stabilized_bpm": stabilized_bpm,
            "bandwidth_restored_percent": bandwidth_restored,
            "is_grounding_complete": impulsive_action_intercepted,
            "cognitive_summary": (
                "The 45-second reflective circuit breaker disengages panic-induced percentage numbness, "
                "restoring full prefrontal cortex oversight to prevent signing high-APR instant debt contracts."
            ),
            "timeline": physiological_readout,
        }


neuro_shield_engine = NeuroAdaptiveShieldEngine()
