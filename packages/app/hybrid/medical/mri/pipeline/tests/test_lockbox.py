"""Tests that the lock-box stays out of training and is logged once."""

import json
from pathlib import Path

import pandas as pd

from pipeline.core.lockbox import LockBoxLogger
from pipeline.core.runner import run_experiment
from tests.conftest import make_config


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

