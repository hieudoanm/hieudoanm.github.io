"""Evaluation metrics with calibration."""

import numpy as np
from typing import Dict, Any, Optional, Tuple
from sklearn.metrics import (
    accuracy_score,
    balanced_accuracy_score,
    roc_auc_score,
    f1_score,
    precision_score,
    recall_score,
    confusion_matrix,
)
from sklearn.calibration import calibration_curve
from sklearn.metrics import brier_score_loss


def calculate_metrics(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_proba: Optional[np.ndarray] = None,
) -> Dict[str, float]:
    """Calculate classification metrics.
    
    Args:
        y_true: True labels
        y_pred: Predicted labels
        y_proba: Predicted probabilities (optional, for AUC and calibration)
    
    Returns:
        Dictionary of metrics
    """
    metrics = {
        "accuracy": accuracy_score(y_true, y_pred),
        "balanced_accuracy": balanced_accuracy_score(y_true, y_pred),
        "f1": f1_score(y_true, y_pred, average="binary"),
        "precision": precision_score(y_true, y_pred, average="binary", zero_division=0),
        "recall": recall_score(y_true, y_pred, average="binary", zero_division=0),
    }
    
    # Add AUC if probabilities are provided
    if y_proba is not None:
        try:
            metrics["auc"] = roc_auc_score(y_true, y_proba)
        except ValueError:
            # Handle case where only one class is present
            metrics["auc"] = np.nan
    
    return metrics


def calculate_calibration_metrics(
    y_true: np.ndarray,
    y_proba: np.ndarray,
    n_bins: int = 10,
) -> Dict[str, Any]:
    """Calculate calibration metrics.
    
    Args:
        y_true: True labels
        y_proba: Predicted probabilities
        n_bins: Number of bins for calibration curve
    
    Returns:
        Dictionary of calibration metrics
    """
    metrics = {
        "brier_score": brier_score_loss(y_true, y_proba),
    }
    
    # Calculate Expected Calibration Error (ECE)
    prob_true, prob_pred = calibration_curve(y_true, y_proba, n_bins=n_bins)
    
    # Calculate ECE
    bin_boundaries = np.linspace(0, 1, n_bins + 1)
    bin_centers = (bin_boundaries[:-1] + bin_boundaries[1:]) / 2
    
    # Calculate number of samples in each bin
    bin_counts = np.histogram(y_proba, bins=bin_boundaries)[0]
    
    # Calculate ECE
    ece = 0.0
    for i in range(n_bins):
        if bin_counts[i] > 0:
            ece += bin_counts[i] * np.abs(prob_true[i] - prob_pred[i])
    
    ece = ece / len(y_true)
    metrics["ece"] = ece
    
    # Store calibration curve data
    metrics["calibration_curve"] = {
        "prob_true": prob_true.tolist(),
        "prob_pred": prob_pred.tolist(),
        "bin_centers": bin_centers.tolist(),
    }
    
    return metrics


def calculate_confidence_interval(
    metric: float,
    n_samples: int,
    confidence: float = 0.95,
) -> Tuple[float, float]:
    """Calculate confidence interval for a metric using Wilson score interval.
    
    Args:
        metric: Metric value (e.g., accuracy)
        n_samples: Number of samples
        confidence: Confidence level (default 0.95)
    
    Returns:
        Tuple of (lower_bound, upper_bound)
    """
    from scipy import stats
    
    z = stats.norm.ppf((1 + confidence) / 2)
    
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
    y_proba: Optional[np.ndarray] = None,
    confidence: float = 0.95,
) -> Dict[str, Any]:
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
    metrics_with_ci = {}
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


def calculate_confusion_matrix(
    y_true: np.ndarray,
    y_pred: np.ndarray,
) -> Dict[str, Any]:
    """Calculate confusion matrix.
    
    Args:
        y_true: True labels
        y_pred: Predicted labels
    
    Returns:
        Dictionary with confusion matrix and derived metrics
    """
    cm = confusion_matrix(y_true, y_pred)
    
    tn, fp, fn, tp = cm.ravel() if cm.size == 4 else (0, 0, 0, 0)
    
    return {
        "confusion_matrix": cm.tolist(),
        "true_negatives": int(tn),
        "false_positives": int(fp),
        "false_negatives": int(fn),
        "true_positives": int(tp),
        "sensitivity": tp / (tp + fn) if (tp + fn) > 0 else 0,
        "specificity": tn / (tn + fp) if (tn + fp) > 0 else 0,
    }
