"""
Unit tests for Neuro-Adaptive Shield Protocol
"""

import pytest
from app.services.neuro_shield import neuro_shield_engine


def test_neuro_shield_stabilization():
    res = neuro_shield_engine.evaluate_lockout_impact(heart_rate_bpm=118.0, elapsed_seconds=45.0)
    assert res["stabilized_bpm"] == 72.0
    assert res["bandwidth_restored_percent"] == 100.0
    assert res["is_grounding_complete"] is True
    assert len(res["timeline"]) == 4
