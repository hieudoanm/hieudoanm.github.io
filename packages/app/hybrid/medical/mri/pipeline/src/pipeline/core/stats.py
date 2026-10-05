"""Statistical tests for model comparison."""

import numpy as np
from typing import Dict, Any, List, Tuple
from scipy import stats
from statsmodels.stats.multitest import multipletests


def paired_t_test(
    scores1: np.ndarray,
    scores2: np.ndarray,
    alternative: str = "two-sided",
) -> Dict[str, Any]:
    """Perform paired t-test between two sets of scores.
    
    Args:
        scores1: Scores from model 1
        scores2: Scores from model 2
        alternative: Alternative hypothesis ('two-sided', 'greater', 'less')
    
    Returns:
        Dictionary with test results
    """
    t_stat, p_value = stats.ttest_rel(scores1, scores2, alternative=alternative)
    
    return {
        "t_statistic": float(t_stat),
        "p_value": float(p_value),
        "alternative": alternative,
        "mean_diff": float(np.mean(scores1 - scores2)),
        "std_diff": float(np.std(scores1 - scores2, ddof=1)),
    }


def corrected_paired_t_test(
    scores1: np.ndarray,
    scores2: np.ndarray,
    n_folds: int = 4,
    df_scaling: float = 0.45,
    alternative: str = "two-sided",
) -> Dict[str, Any]:
    """Perform corrected paired t-test with degrees of freedom scaling.
    
    The correction accounts for the dependence between cross-validation folds.
    The df_scaling factor should be calibrated by null simulation for the specific design.
    
    Args:
        scores1: Scores from model 1
        scores2: Scores from model 2
        n_folds: Number of cross-validation folds
        df_scaling: Degrees of freedom scaling factor (default 0.45 from paper)
        alternative: Alternative hypothesis
    
    Returns:
        Dictionary with corrected test results
    """
    # Standard paired t-test
    t_stat, p_value = stats.ttest_rel(scores1, scores2, alternative=alternative)
    
    # Apply degrees of freedom correction
    n_samples = len(scores1)
    corrected_df = n_samples * df_scaling
    
    # Calculate corrected p-value using t-distribution with corrected df
    if alternative == "two-sided":
        corrected_p = 2 * (1 - stats.t.cdf(abs(t_stat), df=corrected_df))
    elif alternative == "greater":
        corrected_p = 1 - stats.t.cdf(t_stat, df=corrected_df)
    else:  # less
        corrected_p = stats.t.cdf(t_stat, df=corrected_df)
    
    return {
        "t_statistic": float(t_stat),
        "p_value": float(p_value),
        "corrected_p_value": float(corrected_p),
        "corrected_df": float(corrected_df),
        "df_scaling": df_scaling,
        "n_folds": n_folds,
        "alternative": alternative,
        "mean_diff": float(np.mean(scores1 - scores2)),
        "std_diff": float(np.std(scores1 - scores2, ddof=1)),
    }


def benjamini_hochberg_fdr(
    p_values: List[float],
    alpha: float = 0.05,
) -> Dict[str, Any]:
    """Apply Benjamini-Hochberg false discovery rate correction.
    
    Args:
        p_values: List of p-values
        alpha: Significance level
    
    Returns:
        Dictionary with FDR correction results
    """
    p_array = np.array(p_values)
    
    # Apply FDR correction
    reject, p_corrected, _, _ = multipletests(
        p_array,
        alpha=alpha,
        method="fdr_bh",
    )
    
    return {
        "original_p_values": p_values,
        "corrected_p_values": p_corrected.tolist(),
        "rejected": reject.tolist(),
        "alpha": alpha,
        "n_tests": len(p_values),
        "n_rejected": int(np.sum(reject)),
    }


def wilcoxon_signed_rank_test(
    scores1: np.ndarray,
    scores2: np.ndarray,
    alternative: str = "two-sided",
) -> Dict[str, Any]:
    """Perform Wilcoxon signed-rank test (non-parametric alternative to paired t-test).
    
    Args:
        scores1: Scores from model 1
        scores2: Scores from model 2
        alternative: Alternative hypothesis
    
    Returns:
        Dictionary with test results
    """
    stat, p_value = stats.wilcoxon(scores1, scores2, alternative=alternative)
    
    return {
        "statistic": float(stat),
        "p_value": float(p_value),
        "alternative": alternative,
        "mean_diff": float(np.mean(scores1 - scores2)),
    }


def bootstrap_ci(
    scores: np.ndarray,
    n_bootstrap: int = 10000,
    confidence: float = 0.95,
    seed: int = 42,
) -> Dict[str, Any]:
    """Calculate bootstrap confidence interval for scores.
    
    Args:
        scores: Scores to bootstrap
        n_bootstrap: Number of bootstrap samples
        confidence: Confidence level
        seed: Random seed
    
    Returns:
        Dictionary with bootstrap results
    """
    np.random.seed(seed)
    
    bootstrap_means = []
    for _ in range(n_bootstrap):
        bootstrap_sample = np.random.choice(scores, size=len(scores), replace=True)
        bootstrap_means.append(np.mean(bootstrap_sample))
    
    bootstrap_means = np.array(bootstrap_means)
    
    alpha = 1 - confidence
    lower = np.percentile(bootstrap_means, 100 * alpha / 2)
    upper = np.percentile(bootstrap_means, 100 * (1 - alpha / 2))
    
    return {
        "mean": float(np.mean(scores)),
        "ci_lower": float(lower),
        "ci_upper": float(upper),
        "confidence": confidence,
        "n_bootstrap": n_bootstrap,
    }


def compare_models(
    model_scores: Dict[str, np.ndarray],
    n_folds: int = 4,
    df_scaling: float = 0.45,
    alpha: float = 0.05,
) -> Dict[str, Any]:
    """Compare multiple models using corrected t-tests and FDR.
    
    Args:
        model_scores: Dictionary mapping model names to score arrays
        n_folds: Number of CV folds
        df_scaling: Degrees of freedom scaling factor
        alpha: Significance level
    
    Returns:
        Dictionary with comparison results
    """
    model_names = list(model_scores.keys())
    comparisons = []
    p_values = []
    
    # Perform pairwise comparisons
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
    
    # Apply FDR correction
    fdr_result = benjamini_hochberg_fdr(p_values, alpha=alpha)
    
    # Add corrected p-values to comparisons
    for i, comparison in enumerate(comparisons):
        comparison["fdr_corrected_p"] = fdr_result["corrected_p_values"][i]
        comparison["fdr_rejected"] = fdr_result["rejected"][i]
    
    return {
        "comparisons": comparisons,
        "fdr_summary": fdr_result,
        "n_models": len(model_names),
        "n_comparisons": len(comparisons),
    }
