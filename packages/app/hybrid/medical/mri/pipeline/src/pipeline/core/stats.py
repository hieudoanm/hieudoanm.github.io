"""Statistical tests for model comparison."""

import warnings
from typing import Any

import numpy as np
from scipy import stats


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
    :func:`pipeline.core.calibration.calibrate_df_scaling` before quoting it as a
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


def clopper_pearson(successes: int, total: int, confidence: float) -> tuple[float, float]:
    """Exact binomial confidence interval for a proportion.

    Args:
        successes: Number of rejections observed
        total: Number of trials
        confidence: Interval coverage, typically 0.95

    Returns:
        The lower and upper bounds; NaN when `total` is zero
    """
    if total == 0:
        return float("nan"), float("nan")
    return (
        float(stats.beta.ppf((1 - confidence) / 2, successes, total - successes + 1))
        if successes > 0
        else 0.0,
        float(stats.beta.ppf(1 - (1 - confidence) / 2, successes + 1, total - successes))
        if successes < total
        else 1.0,
    )
