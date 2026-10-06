"""Confidence intervals around the point metrics.

Split out of `metrics.py`: that module computes the point estimate, this one
puts a Wilson interval on it and re-assembles the metric dictionaries a run
folder stores.
"""

from typing import Any

import numpy as np

from pipeline.core.metrics import (
    calculate_calibration_metrics,
    calculate_metrics,
)


def calculate_confidence_interval(
    metric: float,
    n_samples: int,
    confidence: float = 0.95,
) -> tuple[float, float]:
    """Calculate confidence interval for a metric using Wilson score interval.
    
    Args:
        metric: Metric value (e.g., accuracy)
        n_samples: Number of samples
        confidence: Confidence level (default 0.95)
    
    Returns:
        Tuple of (lower_bound, upper_bound)
    """
    from scipy import stats

    # scipy is untyped at its boundary, so the quantile is cast to float here:
    # everything downstream, including the return type, is arithmetic on a
    # Python float rather than on an untyped value.
    z = float(stats.norm.ppf((1 + confidence) / 2))

    # Wilson score interval
    denominator = 1 + z**2 / n_samples
    center = (metric + z**2 / (2 * n_samples)) / denominator
    margin = z * np.sqrt((metric * (1 - metric) + z**2 / (4 * n_samples)) / n_samples) / denominator

    lower = max(0, center - margin)
    upper = min(1, center + margin)

    return lower, upper


def calculate_metrics_with_ci(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_proba: np.ndarray | None = None,
    confidence: float = 0.95,
) -> dict[str, Any]:
    """Calculate metrics with confidence intervals.
    
    Args:
        y_true: True labels
        y_pred: Predicted labels
        y_proba: Predicted probabilities (optional)
        confidence: Confidence level for intervals
    
    Returns:
        Dictionary of metrics with confidence intervals
    """
    n_samples = len(y_true)

    # Calculate base metrics
    metrics = calculate_metrics(y_true, y_pred, y_proba)

    # Add confidence intervals
    metrics_with_ci: dict[str, Any] = {}
    for name, value in metrics.items():
        if isinstance(value, float) and not np.isnan(value):
            lower, upper = calculate_confidence_interval(value, n_samples, confidence)
            metrics_with_ci[name] = {
                "value": value,
                "ci_lower": lower,
                "ci_upper": upper,
                "ci_level": confidence,
            }
        else:
            metrics_with_ci[name] = {"value": value}

    # Add calibration metrics if probabilities are provided
    if y_proba is not None:
        cal_metrics = calculate_calibration_metrics(y_true, y_proba)
        metrics_with_ci["calibration"] = cal_metrics

    return metrics_with_ci
