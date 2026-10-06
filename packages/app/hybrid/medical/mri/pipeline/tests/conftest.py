"""Shared builders and the workspace fixture for the run-orchestration tests.

`workspace` is picked up automatically by pytest; the builders are imported by
name where a test needs them.
"""

from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import pytest

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
