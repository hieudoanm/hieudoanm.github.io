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

from collections.abc import Callable
from typing import Any

import numpy as np

from pipeline.core.stats import clopper_pearson, corrected_paired_t_test

ScoreGenerator = Callable[[np.random.Generator], tuple[np.ndarray, np.ndarray]]


def simulate_null_scores(
    rng: np.random.Generator,
    n_folds: int,
    mean: float = 0.8,
    std: float = 0.1,
    correlation: float = 0.5,
) -> tuple[np.ndarray, np.ndarray]:
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

    def generator(rng: np.random.Generator) -> tuple[np.ndarray, np.ndarray]:
        return simulate_null_scores(rng, n_folds, mean=mean, std=std, correlation=correlation)

    return generator


def null_simulation_test(
    score_generator: ScoreGenerator,
    n_simulations: int = 1000,
    n_folds: int = 4,
    df_scaling: float = 0.45,
    alpha: float = 0.05,
    seed: int = 42,
) -> dict[str, Any]:
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

    p_values: list[float] = []
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
    lower, upper = clopper_pearson(rejections, n_simulations, confidence=0.95)

    return {
        "n_simulations": n_simulations,
        "n_rejections": rejections,
        "empirical_error_rate": float(empirical),
        "expected_error_rate": alpha,
        "ci_lower": float(lower),
        "ci_upper": float(upper),
        "is_calibrated": bool(lower <= alpha <= upper),
        "verdict": verdict(empirical, alpha),
        "df_scaling": df_scaling,
        "n_folds": n_folds,
        "p_values": p_values,
    }


def verdict(empirical: float, alpha: float) -> str:
    """Plain-language read on an empirical error rate."""
    if empirical < alpha * 0.5:
        return "conservative: the test rarely rejects when there is no difference"
    if empirical > alpha * 2:
        return "anti-conservative: the test rejects far too often under the null"
    return "close to the nominal rate"
