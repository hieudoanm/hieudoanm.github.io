"""Tests for evaluation metrics."""

import pytest
import numpy as np
from pipeline.core.metrics import (
    calculate_metrics,
    calculate_metrics_with_ci,
    calculate_calibration_metrics,
    calculate_confidence_interval,
    calculate_confusion_matrix,
)


@pytest.fixture
def sample_predictions():
    """Create sample predictions for testing."""
    np.random.seed(42)
    y_true = np.random.randint(0, 2, 100)
    y_pred = np.random.randint(0, 2, 100)
    y_proba = np.random.rand(100)
    return y_true, y_pred, y_proba


def test_calculate_metrics(sample_predictions):
    """Test basic metrics calculation."""
    y_true, y_pred, y_proba = sample_predictions
    
    metrics = calculate_metrics(y_true, y_pred, y_proba)
    
    assert "accuracy" in metrics
    assert "balanced_accuracy" in metrics
    assert "f1" in metrics
    assert "precision" in metrics
    assert "recall" in metrics
    assert "auc" in metrics
    
    # Check that metrics are in valid ranges
    assert 0 <= metrics["accuracy"] <= 1
    assert 0 <= metrics["balanced_accuracy"] <= 1
    assert 0 <= metrics["f1"] <= 1


def test_calculate_metrics_without_proba(sample_predictions):
    """Test metrics calculation without probabilities."""
    y_true, y_pred, _ = sample_predictions
    
    metrics = calculate_metrics(y_true, y_pred)
    
    assert "accuracy" in metrics
    assert "auc" not in metrics  # Should not have AUC without probabilities


def test_calculate_metrics_with_ci(sample_predictions):
    """Test metrics with confidence intervals."""
    y_true, y_pred, y_proba = sample_predictions
    
    metrics = calculate_metrics_with_ci(y_true, y_pred, y_proba)
    
    # Check that metrics have CI structure
    assert "accuracy" in metrics
    assert "value" in metrics["accuracy"]
    assert "ci_lower" in metrics["accuracy"]
    assert "ci_upper" in metrics["accuracy"]
    
    # Check CI bounds
    assert metrics["accuracy"]["ci_lower"] <= metrics["accuracy"]["value"]
    assert metrics["accuracy"]["ci_upper"] >= metrics["accuracy"]["value"]


def test_calculate_calibration_metrics(sample_predictions):
    """Test calibration metrics calculation."""
    y_true, _, y_proba = sample_predictions
    
    cal_metrics = calculate_calibration_metrics(y_true, y_proba)
    
    assert "brier_score" in cal_metrics
    assert "ece" in cal_metrics
    assert "calibration_curve" in cal_metrics
    
    # Check that Brier score is in valid range
    assert 0 <= cal_metrics["brier_score"] <= 1
    
    # Check that ECE is in valid range
    assert 0 <= cal_metrics["ece"] <= 1


def test_calculate_confidence_interval():
    """Test confidence interval calculation."""
    metric = 0.8
    n_samples = 100
    
    lower, upper = calculate_confidence_interval(metric, n_samples)
    
    assert 0 <= lower <= metric
    assert metric <= upper <= 1
    assert lower < upper


def test_calculate_confusion_matrix(sample_predictions):
    """Test confusion matrix calculation."""
    y_true, y_pred, _ = sample_predictions
    
    cm_result = calculate_confusion_matrix(y_true, y_pred)
    
    assert "confusion_matrix" in cm_result
    assert "true_negatives" in cm_result
    assert "false_positives" in cm_result
    assert "false_negatives" in cm_result
    assert "true_positives" in cm_result
    assert "sensitivity" in cm_result
    assert "specificity" in cm_result
    
    # Check that components sum to total
    total = (cm_result["true_negatives"] + cm_result["false_positives"] +
             cm_result["false_negatives"] + cm_result["true_positives"])
    assert total == len(y_true)
