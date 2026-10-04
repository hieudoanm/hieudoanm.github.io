"""Multiplicity correction and interval reporting for model comparison.

Split out of `stats.py`, which keeps the hypothesis tests themselves. These
functions sit on top of a test: they correct a family of p-values, put an
interval around a metric, and run the corrected test across every model pair.
"""

from typing import Any

import numpy as np
from statsmodels.stats.multitest import multipletests

from pipeline.core.stats import corrected_paired_t_test


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
