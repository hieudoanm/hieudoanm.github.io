"""Turning per-fold results into the numbers a run folder reports.

Split out of `experiment.py`, which fits and scores the models. Everything here
is pure: fold metrics in, the rows and curves that land in `metrics.json` out.
"""

from collections.abc import Callable
from typing import Any

import numpy as np


def aggregate_folds(folds: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Mean metric across folds, with the spread across folds as the uncertainty."""
    names = [row["name"] for row in folds[0]["metrics"]]
    aggregated = []
    for name in names:
        values = fold_values(folds, name)
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


def fold_values(folds: list[dict[str, Any]], name: str) -> np.ndarray:
    collected = [
        row["value"]
        for fold in folds
        for row in fold["metrics"]
        if row["name"] == name and isinstance(row.get("value"), (int, float))
    ]
    values = np.array(collected, dtype=float)
    return values[~np.isnan(values)]


def emit_metrics(
    metrics: dict[str, Any],
    fold: int,
    on_metric: Callable[[str, float, int], None],
) -> None:
    for row in metrics["metrics"]:
        value = row.get("value")
        if isinstance(value, (int, float)):
            on_metric(row["name"], float(value), fold)


def rows(scored: dict[str, Any]) -> list[dict[str, Any]]:
    """Flatten the metric-with-interval dictionary into run-folder rows."""
    flattened = []
    for name, value in scored.items():
        if isinstance(value, dict) and "value" in value:
            flattened.append({"name": name, **value})
    return flattened


def calibration_payload(calibration: dict[str, Any]) -> dict[str, Any]:
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
