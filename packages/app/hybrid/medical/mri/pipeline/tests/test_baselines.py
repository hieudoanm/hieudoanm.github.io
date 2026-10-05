"""Tests for the baseline models and their evaluation.

The baselines exist to give the deep models an honest reference point, so the
tests check that the harness is reproducible and that evaluation reports
calibration rather than a bare accuracy.
"""

import numpy as np
import pytest

from pipeline.core.baselines import (
    GradientBoostingBaseline,
    LogisticRegressionBaseline,
    cross_validate_baseline,
    evaluate_baseline,
    train_baseline,
)
from pipeline.core.metrics import calculate_metrics_with_ci


@pytest.fixture
def separable_data():
    """A small linearly separable problem with a known direction."""
    rng = np.random.default_rng(0)
    features = rng.normal(size=(60, 3))
    labels = (features[:, 0] + 0.5 * features[:, 1] > 0).astype(int)
    return features, labels


def test_logistic_regression_learns_a_separable_problem(separable_data):
    features, labels = separable_data

    model = LogisticRegressionBaseline().fit(features, labels)
    scores = evaluate_baseline(model, features, labels)

    assert scores["accuracy"]["value"] > 0.9
    assert scores["auc"]["value"] > 0.9
    assert "brier_score" in scores["calibration"]
    assert 0 <= scores["accuracy"]["ci_lower"] <= scores["accuracy"]["ci_upper"]


def test_predictions_are_reproducible_for_a_fixed_seed(separable_data):
    features, labels = separable_data

    first = LogisticRegressionBaseline(random_state=7).fit(features, labels)
    second = LogisticRegressionBaseline(random_state=7).fit(features, labels)

    assert np.array_equal(first.predict(features), second.predict(features))
    assert np.allclose(first.predict_proba(features), second.predict_proba(features))


def test_predicting_before_fitting_is_refused(separable_data):
    features, _ = separable_data
    model = LogisticRegressionBaseline()

    with pytest.raises(ValueError, match="must be fitted"):
        model.predict(features)
    with pytest.raises(ValueError, match="must be fitted"):
        model.predict_proba(features)


def test_gradient_boosting_is_reproducible(separable_data):
    features, labels = separable_data

    first = GradientBoostingBaseline(random_state=7).fit(features, labels)
    second = GradientBoostingBaseline(random_state=7).fit(features, labels)

    assert np.array_equal(first.predict(features), second.predict(features))


def test_train_baseline_dispatches_and_rejects_unknown_types(separable_data):
    features, labels = separable_data

    logistic = train_baseline("logistic_regression", features, labels)
    boosted = train_baseline("gradient_boosting", features, labels)

    assert isinstance(logistic, LogisticRegressionBaseline)
    assert isinstance(boosted, GradientBoostingBaseline)

    with pytest.raises(ValueError, match="Unknown model type"):
        train_baseline("transformer", features, labels)


def test_baseline_survives_a_save_load_round_trip(separable_data, tmp_path):
    features, labels = separable_data
    model = LogisticRegressionBaseline().fit(features, labels)
    path = tmp_path / "model.joblib"

    model.save(str(path))
    restored = LogisticRegressionBaseline().load(str(path))

    assert np.allclose(restored.predict_proba(features), model.predict_proba(features))


def test_cross_validation_reports_one_score_per_fold(separable_data):
    features, labels = separable_data
    model = LogisticRegressionBaseline().fit(features, labels)

    result = cross_validate_baseline(model, features, labels, cv=3)

    assert len(result["cv_scores"]) == 3
    assert result["mean_score"] == pytest.approx(float(np.mean(result["cv_scores"])))
    assert 0.0 <= result["mean_score"] <= 1.0


def test_evaluation_intervals_match_the_shared_metric_helper(separable_data):
    features, labels = separable_data
    model = LogisticRegressionBaseline().fit(features, labels)

    scored = evaluate_baseline(model, features, labels)
    expected = calculate_metrics_with_ci(
        labels, model.predict(features), model.predict_proba(features)[:, 1]
    )

    assert scored["accuracy"]["value"] == pytest.approx(expected["accuracy"]["value"])
    assert scored["accuracy"]["ci_upper"] == pytest.approx(expected["accuracy"]["ci_upper"])
