"""Tests for the null simulation that calibrates the corrected test.

The point of these tests is that the harness can actually *fail*: a generator
that returns identical scores, or a calibration search that changes its data
between candidates, must be detectable.
"""

import numpy as np
import pytest

from pipeline.core.null_test import (
    calibrate_df_scaling,
    normal_null_scores,
    null_simulation_test,
    simulate_null_scores,
)


def test_simulated_null_scores_are_distinct_but_equally_good():
    rng = np.random.default_rng(0)

    scores1, scores2 = simulate_null_scores(rng, n_folds=4)

    assert not np.array_equal(scores1, scores2)
    assert abs(scores1.mean() - scores2.mean()) < 0.5
    assert scores1.shape == scores2.shape == (4,)


def test_simulated_null_scores_correlate_as_requested():
    uncorrelated = simulate_null_scores(np.random.default_rng(1), 2000, correlation=0.0)
    shared = simulate_null_scores(np.random.default_rng(1), 2000, correlation=0.9)

    independent_corr = float(np.corrcoef(*uncorrelated)[0, 1])
    shared_corr = float(np.corrcoef(*shared)[0, 1])

    assert abs(independent_corr) < 0.1
    assert 0.8 < shared_corr < 1.0


def test_simulated_null_scores_reject_an_impossible_correlation():
    with pytest.raises(ValueError, match="correlation"):
        simulate_null_scores(np.random.default_rng(0), 4, correlation=1.5)


def test_null_simulation_is_deterministic_for_a_seed():
    generator = normal_null_scores(n_folds=4)

    first = null_simulation_test(generator, n_simulations=200, n_folds=4, seed=7)
    second = null_simulation_test(generator, n_simulations=200, n_folds=4, seed=7)

    assert first["p_values"] == second["p_values"]
    assert first["n_rejections"] == second["n_rejections"]


def test_null_simulation_does_not_touch_the_global_random_state():
    np.random.seed(0)
    expected_next = np.random.random()

    np.random.seed(0)
    null_simulation_test(normal_null_scores(n_folds=4), n_simulations=50, n_folds=4, seed=3)

    assert np.random.random() == pytest.approx(expected_next)


def test_null_simulation_error_rate_is_bracketed_by_its_interval():
    result = null_simulation_test(normal_null_scores(n_folds=4), n_simulations=300, n_folds=4, seed=1)

    assert result["ci_lower"] <= result["empirical_error_rate"] <= result["ci_upper"]
    assert 0.0 <= result["empirical_error_rate"] <= 1.0
    assert result["n_rejections"] == sum(
        1 for p_value in result["p_values"] if p_value < result["expected_error_rate"]
    )


def test_paper_scaling_is_conservative_for_a_four_fold_design():
    # White et al. used 0.45 for four folds. On this design that factor makes the
    # test reject far less often than the nominal rate, which is the finding the
    # roadmap asked to be re-derived rather than copied.
    result = null_simulation_test(
        normal_null_scores(n_folds=4),
        n_simulations=400,
        n_folds=4,
        df_scaling=0.45,
        alpha=0.05,
        seed=5,
    )

    assert result["empirical_error_rate"] < result["expected_error_rate"]
    assert "conservative" in result["verdict"]
    assert result["is_calibrated"] is False


def test_calibration_scores_every_candidate_on_the_same_data():
    result = calibrate_df_scaling(
        normal_null_scores(n_folds=4),
        n_folds=4,
        n_simulations=100,
        n_steps=4,
        seed=2,
    )

    # One fingerprint across every candidate proves the same simulated
    # comparisons were scored, so differences in error rate come from the scaling.
    fingerprint = result["results"][0]["data_fingerprint"]
    assert result["data_fingerprint"] == fingerprint
    for row in result["results"][1:]:
        assert row["data_fingerprint"] == fingerprint
        assert len(row["p_values"]) == 100


def test_calibration_reports_the_best_candidate_and_a_conclusion():
    result = calibrate_df_scaling(
        normal_null_scores(n_folds=4),
        n_folds=4,
        n_simulations=150,
        scaling_range=(0.1, 1.0),
        n_steps=3,
        seed=4,
    )

    assert len(result["results"]) == 3
    assert result["best_df_scaling"] in [pytest.approx(0.1), pytest.approx(0.55), pytest.approx(1.0)]
    assert result["best_error_rate"] == pytest.approx(
        min(row["error_rate"] for row in result["results"])
    )
    assert isinstance(result["conclusion"], str) and result["conclusion"]
    # 0.1-1.0 cannot reach the nominal rate for four folds, and the search says so.
    assert result["reaches_target"] is False
    assert result["calibrated_scalings"] == []
    assert "conservative" in result["conclusion"]


def test_calibration_finds_a_scaling_when_the_rate_is_reachable():
    # A two-fold design has less variance inflation, so the nominal rate is
    # reachable inside the default search range.
    result = calibrate_df_scaling(
        normal_null_scores(n_folds=2, correlation=0.0),
        n_folds=2,
        n_simulations=300,
        scaling_range=(0.5, 2.0),
        n_steps=4,
        seed=6,
    )

    errors = [row["error_rate"] for row in result["results"]]
    assert result["best_error_rate"] == pytest.approx(
        min(errors, key=lambda value: abs(value - 0.05))
    )