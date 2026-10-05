"""Cross-validated baseline experiments.

Each fold trains on one group of participants and scores another, so the
per-fold scores are the unit of any later corrected paired test. The lock-box is
never part of a training set here: it is scored once, by a model fitted on the
development participants alone.
"""

from typing import Any, Callable, Dict, List, Optional, Tuple

import numpy as np
import pandas as pd

from pipeline.core.baselines import train_baseline
from pipeline.core.metrics import (
    calculate_calibration_metrics,
    calculate_confusion_matrix,
    calculate_metrics_with_ci,
)

METRICS_TABLE = ("logistic_regression", "gradient_boosting")


class CrossValidationResult(Dict[str, Any]):
    """Per-fold metrics, per-participant probabilities and who was validated."""


def run_cross_validation(
    frame: pd.DataFrame,
    features: pd.DataFrame,
    model_type: str,
    folds: List[Tuple[np.ndarray, np.ndarray]],
    on_fold_start: Optional[Callable[[int, int, int], None]] = None,
    on_metric: Optional[Callable[[str, float, int], None]] = None,
) -> CrossValidationResult:
    """Train and score a baseline on every validation fold of the development set.

    Args:
        frame: Development participants, one row each, with `outcome`
        features: Encoded features aligned to `frame.index`
        model_type: Key accepted by `train_baseline`
        folds: Positional `(train, valid)` indices into `frame`
        on_fold_start: Optional callback `(fold, n_train, n_valid)`
        on_metric: Optional callback `(name, value, fold)`

    Returns:
        Fold metrics, probabilities per participant and the validated participants

    Raises:
        ValueError: If no fold yields both outcome classes, which would otherwise
            be reported as a perfect score
    """
    _require_known_model(model_type)
    labels = frame["outcome"].to_numpy(dtype=int)
    participants = frame["participant_id"].to_numpy()

    results: List[Dict[str, Any]] = []
    predictions: Dict[str, float] = {}
    validated: List[str] = []

    for index, (train_index, valid_index) in enumerate(folds, start=1):
        if on_fold_start is not None:
            on_fold_start(index, len(train_index), len(valid_index))
        outcome = _fold_metrics(
            labels, features, train_index, valid_index, model_type, index
        )
        if outcome is None:
            continue
        metrics, probabilities = outcome
        results.append({"fold": index, "n_valid": int(len(valid_index)), **metrics})
        for participant, probability in zip(participants[valid_index], probabilities):
            predictions[str(participant)] = float(probability)
        validated.extend(str(participant) for participant in participants[valid_index])
        if on_metric is not None:
            _emit(metrics, index, on_metric)

    if not results:
        raise ValueError(
            "no fold contained both outcome classes; adjust the cohort, the feature "
            "list or the fold count"
        )
    return {"folds": results, "predictions": predictions, "validated": validated}


def _require_known_model(model_type: str) -> None:
    if model_type not in METRICS_TABLE:
        raise ValueError(
            f"model_type '{model_type}' has no tabular baseline in this build; "
            f"available: {list(METRICS_TABLE)}"
        )


def _fold_metrics(
    labels: np.ndarray,
    features: pd.DataFrame,
    train_index: np.ndarray,
    valid_index: np.ndarray,
    model_type: str,
    fold: int,
) -> Optional[Tuple[Dict[str, Any], np.ndarray]]:
    """Metrics for one fold, or None when the split cannot train or be scored."""
    train_labels = labels[train_index]
    valid_labels = labels[valid_index]
    if len(np.unique(train_labels)) < 2 or len(np.unique(valid_labels)) < 2:
        return None

    model = train_baseline(
        model_type,
        features.iloc[train_index].to_numpy(dtype=float),
        train_labels,
        random_state=fold,
    )
    probabilities = model.predict_proba(features.iloc[valid_index].to_numpy(dtype=float))[:, 1]
    return score_predictions(valid_labels, probabilities), probabilities


def score_predictions(labels: np.ndarray, probabilities: np.ndarray) -> Dict[str, Any]:
    """Metrics, calibration and confusion for one set of predicted probabilities."""
    predicted = (probabilities >= 0.5).astype(int)
    return {
        "metrics": rows(
            calculate_metrics_with_ci(labels, predicted, probabilities)
        ),
        "calibration": calibration_payload(
            calculate_calibration_metrics(labels, probabilities)
        ),
        "confusion": calculate_confusion_matrix(labels, predicted),
    }


def fit_and_score_lock_box(
    development: pd.DataFrame,
    lock_box: pd.DataFrame,
    features: pd.DataFrame,
    model_type: str,
    seed: int,
) -> Tuple[Dict[str, Any], pd.DataFrame]:
    """Fit on the development participants and score the lock-box exactly once.

    Args:
        development: Participants the model is allowed to learn from
        lock_box: Held-out participants; never used for fitting
        features: Encoded features aligned to `development.index` and `lock_box.index`
        model_type: Key accepted by `train_baseline`
        seed: Random seed for the fitted estimator

    Returns:
        The lock-box metrics and one row per held-out participant

    Raises:
        ValueError: If either side is missing or a single class
    """
    _require_known_model(model_type)
    development_labels = development["outcome"].to_numpy(dtype=int)
    lock_box_labels = lock_box["outcome"].to_numpy(dtype=int)
    if len(np.unique(development_labels)) < 2:
        raise ValueError("the development set has a single outcome class")
    if len(np.unique(lock_box_labels)) < 2:
        raise ValueError(
            "the lock-box has a single outcome class; its metrics would be "
            "meaningless, so lower data.lock_box_fraction or add participants"
        )

    model = train_baseline(
        model_type,
        features.loc[development.index].to_numpy(dtype=float),
        development_labels,
        random_state=seed,
    )
    probabilities = model.predict_proba(
        features.loc[lock_box.index].to_numpy(dtype=float)
    )[:, 1]

    table = pd.DataFrame({
        "participant_id": lock_box["participant_id"].to_numpy(),
        "outcome": lock_box_labels,
        "probability": probabilities,
        "predicted": (probabilities >= 0.5).astype(int),
    })
    return score_predictions(lock_box_labels, probabilities), table


def aggregate_folds(folds: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Mean metric across folds, with the spread across folds as the uncertainty."""
    names = [row["name"] for row in folds[0]["metrics"]]
    aggregated = []
    for name in names:
        values = _values(folds, name)
        if values.size == 0:
            continue
        aggregated.append({
            "name": name,
            "value": float(values.mean()),
            "std": float(values.std(ddof=1)) if values.size > 1 else 0.0,
            "ci_lower": float(values.min()),
            "ci_upper": float(values.max()),
            "n_folds": int(values.size),
        })
    return aggregated


def _values(folds: List[Dict[str, Any]], name: str) -> np.ndarray:
    collected = [
        row["value"]
        for fold in folds
        for row in fold["metrics"]
        if row["name"] == name and isinstance(row.get("value"), (int, float))
    ]
    values = np.array(collected, dtype=float)
    return values[~np.isnan(values)]


def _emit(metrics: Dict[str, Any], fold: int, on_metric: Callable[[str, float, int], None]) -> None:
    for row in metrics["metrics"]:
        value = row.get("value")
        if isinstance(value, (int, float)):
            on_metric(row["name"], float(value), fold)


def rows(scored: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Flatten the metric-with-interval dictionary into run-folder rows."""
    flattened = []
    for name, value in scored.items():
        if isinstance(value, dict) and "value" in value:
            flattened.append({"name": name, **value})
    return flattened


def calibration_payload(calibration: Dict[str, Any]) -> Dict[str, Any]:
    """Reliability data under both the current and the workbench's key names.

    `accuracy`/`confidence` are the same two curves the workbench reads as
    `prob_true`/`prob_pred`, so both spellings are written to `metrics.json`.
    """
    curve = calibration["calibration_curve"]
    return {
        "brier_score": calibration["brier_score"],
        "ece": calibration["ece"],
        "accuracy": curve["accuracy"],
        "confidence": curve["confidence"],
        "count": curve["count"],
        "prob_true": curve["accuracy"],
        "prob_pred": curve["confidence"],
    }