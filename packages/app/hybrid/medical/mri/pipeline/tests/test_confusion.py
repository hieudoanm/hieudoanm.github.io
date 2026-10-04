"""Edge cases for the confusion matrix: single class, balanced classes."""

import numpy as np
import pytest

from pipeline.core.metrics import calculate_confusion_matrix


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
