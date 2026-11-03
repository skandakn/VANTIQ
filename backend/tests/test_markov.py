"""
Unit tests for Markov Chain Cashflow Dynamics
"""

import pytest
import numpy as np
from app.services.markov_cashflow import markov_cashflow_engine


def test_markov_transition_matrix_stochastic():
    P_naive = markov_cashflow_engine.build_transition_matrix(is_vantiq=False)
    P_vantiq = markov_cashflow_engine.build_transition_matrix(is_vantiq=True)

    # Every row of transition matrix must sum to 1.0 (stochastic property)
    assert np.allclose(np.sum(P_naive, axis=1), 1.0)
    assert np.allclose(np.sum(P_vantiq, axis=1), 1.0)


def test_markov_absorption_reduction():
    res = markov_cashflow_engine.analyze()
    naive_abs = res["naive_scenario"]["absorption_prob_from_critical"]
    vantiq_abs = res["vantiq_scenario"]["absorption_prob_from_critical"]

    assert vantiq_abs < naive_abs, "VANTIQ must strictly lower absorption probability into default"
    assert res["default_risk_reduction_critical"] > 50.0
