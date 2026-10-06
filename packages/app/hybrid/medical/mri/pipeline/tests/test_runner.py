"""Tests for run orchestration.

These are the contract tests for the desktop workbench: a run folder has to be
complete, the lock-box must stay out of training, and a failure must leave a
folder that says it failed instead of an empty one.
"""

import json
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import pytest

from pipeline.core.events import read_events
from pipeline.core.lockbox import LockBoxLogger
from pipeline.core.runner import run_experiment
from pipeline.core.runs import list_runs, load_manifest

REQUIRED_FILES = (
    "manifest.json",
    "config.yaml",
    "events.jsonl",
    "metrics.json",
    "splits/split.json",
    "lockbox_metrics.json",
    "lockbox_access.json",
    "artifacts/predictions.csv",
    "artifacts/lockbox_predictions.csv",
    "artifacts/reports/metrics.csv",
)


def make_cohort(path: Path, size: int = 60) -> Path:
    rng = np.random.default_rng(11)
    signal = rng.normal(size=size)
    score = np.clip(50 + 20 * signal + rng.normal(scale=8, size=size), 5, 99)
    frame = pd.DataFrame({
        "participant_id": [f"sub-{i:03d}" for i in range(size)],
        "age_at_stroke": rng.normal(65, 9, size).round(1),
        "sex": rng.choice(["M", "F"], size),
        "wab_days": rng.uniform(3, 90, size).round(1),
        "wab_aq": score.round(1),
    })
    frame.to_csv(path, sep="\t", index=False)
    return path


def make_config(
    participants: Path, model_type: str = "logistic_regression"
) -> dict[str, Any]:
    return {
        "schema_version": "0.1.0",
        "data": {
            "participants_tsv": str(participants),
            "outcome_column": "wab_aq",
            "outcome_threshold": 50.0,
            "features": ["age_at_stroke", "sex", "wab_days"],
        },
        "split": {"n_folds": 3, "lock_box_fraction": 0.25, "seed": 42, "stratify_by": "wab_aq"},
        "model": {"model_type": model_type},
        "run": {"output_dir": "runs/"},
    }


@pytest.fixture
def workspace(tmp_path: Path):
    participants = make_cohort(tmp_path / "participants.tsv")
    return participants, tmp_path / "runs"


def test_run_writes_a_complete_folder(workspace: tuple[Path, Path]):
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))

    run_path = Path(summary["path"])
    for relative in REQUIRED_FILES:
        assert (run_path / relative).is_file(), relative
    assert summary["run_id"] == run_path.name
    assert summary["run_id"].startswith("r_")


def test_manifest_records_completion_and_the_data_hash(workspace: tuple[Path, Path]):
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))
    manifest = load_manifest(Path(summary["path"]))

    assert manifest["status"] == "completed"
    assert manifest["end_time"] is not None
    assert manifest["data_hash"]
    assert manifest["seeds"] == 42
    assert manifest["library_versions"]["numpy"] != "not installed"


def test_metrics_document_matches_what_the_workbench_reads(workspace: tuple[Path, Path]):
    """The dashboard parses metrics/calibration/confusion from metrics.json."""
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))
    document = json.loads((Path(summary["path"]) / "metrics.json").read_text())

    names = {row["name"] for row in document["metrics"]}
    assert {"accuracy", "auc", "balanced_accuracy", "f1"} <= names
    for row in document["metrics"]:
        assert isinstance(row["value"], float)
        assert row["ci_lower"] <= row["ci_upper"]
    assert set(document["calibration"]) >= {"brier_score", "ece", "prob_true", "prob_pred"}
    assert document["confusion"]["confusion_matrix"]
    assert len(document["folds"]) == 3


def test_calibration_prob_true_and_prob_pred_are_matching_curves(workspace: tuple[Path, Path]):
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))
    calibration = json.loads((Path(summary["path"]) / "metrics.json").read_text())["calibration"]

    assert calibration["prob_true"] == calibration["accuracy"]
    assert calibration["prob_pred"] == calibration["confidence"]
    assert len(calibration["prob_true"]) == len(calibration["count"])


def test_events_are_append_only_and_every_metric_names_its_stage(workspace: tuple[Path, Path]):
    """A metric event without a stage is dropped by the workbench parser."""
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))
    events = read_events(Path(summary["path"]))

    stages = [event["type"] for event in events]
    assert stages[0] == "stage_start"
    assert stages[-1] == "stage_end"
    assert "error" not in stages
    for event in events:
        assert event.get("stage")
        if event["type"] == "metric":
            assert isinstance(event["value"], (int, float))


def test_events_cover_every_reported_stage(workspace: tuple[Path, Path]):
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))
    events = read_events(Path(summary["path"]))

    started = {event["stage"] for event in events if event["type"] == "stage_start"}
    ended = {event["stage"] for event in events if event["type"] == "stage_end"}
    assert started == ended == {"run", "data", "split", "baseline", "evaluate", "report"}


def test_split_artifact_holds_out_participants_nobody_trains_on(workspace: tuple[Path, Path]):
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))
    split = json.loads((Path(summary["path"]) / "splits" / "split.json").read_text())

    lock_box = set(split["lock_box_participants"])
    development = set(split["development_participants"])
    assert lock_box and development
    assert lock_box.isdisjoint(development)
    for fold in split["folds"]:
        assert set(fold["train"]).isdisjoint(fold["valid"])
        assert set(fold["train"]) <= development
        assert set(fold["valid"]) <= development


def test_lock_box_predictions_cover_only_held_out_participants(workspace: tuple[Path, Path]):
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))
    run_path = Path(summary["path"])
    split = json.loads((run_path / "splits" / "split.json").read_text())
    table = pd.read_csv(run_path / "artifacts" / "lockbox_predictions.csv")

    assert set(table["participant_id"]) == set(split["lock_box_participants"])
    assert table["probability"].between(0.0, 1.0).all()
    assert set(table["predicted"]) <= {0, 1}


def test_lock_box_access_is_logged_exactly_once(workspace: tuple[Path, Path]):
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))
    run_path = Path(summary["path"])
    access = json.loads((run_path / "lockbox_access.json").read_text())
    logger = LockBoxLogger(str(run_path / "lockbox_access.json"))

    assert logger.get_access_count() == 1
    assert access["accesses"][0]["run_id"] == run_path.name
    assert access["accesses"][0]["n_participants"] > 0


def test_cross_validated_predictions_exclude_the_lock_box(workspace: tuple[Path, Path]):
    participants, runs = workspace

    summary = run_experiment(make_config(participants), output_dir=str(runs))
    run_path = Path(summary["path"])
    lock_box = set(
        json.loads((run_path / "splits" / "split.json").read_text())["lock_box_participants"]
    )
    predictions = pd.read_csv(run_path / "artifacts" / "predictions.csv")
    predicted = set(predictions.loc[predictions["probability"].notna(), "participant_id"])

    assert not predicted & lock_box


def test_gradient_boosting_runs_the_same_pipeline(workspace: tuple[Path, Path]):
    participants, runs = workspace

    summary = run_experiment(
        make_config(participants, "gradient_boosting"), output_dir=str(runs)
    )

    document = json.loads((Path(summary["path"]) / "metrics.json").read_text())
    assert document["model_type"] == "gradient_boosting"
    assert document["metrics"]


def test_run_is_reproducible_for_a_fixed_seed(workspace: tuple[Path, Path]):
    participants, runs = workspace

    first = run_experiment(make_config(participants), output_dir=str(runs), run_id="r_fixed_1")
    second = run_experiment(make_config(participants), output_dir=str(runs), run_id="r_fixed_2")

    left = json.loads((Path(first["path"]) / "metrics.json").read_text())["metrics"]
    right = json.loads((Path(second["path"]) / "metrics.json").read_text())["metrics"]
    assert left == right


def test_run_appears_in_the_run_listing(workspace: tuple[Path, Path]):
    participants, runs = workspace

    run_experiment(make_config(participants), output_dir=str(runs))
    listing = list_runs(str(runs))

    assert len(listing) == 1
    assert listing[0]["run_id"] == listing[0]["run_id"].strip()


def test_a_failing_run_leaves_a_folder_that_says_it_failed(workspace: tuple[Path, Path]):
    participants, runs = workspace
    config = make_config(participants)
    config["data"]["features"] = ["not_a_column"]

    with pytest.raises(Exception):
        run_experiment(config, output_dir=str(runs))

    folders = [path for path in Path(runs).iterdir() if path.is_dir()]
    assert len(folders) == 1
    manifest = load_manifest(folders[0])
    assert manifest["status"] == "failed"
    events = read_events(folders[0])
    assert [event["type"] for event in events][-1] == "stage_end"
    assert any(event["type"] == "error" for event in events)


def test_missing_participants_table_is_reported_not_swallowed(
    workspace: tuple[Path, Path],
    tmp_path: Path,
):
    _, runs = workspace
    config = make_config(tmp_path / "absent.tsv")

    with pytest.raises(Exception, match="not found"):
        run_experiment(config, output_dir=str(runs))


def test_model_without_an_implementation_is_refused(workspace: tuple[Path, Path]):
    participants, runs = workspace

    with pytest.raises(ValueError, match="no tabular baseline"):
        run_experiment(make_config(participants, "resnet18"), output_dir=str(runs))
