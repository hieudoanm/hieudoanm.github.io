"""Searching for the degrees-of-freedom scaling that fits this design.

Split out of `null_test.py`: that module estimates the type-I error rate of one
scaling, this one sweeps the range and reports which scaling reproduces the
nominal alpha on the same simulated data.
"""

import hashlib
from typing import Any

import numpy as np

from pipeline.core.null_test import ScoreGenerator, verdict
from pipeline.core.stats import clopper_pearson, corrected_paired_t_test


def calibrate_df_scaling(
    score_generator: ScoreGenerator,
    n_folds: int = 4,
    target_alpha: float = 0.05,
    n_simulations: int = 1000,
    scaling_range: tuple[float, float] = (0.1, 3.0),
    n_steps: int = 10,
    seed: int = 42,
) -> dict[str, Any]:
    """Search for the degrees-of-freedom scaling that matches `target_alpha`.

    Every candidate is evaluated on the same simulated comparisons (common
    random numbers), so differences in error rate come from the scaling alone.

    Args:
        score_generator: Called with a generator, returns (scores1, scores2)
        n_folds: Number of cross-validation folds per simulation
        target_alpha: Nominal type-I error rate to hit
        n_simulations: Simulations per candidate
        scaling_range: Inclusive range of scalings to try
        n_steps: Number of candidate scalings
        seed: Seed for the shared data generation

    Returns:
        The best scaling, its error rate, and every candidate's result
    """
    steps = max(int(n_steps), 1)
    scalings = np.linspace(scaling_range[0], scaling_range[1], steps)

    # One data set, reused for every candidate.
    rng = np.random.default_rng(seed)
    simulated: list[tuple[np.ndarray, np.ndarray]] = [
        score_generator(rng) for _ in range(n_simulations)
    ]

    fingerprint = _fingerprint(simulated)
    results: list[dict[str, Any]] = []
    for scaling in scalings:
        row = _rate_for_scaling(simulated, float(scaling), n_folds, target_alpha)
        results.append({**row, "data_fingerprint": fingerprint})

    best = min(results, key=lambda item: abs(item["error_rate"] - target_alpha))
    calibrated = [item for item in results if item["meets_target"]]
    return {
        "best_df_scaling": best["df_scaling"],
        "best_error_rate": best["error_rate"],
        "target_alpha": target_alpha,
        "n_simulations": n_simulations,
        "n_folds": n_folds,
        "scaling_range": list(scaling_range),
        "data_fingerprint": fingerprint,
        # Empty means no candidate reproduced the nominal rate, which is a result
        # in itself: for a 4-fold design the corrected test is conservative.
        "calibrated_scalings": [item["df_scaling"] for item in calibrated],
        "reaches_target": bool(calibrated),
        "conclusion": _calibration_conclusion(calibrated, best, target_alpha),
        "scaling_factors": scalings.tolist(),
        "results": results,
    }


def _fingerprint(simulated: list[tuple[np.ndarray, np.ndarray]]) -> str:
    """Digest of the shared simulated data, so a reader can prove it was reused."""
    hasher = hashlib.sha256()
    for scores1, scores2 in simulated:
        hasher.update(np.asarray(scores1, dtype=float).tobytes())
        hasher.update(np.asarray(scores2, dtype=float).tobytes())
    return hasher.hexdigest()[:16]


def _rate_for_scaling(
    simulated: list[tuple[np.ndarray, np.ndarray]],
    df_scaling: float,
    n_folds: int,
    alpha: float,
) -> dict[str, Any]:
    """Type-I error rate of one scaling on an already simulated data set."""
    rejections = 0
    p_values: list[float] = []
    for scores1, scores2 in simulated:
        p_value = corrected_paired_t_test(
            scores1,
            scores2,
            n_folds=n_folds,
            df_scaling=df_scaling,
        )["corrected_p_value"]
        p_values.append(p_value)
        if p_value < alpha:
            rejections += 1

    total = len(simulated)
    lower, upper = clopper_pearson(rejections, total, confidence=0.95)
    empirical = rejections / total if total else float("nan")
    return {
        "df_scaling": df_scaling,
        "error_rate": float(empirical),
        "n_rejections": rejections,
        "ci_lower": float(lower),
        "ci_upper": float(upper),
        "meets_target": bool(lower <= alpha <= upper),
        "verdict": verdict(empirical, alpha),
        "p_values": p_values,
    }


def _calibration_conclusion(
    calibrated: list[dict[str, Any]],
    best: dict[str, Any],
    target_alpha: float,
) -> str:
    """One sentence a reader can paste into a methods section."""
    if calibrated:
        spread = sorted({item["df_scaling"] for item in calibrated})
        return (
            f"df scaling {spread[0]}-{spread[-1]} reproduces the nominal "
            f"{target_alpha} type-I error rate"
        )
    if best["error_rate"] < target_alpha:
        return (
            f"no scaling in the searched range reaches {target_alpha}: the test is "
            f"conservative (closest is {best['df_scaling']} at "
            f"{best['error_rate']:.3f}), so it can only understate real differences"
        )
    return (
        f"no scaling in the searched range reaches {target_alpha}: the test stays "
        f"anti-conservative (closest is {best['df_scaling']} at "
        f"{best['error_rate']:.3f})"
    )
