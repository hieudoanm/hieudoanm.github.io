"""The data and split stages: cohort in, held-out lock-box out.

Both stages write their events and their slice of the run summary as they go,
so a failure mid-run still leaves a folder that says where it stopped.
"""

import json
from pathlib import Path
from typing import Any

import pandas as pd

from pipeline.core.dataset import (
    CohortError,
    binarise_outcome,
    load_cohort,
    select_features,
    summarise_classes,
)
from pipeline.core.encoding import encode_features
from pipeline.core.events import EventWriter
from pipeline.core.runs import compute_file_hash
from pipeline.core.split import Splitter


def model_type_from_config(config: dict[str, Any]) -> str:
    model_type = str(config.get("model", {}).get("model_type", "logistic_regression"))
    return model_type


def stage_data(
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


def stage_split(
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
