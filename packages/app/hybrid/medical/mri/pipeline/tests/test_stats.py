"""Reference tests for the statistical tests.

Every expected value here is computed by hand from the published formula, not
copied from the implementation, so a regression in the formula fails the test.
"""

import numpy as np
import pytest
from scipy import stats

from pipeline.core.stats import (
    benjamini_hochberg_fdr,
    bootstrap_ci,
    compare_models,
    corrected_paired_t_test,
    paired_t_test,
    wilcoxon_signed_rank_test,
)


def test_paired_t_test_matches_scipy():
    first = np.array([0.81, 0.79, 0.83, 0.80])
    second = np.array([0.70, 0.72, 0.68, 0.71])

    result = paired_t_test(first, second)
    expected_t, expected_p = stats.ttest_rel(first, second)

    assert result["t_statistic"] == pytest.approx(expected_t)
    assert result["p_value"] == pytest.approx(expected_p)
    assert result["mean_diff"] == pytest.approx(0.105)
    assert result["std_diff"] == pytest.approx(np.std([0.11, 0.07, 0.15, 0.09], ddof=1))


def test_paired_t_test_rejects_mismatched_lengths():
    with pytest.raises(ValueError, match="same shape"):
        paired_t_test(np.array([0.1, 0.2]), np.array([0.3]))


def test_corrected_test_inflates_variance_like_nadeau_bengio():
    first = np.array([0.81, 0.79, 0.83, 0.80])
    second = np.array([0.70, 0.72, 0.68, 0.71])

    result = corrected_paired_t_test(first, second, n_folds=4)

    # differences: [0.11, 0.07, 0.15, 0.09]; variance with ddof=1 is 7/6000.
    variance = np.var([0.11, 0.07, 0.15, 0.09], ddof=1)
    assert variance == pytest.approx(7 / 6000)
    # Nadeau-Bengio inflation for K=4 is 1/K + (K-1) = 3.25.
    inflation = 1 / 4 + 3
    expected_se = np.sqrt(variance * inflation / 4)
    assert result["corrected_t_statistic"] == pytest.approx(0.105 / expected_se)
    # The corrected test must never be more significant than the naive one.
    assert result["corrected_p_value"] > result["p_value"]
    assert result["corrected_df"] == pytest.approx((4 - 1) * 0.45)


def test_corrected_test_p_value_uses_scaled_degrees_of_freedom():
    first = np.array([0.81, 0.79, 0.83, 0.80])
    second = np.array([0.70, 0.72, 0.68, 0.71])

    result = corrected_paired_t_test(first, second, n_folds=4, df_scaling=0.45)
    df = 3 * 0.45
    expected_p = 2 * stats.t.sf(abs(result["corrected_t_statistic"]), df=df)

    assert result["corrected_p_value"] == pytest.approx(expected_p)


def test_corrected_test_one_sided_alternative():
    first = np.array([0.81, 0.79, 0.83, 0.80])
    second = np.array([0.70, 0.72, 0.68, 0.71])

    greater = corrected_paired_t_test(first, second, n_folds=4, alternative="greater")

    assert 0 < greater["corrected_p_value"] < 0.5
    assert greater["corrected_p_value"] * 2 == pytest.approx(
        corrected_paired_t_test(first, second, n_folds=4)["corrected_p_value"]
    )


def test_corrected_test_reports_no_evidence_for_a_constant_difference():
    # Every fold moved by exactly the same amount: zero spread, so there is
    # nothing to test. Reporting p=1 keeps the FDR step free of NaN.
    result = corrected_paired_t_test(np.full(4, 0.8), np.full(4, 0.7), n_folds=4)

    assert result["degenerate"] is True
    assert result["corrected_p_value"] == 1.0


def test_corrected_test_rejects_a_fold_count_that_does_not_match():
    with pytest.raises(ValueError, match="does not match"):
        corrected_paired_t_test(np.array([0.8, 0.7]), np.array([0.6, 0.5]), n_folds=4)


def test_corrected_test_needs_two_folds():
    with pytest.raises(ValueError, match="at least two folds"):
        corrected_paired_t_test(np.array([0.8]), np.array([0.7]), n_folds=1)


def test_corrected_test_rejects_an_unknown_alternative():
    with pytest.raises(ValueError, match="unknown alternative"):
        corrected_paired_t_test(np.array([0.8, 0.7]), np.array([0.6, 0.5]), n_folds=2,
                                alternative="sideways")


def test_benjamini_hochberg_matches_the_hand_computed_step_up():
    # sorted: 0.005*4/1 = 0.020, 0.010*4/2 = 0.020, 0.030*4/3 = 0.040, 0.040*4/4 = 0.040
    result = benjamini_hochberg_fdr([0.01, 0.04, 0.03, 0.005])

    assert result["corrected_p_values"] == pytest.approx([0.02, 0.04, 0.04, 0.02])
    assert result["rejected"] == [True, True, True, True]
    assert result["n_rejected"] == 4
    assert result["n_tests"] == 4


def test_benjamini_hochberg_keeps_monotone_adjusted_p_values():
    result = benjamini_hochberg_fdr([0.001, 0.008, 0.02, 0.04, 0.6])

    adjusted = result["corrected_p_values"]
    assert all(
        earlier <= later for earlier, later in zip(adjusted, sorted(adjusted))
    )
    assert min(adjusted) >= max(result["original_p_values"]) * 0  # sanity: finite
    assert result["n_rejected"] < result["n_tests"]


def test_benjamini_hochberg_handles_an_empty_comparison_set():
    result = benjamini_hochberg_fdr([])

    assert result["corrected_p_values"] == []
    assert result["n_tests"] == 0


def test_benjamini_hochberg_rejects_values_outside_zero_one():
    with pytest.raises(ValueError, match=r"\[0, 1\]"):
        benjamini_hochberg_fdr([0.2, 1.4])


def test_wilcoxon_matches_scipy():
    first = np.array([0.81, 0.79, 0.83, 0.80])
    second = np.array([0.70, 0.72, 0.68, 0.71])

    result = wilcoxon_signed_rank_test(first, second)
    expected_stat, expected_p = stats.wilcoxon(first, second)

    assert result["statistic"] == pytest.approx(expected_stat)
    assert result["p_value"] == pytest.approx(expected_p)


def test_bootstrap_ci_is_deterministic_for_a_seed():
    scores = np.array([0.1, 0.4, 0.2, 0.9, 0.3])

    first = bootstrap_ci(scores, n_bootstrap=2000, seed=11)
    second = bootstrap_ci(scores, n_bootstrap=2000, seed=11)

    assert first["ci_lower"] == pytest.approx(second["ci_lower"])
    assert first["ci_upper"] == pytest.approx(second["ci_upper"])


def test_bootstrap_ci_brackets_the_mean_and_does_not_touch_global_random_state():
    scores = np.array([0.10, 0.20, 0.30, 0.40])
    np.random.seed(0)
    expected_next = np.random.random()

    np.random.seed(0)
    result = bootstrap_ci(scores, n_bootstrap=500, seed=5)

    assert result["ci_lower"] <= result["mean"] <= result["ci_upper"]
    assert np.random.random() == pytest.approx(expected_next)


def test_bootstrap_ci_rejects_an_empty_sample():
    with pytest.raises(ValueError, match="empty sample"):
        bootstrap_ci(np.array([]))


def test_compare_models_infers_the_fold_count_and_pairs_every_combination():
    result = compare_models({
        "logreg": np.array([0.81, 0.79, 0.83, 0.80, 0.82]),
        "boost": np.array([0.70, 0.72, 0.68, 0.71, 0.69]),
        "rf": np.array([0.75, 0.74, 0.77, 0.76, 0.75]),
    })

    assert result["n_comparisons"] == 3
    assert result["n_models"] == 3
    assert all(item["n_folds"] == 5 for item in result["comparisons"])
    assert len(result["fdr_summary"]["corrected_p_values"]) == 3


def test_compare_models_refuses_ragged_score_arrays():
    with pytest.raises(ValueError, match="same folds"):
        compare_models({"a": np.array([0.8, 0.7]), "b": np.array([0.8, 0.7, 0.6])})


def test_compare_models_needs_at_least_two_models():
    with pytest.raises(ValueError, match="at least two"):
        compare_models({"only": np.array([0.8, 0.7])})