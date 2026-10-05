"""Tests for evaluation metrics."""

import numpy as np
import pytest

from pipeline.core.metrics import (
    calculate_calibration_metrics,
    calculate_confidence_interval,
    calculate_confusion_matrix,
    calculate_metrics,
    calculate_metrics_with_ci,
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


def test_ece_is_zero_for_a_perfectly_calibrated_single_bin():
    # Every prediction sits in one bin, and its confidence equals its accuracy.
    y_true = np.array([1] * 10 + [0] * 10)
    y_proba = np.full(20, 0.5)

    result = calculate_calibration_metrics(y_true, y_proba, n_bins=10)

    assert result["ece"] == pytest.approx(0.0, abs=1e-12)
    assert result["brier_score"] == pytest.approx(0.25)
    assert result["calibration_curve"]["accuracy"][5] == pytest.approx(0.5)


def test_ece_matches_the_hand_computed_weighted_gap():
    # Bin 0.9-1.0: one positive and one negative -> accuracy 0.5, confidence 0.99.
    # Bin 0.0-0.1: one positive and one negative -> accuracy 0.5, confidence 0.01.
    # Each bin holds half the sample, so ECE = 0.5*0.49 + 0.5*0.49.
    y_true = np.array([1, 0, 1, 0])
    y_proba = np.array([0.99, 0.99, 0.01, 0.01])

    result = calculate_calibration_metrics(y_true, y_proba, n_bins=10)

    assert result["ece"] == pytest.approx(0.49)
    assert result["bin_counts"][0] == 2
    assert result["bin_counts"][9] == 2


def test_ece_keeps_bins_aligned_instead_of_skipping_empty_ones():
    # Empty bins must not shift the non-empty ones: bin 0 has two samples with
    # accuracy 1.0 and confidence 0.05, so the gap is 0.95 and ECE is 0.95.
    y_true = np.array([1, 1])
    y_proba = np.array([0.05, 0.05])

    result = calculate_calibration_metrics(y_true, y_proba, n_bins=10)

    assert result["ece"] == pytest.approx(0.95)
    assert result["bin_counts"][0] == 2
    assert result["bin_counts"][5:] == [0] * 5
    assert np.isnan(result["calibration_curve"]["accuracy"][1])


def test_ece_puts_probability_one_in_the_last_bin_and_zero_in_the_first():
    # Correct predictions at the extremes are perfectly calibrated, so ECE is 0
    # even though the probabilities are extreme.
    result = calculate_calibration_metrics(np.array([1, 0]), np.array([1.0, 0.0]), n_bins=10)

    assert result["bin_counts"][9] == 1
    assert result["bin_counts"][0] == 1
    assert result["ece"] == pytest.approx(0.0, abs=1e-12)


def test_ece_penalises_a_confident_wrong_prediction():
    # A single sample that says 1.0 but is actually 0: accuracy 0, confidence 1.
    result = calculate_calibration_metrics(np.array([0]), np.array([1.0]), n_bins=10)

    assert result["ece"] == pytest.approx(1.0)
    assert result["brier_score"] == pytest.approx(1.0)


def test_confusion_matrix_stays_two_by_two_for_a_single_class():
    result = calculate_confusion_matrix(np.zeros(4, dtype=int), np.zeros(4, dtype=int))

    assert result["confusion_matrix"] == [[4, 0], [0, 0]]
    assert result["true_negatives"] == 4
    assert result["sensitivity"] == 0.0
    assert result["specificity"] == 1.0


def test_confusion_matrix_reports_sensitivity_and_specificity():
    y_true = np.array([0, 0, 1, 1])
    y_pred = np.array([0, 1, 0, 1])

    result = calculate_confusion_matrix(y_true, y_pred)

    assert result["true_negatives"] == 1
    assert result["false_positives"] == 1
    assert result["false_negatives"] == 1
    assert result["true_positives"] == 1
    assert result["sensitivity"] == pytest.approx(0.5)
    assert result["specificity"] == pytest.approx(0.5)
