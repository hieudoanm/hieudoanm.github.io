"""Null simulation test for type-I error rate calibration."""

import numpy as np
from typing import Dict, Any, List, Callable
from pipeline.core.stats import corrected_paired_t_test


def null_simulation_test(
    score_generator: Callable[[], Tuple[np.ndarray, np.ndarray]],
    n_simulations: int = 1000,
    n_folds: int = 4,
    df_scaling: float = 0.45,
    alpha: float = 0.05,
    seed: int = 42,
) -> Dict[str, Any]:
    """Run null simulation to estimate type-I error rate of the statistical test.
    
    This test generates data under the null hypothesis (no difference between models)
    and checks how often the test incorrectly rejects the null.
    
    Args:
        score_generator: Function that returns (scores1, scores2) under null hypothesis
        n_simulations: Number of simulations to run
        n_folds: Number of CV folds
        df_scaling: Degrees of freedom scaling factor to test
        alpha: Significance level
        seed: Random seed
    
    Returns:
        Dictionary with simulation results
    """
    np.random.seed(seed)
    
    rejections = 0
    p_values = []
    
    for _ in range(n_simulations):
        # Generate scores under null hypothesis
        scores1, scores2 = score_generator()
        
        # Run the statistical test
        result = corrected_paired_t_test(
            scores1,
            scores2,
            n_folds=n_folds,
            df_scaling=df_scaling,
        )
        
        p_values.append(result["corrected_p_value"])
        
        # Check if null is rejected
        if result["corrected_p_value"] < alpha:
            rejections += 1
    
    # Calculate empirical type-I error rate
    empirical_error_rate = rejections / n_simulations
    
    # Calculate confidence interval for error rate
    from scipy import stats
    ci_lower, ci_upper = stats.beta.interval(
        0.95,
        rejections + 1,
        n_simulations - rejections + 1,
    )
    
    return {
        "n_simulations": n_simulations,
        "n_rejections": rejections,
        "empirical_error_rate": empirical_error_rate,
        "expected_error_rate": alpha,
        "ci_lower": ci_lower,
        "ci_upper": ci_upper,
        "is_calibrated": ci_lower <= alpha <= ci_upper,
        "df_scaling": df_scaling,
        "n_folds": n_folds,
        "p_values": p_values,
    }


def generate_null_scores_normal(
    n_folds: int = 4,
    mean: float = 0.8,
    std: float = 0.1,
    seed: int = None,
) -> Tuple[np.ndarray, np.ndarray]:
    """Generate scores under null hypothesis using normal distribution.
    
    Both models get scores from the same distribution (no difference).
    
    Args:
        n_folds: Number of folds
        mean: Mean score
        std: Standard deviation
        seed: Random seed
    
    Returns:
        Tuple of (scores1, scores2)
    """
    if seed is not None:
        np.random.seed(seed)
    
    scores = np.random.normal(mean, std, n_folds)
    return scores.copy(), scores.copy()


def calibrate_df_scaling(
    score_generator: Callable[[], Tuple[np.ndarray, np.ndarray]],
    n_folds: int = 4,
    target_alpha: float = 0.05,
    n_simulations: int = 1000,
    scaling_range: Tuple[float, float] = (0.1, 1.0),
    n_steps: int = 10,
    seed: int = 42,
) -> Dict[str, Any]:
    """Find the optimal df_scaling factor to calibrate the test.
    
    Args:
        score_generator: Function that generates scores under null
        n_folds: Number of CV folds
        target_alpha: Target type-I error rate
        n_simulations: Number of simulations per scaling factor
        scaling_range: Range of scaling factors to test
        n_steps: Number of steps in the range
        seed: Random seed
    
    Returns:
        Dictionary with calibration results
    """
    scaling_factors = np.linspace(scaling_range[0], scaling_range[1], n_steps)
    results = []
    
    for i, df_scaling in enumerate(scaling_factors):
        sim_seed = seed + i
        result = null_simulation_test(
            score_generator=score_generator,
            n_simulations=n_simulations,
            n_folds=n_folds,
            df_scaling=df_scaling,
            alpha=target_alpha,
            seed=sim_seed,
        )
        results.append({
            "df_scaling": df_scaling,
            "error_rate": result["empirical_error_rate"],
            "ci_lower": result["ci_lower"],
            "ci_upper": result["ci_upper"],
        })
    
    # Find the scaling factor closest to target
    errors = [abs(r["error_rate"] - target_alpha) for r in results]
    best_idx = np.argmin(errors)
    best_scaling = scaling_factors[best_idx]
    
    return {
        "best_df_scaling": float(best_scaling),
        "best_error_rate": results[best_idx]["error_rate"],
        "target_alpha": target_alpha,
        "scaling_factors": scaling_factors.tolist(),
        "results": results,
    }
