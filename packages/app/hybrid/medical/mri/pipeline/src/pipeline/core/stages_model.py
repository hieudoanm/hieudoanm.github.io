"""The baseline, evaluate and report stages: development folds to run folder.

The evaluate stage is the only place that touches the lock-box, so it is also
the only place that writes to the access log.
"""

import json
from pathlib import Path
from typing import Any

import pandas as pd

from pipeline.core.events import EventWriter
from pipeline.core.experiment import (
    CrossValidationResult,
    fit_and_score_lock_box,
    run_cross_validation,
)
from pipeline.core.lockbox import LockBoxLogger
from pipeline.core.reports import generate_all_reports
from pipeline.core.split import Splitter
from pipeline.core.summary import aggregate_folds


def stage_baseline(
    model_type: str,
    development: pd.DataFrame,
    features: pd.DataFrame,
    splitter: Splitter,
    events: EventWriter,
    summary: dict[str, Any],
) -> CrossValidationResult:
    """Train and score the baseline over the development folds."""
    events.write_stage_start("baseline", model_type)
    folds = splitter.create_cv_splits(development)

    result = run_cross_validation(
        development,
        features,
        model_type,
        folds,
        on_fold_start=lambda fold, n_train, n_valid: events.write_progress(
            "baseline", fold=fold, seed=splitter.seed, n_train=n_train, n_valid=n_valid
        ),
        on_metric=lambda name, value, fold: events.write_metric(
            "baseline", name, value, fold=fold
        ),
    )
    summary["stages"].append({"stage": "baseline", "status": "ok"})
    events.write_stage_end("baseline", "ok")
    return result


def stage_evaluate(
    model_type: str,
    development: pd.DataFrame,
    lock_box: pd.DataFrame,
    features: pd.DataFrame,
    splitter: Splitter,
    run_path: Path,
    events: EventWriter,
    summary: dict[str, Any],
) -> dict[str, Any]:
    """Score the held-out participants once, with the access written to the log."""
    events.write_stage_start("evaluate", "lock_box")
    metrics, table = fit_and_score_lock_box(
        development, lock_box, features, model_type, splitter.seed
    )

    access_count = LockBoxLogger(str(run_path / "lockbox_access.json")).log_access(
        run_id=run_path.name,
        purpose="single evaluation of the configured run",
        model_name=model_type,
        n_participants=int(len(lock_box)),
    )

    artifacts_dir = artefacts(run_path)
    table.to_csv(artifacts_dir / "lockbox_predictions.csv", index=False)
    (run_path / "lockbox_metrics.json").write_text(json.dumps(metrics, indent=2))
    for row in metrics["metrics"]:
        events.write_metric("evaluate", row["name"], row["value"])

    summary["stages"].append({"stage": "evaluate", "status": "ok"})
    summary["lock_box"] = {
        "metrics": metrics["metrics"],
        "access_count": access_count,
        "n_participants": int(len(lock_box)),
    }
    events.write_stage_end("evaluate", "ok")
    return metrics


def stage_report(
    model_type: str,
    result: dict[str, Any],
    cohort: pd.DataFrame,
    run_path: Path,
    events: EventWriter,
    summary: dict[str, Any],
) -> None:
    """Write metrics.json, the report tables and the per-participant predictions."""
    events.write_stage_start("report", "metrics")
    aggregated = aggregate_folds(result["folds"])
    folds = result["folds"]
    (run_path / "metrics.json").write_text(json.dumps({
        "metrics": aggregated,
        "calibration": folds[0]["calibration"],
        "confusion": folds[0]["confusion"],
        "folds": folds,
        "model_type": model_type,
    }, indent=2))

    predictions = cohort.assign(
        probability=cohort["participant_id"].astype(str).map(result["predictions"])
    )
    predictions.to_csv(artefacts(run_path) / "predictions.csv", index=False)

    results = {model_type: {row["name"]: row for row in aggregated}}
    generate_all_reports(results, [], str(artefacts(run_path) / "reports"))

    summary["metrics"] = aggregated
    summary["stages"].append({"stage": "report", "status": "ok"})
    for row in aggregated:
        events.write_metric("report", row["name"], row["value"])
    events.write_stage_end("report", "ok")


def artefacts(run_path: Path) -> Path:
    artefacts = run_path / "artifacts"
    artefacts.mkdir(exist_ok=True)
    return artefacts
