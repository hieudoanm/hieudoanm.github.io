"""Statistical tests for model comparison."""

import warnings
from typing import Any

import numpy as np
from scipy import stats
from statsmodels.stats.multitest import multipletests


def paired_t_test(
    scores1: np.ndarray,
    scores2: np.ndarray,
    alternative: str = "two-sided",
) -> dict[str, Any]:
    """Perform paired t-test between two sets of scores.
    
    Args:
        scores1: Scores from model 1
        scores2: Scores from model 2
        alternative: Alternative hypothesis ('two-sided', 'greater', 'less')
    
    Returns:
        Dictionary with test results
    """
    first = np.asarray(scores1, dtype=float)
    second = np.asarray(scores2, dtype=float)
    if first.shape != second.shape:
        raise ValueError("score arrays must have the same shape")

    _validate_alternative(alternative)
    differences = first - second
    # A constant per-fold difference makes the paired t statistic undefined;
    # scipy warns about it, and the degenerate branch below reports it instead.
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", RuntimeWarning)
        t_stat, p_value = stats.ttest_rel(first, second, alternative=alternative)

    return {
        "t_statistic": float(t_stat),
        "p_value": float(p_value),
        "alternative": alternative,
        "mean_diff": float(differences.mean()),
        "std_diff": float(differences.std(ddof=1)),
    }


def corrected_paired_t_test(
    scores1: np.ndarray,
    scores2: np.ndarray,
    n_folds: int = 4,
    df_scaling: float = 0.45,
    alternative: str = "two-sided",
) -> dict[str, Any]:
    """Corrected resampled t-test for cross-validated scores.

    Cross-validation folds overlap, so fold scores are not independent and the
    ordinary paired t-test is anti-conservative. Following Nadeau and Bengio
    (2003), the variance of the mean difference is inflated by
    ``1/K + (K - 1)`` for K-fold cross-validation, where the training-to-test
    size ratio is ``K - 1``.

    ``df_scaling`` shrinks the degrees of freedom. The default 0.45 comes from
    White et al. (2024) and was calibrated by simulation for *their* design
    (four folds, one lock-box). Re-derive it for this design with
    :func:`pipeline.core.null_test.calibrate_df_scaling` before quoting it as a
    p-value.

    Args:
        scores1: Per-fold scores from model 1
        scores2: Per-fold scores from model 2, aligned fold by fold with `scores1`
        n_folds: Number of cross-validation folds; must equal the score count
        df_scaling: Multiplier applied to the degrees of freedom ``K - 1``
        alternative: 'two-sided', 'greater' or 'less'

    Returns:
        Dictionary with the naive test, the corrected test and the factors used

    Raises:
        ValueError: If the fold count disagrees with the number of scores, or
            fewer than two folds are supplied
    """
    first = np.asarray(scores1, dtype=float)
    second = np.asarray(scores2, dtype=float)
    if first.shape != second.shape:
        raise ValueError("score arrays must have the same shape")
    if len(first) != n_folds:
        raise ValueError(
            f"n_folds={n_folds} does not match {len(first)} scores; "
            "the corrected degrees of freedom depend on the fold count"
        )
    if n_folds < 2:
        raise ValueError("a corrected test needs at least two folds")

    _validate_alternative(alternative)
    differences = first - second
    mean_diff = float(differences.mean())
    variance = float(differences.var(ddof=1))
    degenerate = variance == 0.0
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", RuntimeWarning)
        t_stat, p_value = stats.ttest_rel(first, second, alternative=alternative)

    if degenerate:
        # Every fold moved by the same amount: no spread to test against, so
        # report "no evidence" rather than a NaN that would poison FDR.
        corrected_t = float("nan")
        corrected_p = 1.0
    else:
        # 1/K + (K - 1): the Nadeau-Bengio inflation for K-fold cross-validation.
        inflation = 1.0 / n_folds + (n_folds - 1)
        corrected_se = float(np.sqrt(variance * inflation / n_folds))
        corrected_t = mean_diff / corrected_se
        corrected_p = _t_sf(corrected_t, (n_folds - 1) * df_scaling, alternative)

    return {
        "t_statistic": float(t_stat),
        "p_value": float(p_value),
        "corrected_t_statistic": corrected_t,
        "corrected_p_value": float(corrected_p),
        "corrected_df": float((n_folds - 1) * df_scaling),
        "df_scaling": df_scaling,
        "n_folds": n_folds,
        "alternative": alternative,
        "mean_diff": mean_diff,
        "std_diff": float(differences.std(ddof=1)),
        "degenerate": degenerate,
    }


def _validate_alternative(alternative: str) -> str:
    """Reject an unsupported alternative before SciPy's own message leaks out."""
    if alternative not in {"two-sided", "greater", "less"}:
        raise ValueError(f"unknown alternative: {alternative}")
    return alternative


def _t_sf(t_stat: float, df: float, alternative: str) -> float:
    """Two- or one-sided p-value for a t statistic with the given degrees of freedom."""
    if alternative == "two-sided":
        return float(2.0 * stats.t.sf(abs(t_stat), df=df))
    if alternative == "greater":
        return float(stats.t.sf(t_stat, df=df))
    if alternative == "less":
        return float(stats.t.cdf(t_stat, df=df))
    raise ValueError(f"unknown alternative: {alternative}")


def benjamini_hochberg_fdr(
    p_values: list[float],
    alpha: float = 0.05,
) -> dict[str, Any]:
    """Apply Benjamini-Hochberg false discovery rate correction.
    
    Args:
        p_values: List of p-values
        alpha: Significance level
    
    Returns:
        Dictionary with FDR correction results
    """
    p_array = np.asarray(p_values, dtype=float)
    if p_array.ndim != 1:
        raise ValueError("p_values must be a flat sequence")
    if p_array.size == 0:
        return {
            "original_p_values": [],
            "corrected_p_values": [],
            "rejected": [],
            "alpha": alpha,
            "n_tests": 0,
            "n_rejected": 0,
        }
    if np.any((p_array < 0) | (p_array > 1)):
        raise ValueError("p-values must lie in [0, 1]")

    reject, p_corrected, _, _ = multipletests(
        p_array,
        alpha=alpha,
        method="fdr_bh",
    )

    return {
        "original_p_values": p_array.tolist(),
        "corrected_p_values": p_corrected.tolist(),
        "rejected": reject.tolist(),
        "alpha": alpha,
        "n_tests": int(p_array.size),
        "n_rejected": int(np.sum(reject)),
    }


def wilcoxon_signed_rank_test(
    scores1: np.ndarray,
    scores2: np.ndarray,
    alternative: str = "two-sided",
) -> dict[str, Any]:
    """Perform Wilcoxon signed-rank test (non-parametric alternative to paired t-test).
    
    Args:
        scores1: Scores from model 1
        scores2: Scores from model 2
        alternative: Alternative hypothesis
    
    Returns:
        Dictionary with test results
    """
    _validate_alternative(alternative)
    # scipy is untyped here, so the two components are pulled through numpy to
    # reach the declared float return rather than staying a bound typevar.
    result = stats.wilcoxon(scores1, scores2, alternative=alternative)
    statistic = float(np.asarray(result[0]).item())
    p_value = float(np.asarray(result[1]).item())

    return {
        "statistic": statistic,
        "p_value": p_value,
        "alternative": alternative,
        "mean_diff": float(np.mean(scores1 - scores2)),
    }


def bootstrap_ci(
    scores: np.ndarray,
    n_bootstrap: int = 10000,
    confidence: float = 0.95,
    seed: int = 42,
) -> dict[str, Any]:
    """Percentile bootstrap confidence interval for the mean of `scores`.

    A local generator is used so the result depends only on `seed` and never on
    the global NumPy random state.

    Args:
        scores: Scores to bootstrap
        n_bootstrap: Number of bootstrap resamples
        confidence: Confidence level
        seed: Random seed for the local generator

    Returns:
        Dictionary with the mean and its interval

    Raises:
        ValueError: If `scores` is empty
    """
    values = np.asarray(scores, dtype=float)
    if values.size == 0:
        raise ValueError("cannot bootstrap an empty sample")

    rng = np.random.default_rng(seed)
    indices = rng.integers(0, values.size, size=(n_bootstrap, values.size))
    means = values[indices].mean(axis=1)

    alpha = 1 - confidence
    lower = float(np.percentile(means, 100 * alpha / 2))
    upper = float(np.percentile(means, 100 * (1 - alpha / 2)))

    return {
        "mean": float(values.mean()),
        "ci_lower": lower,
        "ci_upper": upper,
        "confidence": confidence,
        "n_bootstrap": n_bootstrap,
    }


def compare_models(
    model_scores: dict[str, np.ndarray],
    n_folds: int | None = None,
    df_scaling: float = 0.45,
    alpha: float = 0.05,
) -> dict[str, Any]:
    """Compare every pair of models with the corrected test and BH-FDR.

    Args:
        model_scores: Model name to per-fold score array
        n_folds: Fold count; inferred from the score arrays when omitted
        df_scaling: Multiplier on the corrected degrees of freedom
        alpha: Significance level for the FDR step

    Returns:
        Dictionary with one entry per comparison and the FDR summary

    Raises:
        ValueError: If fewer than two models are given, or the arrays disagree in
            length so the pairwise pairing would be meaningless
    """
    model_names = list(model_scores.keys())
    if len(model_names) < 2:
        raise ValueError("comparing models needs at least two of them")

    lengths = {len(np.asarray(scores)) for scores in model_scores.values()}
    if len(lengths) != 1:
        raise ValueError(f"every model must be scored on the same folds, got {sorted(lengths)}")
    if n_folds is None:
        n_folds = lengths.pop()

    comparisons = []
    p_values = []

    for i in range(len(model_names)):
        for j in range(i + 1, len(model_names)):
            model1 = model_names[i]
            model2 = model_names[j]

            result = corrected_paired_t_test(
                model_scores[model1],
                model_scores[model2],
                n_folds=n_folds,
                df_scaling=df_scaling,
            )

            comparisons.append({
                "model1": model1,
                "model2": model2,
                **result,
            })
            p_values.append(result["corrected_p_value"])

    fdr_result = benjamini_hochberg_fdr(p_values, alpha=alpha)

    for i, comparison in enumerate(comparisons):
        comparison["fdr_corrected_p"] = fdr_result["corrected_p_values"][i]
        comparison["fdr_rejected"] = fdr_result["rejected"][i]

    return {
        "comparisons": comparisons,
        "fdr_summary": fdr_result,
        "n_models": len(model_names),
        "n_comparisons": len(comparisons),
        "df_scaling": df_scaling,
        "alpha": alpha,
    }
