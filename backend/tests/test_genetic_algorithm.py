import pytest
from backend.app.services.genetic_algorithm_solver import ReliefInstrument, GeneticDebtOptimizer


def test_genetic_optimizer():
    instruments = [
        ReliefInstrument(
            instrument_id="GOV-01",
            title="PM-JAY Sovereign Grant",
            category="sovereign",
            principal=35000.0,
            apr=0.0,
            disbursement_hours=12.0,
            life_energy_hours_per_month=0.0,
            is_safe=True,
        ),
        ReliefInstrument(
            instrument_id="HOSP-01",
            title="Apollo Zero-Cost EMI",
            category="hospital",
            principal=25000.0,
            apr=4.5,
            disbursement_hours=2.0,
            life_energy_hours_per_month=5.2,
            is_safe=True,
        ),
        ReliefInstrument(
            instrument_id="PRED-01",
            title="Predatory Payday App",
            category="instant_app",
            principal=30000.0,
            apr=48.0,
            disbursement_hours=0.25,
            life_energy_hours_per_month=32.0,
            is_safe=False,
        ),
    ]

    opt = GeneticDebtOptimizer(
        instruments=instruments,
        target_amount=50000.0,
        population_size=30,
        generations=20,
    )
    result = opt.run()

    assert len(result.pareto_frontier) > 0
    assert result.recommended_solution.weighted_apr < 25.0
