"""Tests for cohort loading, outcome binning and feature encoding."""

from pathlib import Path

import numpy as np
import pandas as pd
import pytest

from pipeline.core.dataset import (
    CohortError,
    binarise_outcome,
    has_both_classes,
    load_cohort,
    select_features,
    summarise_classes,
)
from pipeline.core.encoding import encode_features


@pytest.fixture
def cohort():
    rng = np.random.default_rng(3)
    size = 40
    return pd.DataFrame({
        "participant_id": [f"sub-{i:03d}" for i in range(size)],
        "age_at_stroke": rng.normal(65, 9, size).round(1),
        "sex": rng.choice(["M", "F"], size),
        "wab_aq": rng.uniform(10, 95, size).round(1),
    })


def write(frame: pd.DataFrame, path: Path) -> str:
    frame.to_csv(path, sep="\t", index=False)
    return str(path)


def test_loads_one_row_per_participant(cohort: pd.DataFrame, tmp_path: Path):
    frame = load_cohort(write(cohort, tmp_path / "participants.tsv"))

    assert len(frame) == len(cohort)
    assert "participant_id" in frame.columns


def test_missing_file_is_reported_by_path(tmp_path: Path):
    with pytest.raises(CohortError, match="not found"):
        load_cohort(str(tmp_path / "absent.tsv"))


def test_table_without_participant_id_is_refused(tmp_path: Path):
    path = write(pd.DataFrame({"wab_aq": [10, 20]}), tmp_path / "participants.tsv")

    with pytest.raises(CohortError, match="participant_id"):
        load_cohort(path)


def test_repeated_sessions_are_refused_rather_than_silently_pooled(
    cohort: pd.DataFrame,
    tmp_path: Path,
):
    """Two sessions per person would put a participant in two folds."""
    repeated = pd.concat([cohort, cohort.assign(session_id="ses-2")], ignore_index=True)
    repeated["session_id"] = ["ses-1"] * len(cohort) + ["ses-2"] * len(cohort)

    with pytest.raises(CohortError, match="several sessions"):
        load_cohort(write(repeated, tmp_path / "participants.tsv"))


def test_one_session_per_participant_is_accepted(cohort: pd.DataFrame, tmp_path: Path):
    single = cohort.assign(session_id="ses-1")

    frame = load_cohort(write(single, tmp_path / "participants.tsv"))

    assert len(frame) == len(cohort)


def test_outcome_is_binned_and_continuous_score_kept(cohort: pd.DataFrame):
    frame = binarise_outcome(cohort, "wab_aq", 50.0)

    assert set(frame["outcome"].unique()) <= {0.0, 1.0}
    assert (frame.loc[frame["wab_aq"] >= 50.0, "outcome"] == 1.0).all()
    assert "wab_aq" in frame.columns


def test_absent_outcome_column_names_what_is_available(cohort: pd.DataFrame):
    with pytest.raises(CohortError, match="outcome column 'wab_days' is missing"):
        binarise_outcome(cohort, "wab_days", 50.0)


def test_all_missing_outcome_column_is_refused(cohort: pd.DataFrame):
    frame = cohort.assign(wab_aq=np.nan)

    with pytest.raises(CohortError, match="no usable values"):
        binarise_outcome(frame, "wab_aq", 50.0)


def test_participants_missing_an_outcome_are_dropped_not_imputed(cohort: pd.DataFrame):
    frame = cohort.copy()
    frame.loc[frame.index[:5], "wab_aq"] = np.nan
    binarised = binarise_outcome(frame, "wab_aq", 50.0)

    usable = select_features(binarised, ["age_at_stroke"], "wab_aq")

    assert len(usable) == len(cohort) - 5
    assert not bool(usable["outcome"].isna().any())


def test_unknown_feature_column_is_refused_with_the_available_list(cohort: pd.DataFrame):
    binarised = binarise_outcome(cohort, "wab_aq", 50.0)

    with pytest.raises(CohortError, match="lesion_volume"):
        select_features(binarised, ["age_at_stroke", "lesion_volume"], "wab_aq")


def test_selecting_nothing_survives_is_an_error(cohort: pd.DataFrame):
    frame = cohort.assign(age_at_stroke=np.nan)
    binarised = binarise_outcome(frame, "wab_aq", 50.0)

    with pytest.raises(CohortError, match="no participant"):
        select_features(binarised, ["age_at_stroke"], "wab_aq")


def test_categorical_feature_is_one_hot_encoded(cohort: pd.DataFrame):
    binarised = binarise_outcome(cohort, "wab_aq", 50.0)
    usable = select_features(binarised, ["age_at_stroke", "sex"], "wab_aq")

    encoded = encode_features(usable, ["age_at_stroke", "sex"])

    assert encoded.shape[0] == len(usable)
    assert all(dtype == np.float64 for dtype in encoded.dtypes)
    assert not encoded.isna().to_numpy().any()
    assert "age_at_stroke" in encoded.columns
    assert any(column.startswith("sex_") for column in encoded.columns)


def test_encoding_keeps_the_frame_index(cohort: pd.DataFrame):
    """Row alignment matters: the lock-box is selected by label, not position."""
    binarised = binarise_outcome(cohort, "wab_aq", 50.0)
    usable = select_features(binarised, ["age_at_stroke"], "wab_aq")
    subset = usable.iloc[3:7]

    encoded = encode_features(subset, ["age_at_stroke"])

    assert list(encoded.index) == list(subset.index)


def test_encoding_never_returns_an_empty_matrix(cohort: pd.DataFrame):
    binarised = binarise_outcome(cohort, "wab_aq", 50.0)
    usable = select_features(binarised, ["sex"], "wab_aq")

    encoded = encode_features(usable, ["sex"])

    assert encoded.shape[1] >= 1


def test_class_summary_counts_both_directions(cohort: pd.DataFrame):
    binarised = binarise_outcome(cohort, "wab_aq", 50.0)
    labels = binarised["outcome"].to_numpy(dtype=int)

    summary = summarise_classes(labels)

    assert summary["n"] == len(labels)
    assert summary["n_positive"] == int((labels == 1).sum())
    assert summary["n_negative"] == int((labels == 0).sum())
    assert 0.0 <= summary["positive_rate"] <= 1.0
    assert has_both_classes(labels)
    assert not has_both_classes(np.zeros(5, dtype=int))
