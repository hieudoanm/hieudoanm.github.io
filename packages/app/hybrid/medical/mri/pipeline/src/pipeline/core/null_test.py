"""Null simulations that check the type-I error rate of a test.

A correction factor is only trustworthy if it was measured on this design.
:func:`null_simulation_test` estimates how often a test rejects when there is
genuinely no difference, and :func:`calibrate_df_scaling` searches for the
degrees-of-freedom scaling that makes that rate match the nominal alpha.

Two rules make the estimate meaningful:

- the two models must produce *different* per-fold scores from the *same*
  distribution, because two real models trained on the same folds never return
  identical scores (identical scores carry no variance and prove nothing);
- every candidate scaling must see the same simulated data, so the comparison
  between candidates is not confounded by the random draw.
"""

import numpy as np
import hashlib
from typing import Any, Callable, Dict, List, Tuple

from pipeline.core.stats import corrected_paired_t_test

ScoreGenerator = Callable[[np.random.Generator], Tuple[np.ndarray, np.ndarray]]


def simulate_null_scores(
    rng: np.random.Generator,
    n_folds: int,
    mean: float = 0.8,
    std: float = 0.1,
    correlation: float = 0.5,
) -> Tuple[np.ndarray, np.ndarray]:
    """Draw two equally good but distinct sets of per-fold scores.

    Cross-validated scores of two models on the same folds are correlated, not
    identical. `correlation` is the correlation of that shared difficulty per
    fold; 0 gives independent scores, 1 gives perfectly shared difficulty.

    Args:
        rng: Generator to draw from
        n_folds: Number of folds
        mean: Mean score shared by both models
        std: Standard deviation of the per-fold scores
        correlation: Correlation between the two models' fold scores

    Returns:
        The two score arrays

    Raises:
        ValueError: If `correlation` is outside [-1, 1]
    """
    if not -1.0 <= correlation <= 1.0:
        raise ValueError(f"correlation must be in [-1, 1], got {correlation}")

    # scores2 is the correlated remap of scores1, so both keep the requested mean
    # and spread while their correlation is exactly `correlation`. A plain
    # "shared + independent noise" construction would not: its correlation would
    # be 1/sqrt(2 - correlation^2), never 0.
    scores1 = rng.normal(mean, std, n_folds)
    deviation = scores1 - mean
    scores2 = mean + correlation * deviation + std * np.sqrt(1.0 - correlation**2) * rng.normal(
        size=n_folds
    )
    return scores1, scores2


def normal_null_scores(
    n_folds: int = 4,
    mean: float = 0.8,
    std: float = 0.1,
    correlation: float = 0.5,
) -> ScoreGenerator:
    """Build a score generator that draws from the correlated normal model.

    Use it with :func:`null_simulation_test` or :func:`calibrate_df_scaling`::

        null_simulation_test(normal_null_scores(n_folds=4), n_folds=4)
    """

    def generator(rng: np.random.Generator) -> Tuple[np.ndarray, np.ndarray]:
        return simulate_null_scores(rng, n_folds, mean=mean, std=std, correlation=correlation)

    return generator


def null_simulation_test(
    score_generator: ScoreGenerator,
    n_simulations: int = 1000,
    n_folds: int = 4,
    df_scaling: float = 0.45,
    alpha: float = 0.05,
    seed: int = 42,
) -> Dict[str, Any]:
    """Estimate the empirical type-I error rate of the corrected paired test.

    Args:
        score_generator: Called with a generator, returns (scores1, scores2)
        n_simulations: Number of simulated comparisons
        n_folds: Number of cross-validation folds per simulation
        df_scaling: Degrees-of-freedom scaling to test
        alpha: Nominal significance level
        seed: Seed for the local generator

    Returns:
        Empirical error rate with a Clopper-Pearson interval and a verdict
    """
    rng = np.random.default_rng(seed)

    p_values: List[float] = []
    rejections = 0
    for _ in range(n_simulations):
        scores1, scores2 = score_generator(rng)
        result = corrected_paired_t_test(
            scores1,
            scores2,
            n_folds=n_folds,
            df_scaling=df_scaling,
        )
        p_value = result["corrected_p_value"]
        p_values.append(p_value)
        if p_value < alpha:
            rejections += 1

    empirical = rejections / n_simulations if n_simulations else float("nan")
    lower, upper = _clopper_pearson(rejections, n_simulations, confidence=0.95)

    return {
        "n_simulations": n_simulations,
        "n_rejections": rejections,
        "empirical_error_rate": float(empirical),
        "expected_error_rate": alpha,
        "ci_lower": float(lower),
        "ci_upper": float(upper),
        "is_calibrated": bool(lower <= alpha <= upper),
        "verdict": _verdict(empirical, alpha),
        "df_scaling": df_scaling,
        "n_folds": n_folds,
        "p_values": p_values,
    }


def calibrate_df_scaling(
    score_generator: ScoreGenerator,
    n_folds: int = 4,
    target_alpha: float = 0.05,
    n_simulations: int = 1000,
    scaling_range: Tuple[float, float] = (0.1, 3.0),
    n_steps: int = 10,
    seed: int = 42,
) -> Dict[str, Any]:
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
    simulated: List[Tuple[np.ndarray, np.ndarray]] = [
        score_generator(rng) for _ in range(n_simulations)
    ]

    fingerprint = _fingerprint(simulated)
    results = []
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


def _fingerprint(simulated: List[Tuple[np.ndarray, np.ndarray]]) -> str:
    """Digest of the shared simulated data, so a reader can prove it was reused."""
    hasher = hashlib.sha256()
    for scores1, scores2 in simulated:
        hasher.update(np.asarray(scores1, dtype=float).tobytes())
        hasher.update(np.asarray(scores2, dtype=float).tobytes())
    return hasher.hexdigest()[:16]


def _rate_for_scaling(
    simulated: List[Tuple[np.ndarray, np.ndarray]],
    df_scaling: float,
    n_folds: int,
    alpha: float,
) -> Dict[str, Any]:
    """Type-I error rate of one scaling on an already simulated data set."""
    rejections = 0
    p_values: List[float] = []
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
    lower, upper = _clopper_pearson(rejections, total, confidence=0.95)
    empirical = rejections / total if total else float("nan")
    return {
        "df_scaling": df_scaling,
        "error_rate": float(empirical),
        "n_rejections": rejections,
        "ci_lower": float(lower),
        "ci_upper": float(upper),
        "meets_target": bool(lower <= alpha <= upper),
        "verdict": _verdict(empirical, alpha),
        "p_values": p_values,
    }


def _clopper_pearson(successes: int, total: int, confidence: float) -> Tuple[float, float]:
    """Exact binomial confidence interval for a proportion."""
    from scipy import stats as scipy_stats

    if total == 0:
        return float("nan"), float("nan")
    return (
        float(scipy_stats.beta.ppf((1 - confidence) / 2, successes, total - successes + 1))
        if successes > 0
        else 0.0,
        float(scipy_stats.beta.ppf(1 - (1 - confidence) / 2, successes + 1, total - successes))
        if successes < total
        else 1.0,
    )


def _calibration_conclusion(
    calibrated: List[Dict[str, Any]],
    best: Dict[str, Any],
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


def _verdict(empirical: float, alpha: float) -> str:
    """Plain-language read on an empirical error rate."""
    if empirical < alpha * 0.5:
        return "conservative: the test rarely rejects when there is no difference"
    if empirical > alpha * 2:
        return "anti-conservative: the test rejects far too often under the null"
    return "close to the nominal rate"