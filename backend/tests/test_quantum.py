"""
Unit tests for Quantum Knapsack QUBO Solver
"""

import pytest
from app.schemas.quantum import ReliefSource, QuantumSolveRequest
from app.services.quantum_solver import quantum_solver


def test_quantum_solver_allocation():
    sources = [
        ReliefSource(
            source_id="apollo-0emi",
            name="Apollo 0% EMI",
            category="zero_emi",
            available_amount=30000.0,
            effective_apr=0.0,
            processing_fee_rate=0.0,
            tenure_months=6,
            risk_score=1.0,
        ),
        ReliefSource(
            source_id="corporate-grant",
            name="Employer Advance",
            category="advance",
            available_amount=20000.0,
            effective_apr=0.0,
            processing_fee_rate=0.0,
            tenure_months=6,
            risk_score=1.0,
        ),
        ReliefSource(
            source_id="hdfc-med",
            name="HDFC Medical Loan",
            category="bank",
            available_amount=50000.0,
            effective_apr=9.5,
            processing_fee_rate=0.01,
            tenure_months=12,
            risk_score=2.0,
        ),
        ReliefSource(
            source_id="predatory-loan",
            name="FastSalary 24x7",
            category="nbfc",
            available_amount=50000.0,
            effective_apr=48.0,
            processing_fee_rate=0.06,
            tenure_months=3,
            risk_score=5.0,
        ),
    ]

    req = QuantumSolveRequest(
        required_amount=50000.0,
        max_monthly_repayment_capacity=12000.0,
        sources=sources,
        annealing_steps=1000,
    )

    result = quantum_solver.solve(req)

    assert result.total_allocated >= 48000.0, "Should satisfy the required funding amount"
    assert result.blended_apr < 20.0, "Blended APR should reject high-cost predatory sources"
    assert result.total_monthly_emi <= 14000.0, "Monthly EMI should remain near capacity"
    assert len(result.allocations) >= 1, "Should allocate to at least one instrument"
    assert result.execution_time_ms > 0.0, "Execution timer should be recorded"


def test_qubo_matrix_symmetry():
    sources = [
        ReliefSource(
            source_id="s1",
            name="Source 1",
            available_amount=20000.0,
            effective_apr=5.0,
            tenure_months=6,
        ),
        ReliefSource(
            source_id="s2",
            name="Source 2",
            available_amount=30000.0,
            effective_apr=10.0,
            tenure_months=6,
        ),
    ]
    Q, weights = quantum_solver.build_qubo_matrix(sources, 40000.0, 8000.0)
    assert Q.shape == (2, 2)
    assert weights.shape == (2,)
