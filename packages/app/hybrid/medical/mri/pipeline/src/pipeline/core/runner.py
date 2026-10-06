"""Run orchestration: config in, self-describing run folder out.

A stage that cannot run in this build writes an `error` event and stops the run,
rather than reporting success it did not achieve. Everything the workbench reads
- manifest, config, events, metrics, artefacts - is written here, so a run folder
is always complete enough to audit.
"""

import json
from pathlib import Path
from typing import Any

import pandas as pd

from pipeline.core.dataset import (
    CohortError,
    binarise_outcome,
    encode_features,
    load_cohort,
    select_features,
    summarise_classes,
)
from pipeline.core.events import EventWriter
from pipeline.core.experiment import (
    CrossValidationResult,
    aggregate_folds,
    fit_and_score_lock_box,
    run_cross_validation,
)
from pipeline.core.lockbox import LockBoxLogger
from pipeline.core.reports import generate_all_reports
from pipeline.core.runs import (
    compute_config_hash,
    compute_file_hash,
    create_manifest,
    create_run_folder,
    generate_run_id,
    save_config,
    update_manifest_end_time,
)
from pipeline.core.split import Splitter

BASELINE_STAGES = ("data", "split", "baseline", "evaluate", "report")


def run_experiment(
    config: dict[str, Any],
    output_dir: str,
    run_id: str | None = None,
) -> dict[str, Any]:
    """Execute the configured stages and write one run folder.

    Args:
        config: Validated configuration dictionary
        output_dir: Parent directory for run folders
        run_id: Explicit run id, otherwise generated

    Returns:
        The run summary: id, path, stage outcomes and the aggregated metrics

    Raises:
        CohortError: If the cohort cannot be used as configured
        ValueError: If the configured model has no implementation in this build
    """
    run_id = run_id or generate_run_id()
    run_path = create_run_folder(output_dir, run_id, config)
    save_config(run_path, config)
    manifest = create_manifest(run_path, config, str(config.get("schema_version", "0.1.0")))
    events = EventWriter(run_path)
    events.write_stage_start("run", run_id)

    summary: dict[str, Any] = {
        "run_id": run_id,
        "path": str(run_path),
        "stages": [],
        "metrics": None,
        "data_hash": None,
    }
    try:
        _stages(config, run_path, events, summary)
    except Exception as error:
        events.write_error("run", str(error))
        _finish(run_path, manifest, events, "failed", summary["data_hash"])
        raise
    _finish(run_path, manifest, events, "completed", summary["data_hash"])
    return summary


def _finish(
    run_path: Path,
    manifest: dict[str, Any],
    events: EventWriter,
    status: str,
    data_hash: str | None = None,
) -> None:
    events.write_stage_end("run", "ok" if status == "completed" else "error")
    _write_manifest(run_path, {
        **manifest,
        "status": status,
        "data_hash": data_hash,
    })
    # Last, because it reads the manifest back from disk to stamp the end time.
    update_manifest_end_time(run_path)


def _write_manifest(run_path: Path, manifest: dict[str, Any]) -> None:
    (run_path / "manifest.json").write_text(json.dumps(manifest, indent=2))


def _stages(
    config: dict[str, Any],
    run_path: Path,
    events: EventWriter,
    summary: dict[str, Any],
) -> None:
    """Run every stage in order, recording each outcome in the summary."""
    model_type = _model_type(config)
    cohort, features = _stage_data(config, events, summary)
    splitter, lock_box = _stage_split(config, cohort, run_path, events, summary)

    development = cohort.drop(index=lock_box.index)
    result = _stage_baseline(
        model_type, development, features, splitter, events, summary
    )
    _stage_evaluate(
        model_type, development, lock_box, features, splitter, run_path, events, summary
    )
    _stage_report(model_type, result, cohort, run_path, events, summary)


def _model_type(config: dict[str, Any]) -> str:
    model_type = str(config.get("model", {}).get("model_type", "logistic_regression"))
    return model_type


def _stage_data(
    config: dict[str, Any],
    events: EventWriter,
    summary: dict[str, Any],
) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Load the cohort, bin the outcome, encode features and record the hash."""
    data_config = config.get("data", {})
    participants_tsv = data_config.get("participants_tsv")
    if not participants_tsv:
        raise CohortError(
            "data.participants_tsv is not set; the baseline stages need a "
            "participants table"
        )
    path = Path(participants_tsv)

    events.write_stage_start("data", str(path))
    outcome_column = str(data_config.get("outcome_column", "wab_aq"))
    frame = load_cohort(str(path))
    frame = binarise_outcome(
        frame, outcome_column, float(data_config.get("outcome_threshold", 50.0))
    )
    feature_columns = list(data_config.get("features") or [])
    if not feature_columns:
        raise CohortError("data.features is empty; a baseline needs at least one column")
    frame = select_features(frame, feature_columns, outcome_column)
    features = encode_features(frame, feature_columns)

    balance = summarise_classes(frame["outcome"].to_numpy(dtype=int))
    summary["cohort"] = balance
    events.write_metric("data", "n_participants", balance["n"])
    events.write_metric("data", "positive_rate", balance["positive_rate"])
    events.write_stage_end("data", "ok")
    summary["data_hash"] = compute_file_hash(path)
    return frame, features


def _stage_split(
    config: dict[str, Any],
    cohort: pd.DataFrame,
    run_path: Path,
    events: EventWriter,
    summary: dict[str, Any],
) -> tuple[Splitter, pd.DataFrame]:
    """Hold out the lock-box, then write the split that the run will use."""
    split_config = config.get("split", {})
    splitter = Splitter(
        n_folds=int(split_config.get("n_folds", 4)),
        lock_box_fraction=float(split_config.get("lock_box_fraction", 0.2)),
        seed=int(split_config.get("seed", 42)),
        stratify_by=str(split_config.get("stratify_by", "wab_aq")),
    )

    events.write_stage_start("split", splitter.stratify_by)
    lock_box, development = splitter.split_lock_box(cohort)
    if lock_box.empty:
        raise CohortError(
            "the lock-box split is empty; check data.lock_box_fraction against the "
            "number of participants"
        )

    split_dir = run_path / "splits"
    split_dir.mkdir(exist_ok=True)
    folds = splitter.create_cv_splits(development)
    (split_dir / "split.json").write_text(json.dumps({
        "seed": splitter.seed,
        "n_folds": splitter.n_folds,
        "lock_box_fraction": splitter.lock_box_fraction,
        "stratify_by": splitter.stratify_by,
        "lock_box_participants": lock_box["participant_id"].astype(str).tolist(),
        "development_participants": development["participant_id"].astype(str).tolist(),
        "folds": [
            {
                "fold": index,
                "train": development["participant_id"].to_numpy()[train].astype(str).tolist(),
                "valid": development["participant_id"].to_numpy()[valid].astype(str).tolist(),
            }
            for index, (train, valid) in enumerate(folds, start=1)
        ],
    }, indent=2))

    summary["stages"].append({"stage": "split", "status": "ok"})
    events.write_metric("split", "n_lock_box", int(len(lock_box)))
    events.write_stage_end("split", "ok")
    return splitter, lock_box


def _stage_baseline(
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


def _stage_evaluate(
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

    artefacts = _artefacts(run_path)
    table.to_csv(artefacts / "lockbox_predictions.csv", index=False)
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


def _stage_report(
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
    predictions.to_csv(_artefacts(run_path) / "predictions.csv", index=False)

    results = {model_type: {row["name"]: row for row in aggregated}}
    generate_all_reports(results, [], str(_artefacts(run_path) / "reports"))

    summary["metrics"] = aggregated
    summary["stages"].append({"stage": "report", "status": "ok"})
    for row in aggregated:
        events.write_metric("report", row["name"], row["value"])
    events.write_stage_end("report", "ok")


def _artefacts(run_path: Path) -> Path:
    artefacts = run_path / "artifacts"
    artefacts.mkdir(exist_ok=True)
    return artefacts


def config_hash(config: dict[str, Any]) -> str:
    """Hash of the resolved configuration, for the summary the CLI prints."""
    return compute_config_hash(config)


def stages() -> list[str]:
    """The stages this build implements, in execution order."""
    return list(BASELINE_STAGES)
