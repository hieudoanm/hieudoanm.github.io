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
    """Calculate calibration metrics over equal-width probability bins.

    Args:
        y_true: True labels
        y_proba: Predicted probabilities
        n_bins: Number of equal-width bins on [0, 1]

    Returns:
        Brier score, expected calibration error and the per-bin reliability data
    """
    true = np.asarray(y_true, dtype=float)
    proba = np.asarray(y_proba, dtype=float)

    metrics = {
        "brier_score": float(brier_score_loss(true, proba)),
    }

    # Expected calibration error (Guo et al., 2017), computed per equal-width
    # bin from the raw samples. `sklearn.calibration_curve` returns only
    # non-empty bins, so its k-th entry does not correspond to the k-th bin of
    # an equal-width grid; the two must not be zipped together.
    edges = np.linspace(0.0, 1.0, n_bins + 1)
    # `searchsorted(side="right") - 1` puts p=0 in bin 0 and p=1 in the last bin.
    assignment = np.clip(np.searchsorted(edges, proba, side="right") - 1, 0, n_bins - 1)

    ece = 0.0
    counts: list[int] = []
    accuracies: list[float] = []
    confidences: list[float] = []
    for index in range(n_bins):
        mask = assignment == index
        count = int(mask.sum())
        counts.append(count)
        if count == 0:
            accuracies.append(float("nan"))
            confidences.append(float("nan"))
            continue
        accuracy = float(true[mask].mean())
        confidence = float(proba[mask].mean())
        accuracies.append(accuracy)
        confidences.append(confidence)
        ece += (count / len(true)) * abs(accuracy - confidence)

    metrics["ece"] = float(ece)
    metrics["n_bins"] = n_bins
    metrics["bin_edges"] = edges.tolist()
    metrics["bin_counts"] = counts
    metrics["calibration_curve"] = {
        # Empty bins stay NaN so a gap in the reliability diagram is visible
        # instead of being silently shifted onto the wrong bin.
        "accuracy": accuracies,
        "confidence": confidences,
        "count": counts,
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
    true = np.asarray(y_true)
    pred = np.asarray(y_pred)
    # `labels=[0, 1]` keeps a 2x2 matrix even when only one class is present,
    # so the cell names never have to be guessed from the matrix shape.
    cm = confusion_matrix(true, pred, labels=[0, 1])
    tn, fp, fn, tp = (int(cell) for cell in cm.ravel())

    return {
        "confusion_matrix": cm.tolist(),
        "true_negatives": tn,
        "false_positives": fp,
        "false_negatives": fn,
        "true_positives": tp,
        "sensitivity": tp / (tp + fn) if (tp + fn) > 0 else 0.0,
        "specificity": tn / (tn + fp) if (tn + fp) > 0 else 0.0,
    }
