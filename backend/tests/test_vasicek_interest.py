import pytest
from backend.quant.vasicek_interest_rates import VasicekRateModel, VasicekParameters


def test_vasicek_simulation():
    model = VasicekRateModel(VasicekParameters(initial_rate_r0=0.22, long_term_mean_rate_b=0.18))
    res = model.simulate_path(days=30)

    assert len(res.simulated_rates_pct) == 31
    assert 8.0 <= res.terminal_rate_pct <= 55.0


def test_vasicek_yield_curve():
    model = VasicekRateModel()
    curve = model.yield_curve([3, 6, 12, 24])

    assert 3 in curve
    assert 12 in curve
    assert curve[3] > 0.0
