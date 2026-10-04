"""Tests for the synthetic cohort a clean clone runs against."""

from pathlib import Path

import pandas as pd
import pytest

from pipeline.core.synthetic import (
    SYNTHETIC_COLUMNS,
    describe_cohort,
    make_synthetic_cohort,
    write_synthetic_cohort,
)


def test_make_synthetic_cohort_is_seeded_and_reproducible():
    first = make_synthetic_cohort(n_participants=25, seed=7)
    second = make_synthetic_cohort(n_participants=25, seed=7)

    pd.testing.assert_frame_equal(first, second)
    assert not make_synthetic_cohort(n_participants=25, seed=8).equals(first)


def test_make_synthetic_cohort_has_the_modelled_columns():
    frame = make_synthetic_cohort(n_participants=10)

    assert list(frame.columns) == ["participant_id", *SYNTHETIC_COLUMNS]
    assert len(frame) == 10
    assert frame["participant_id"].is_unique
    assert frame["wab_aq"].between(5, 99).all()


def test_make_synthetic_cohort_needs_at_least_one_participant():
    with pytest.raises(ValueError, match="at least one participant"):
        make_synthetic_cohort(n_participants=0)


def test_write_synthetic_cohort_writes_a_tsv(tmp_path: Path):
    path = write_synthetic_cohort(tmp_path / "nested" / "participants.tsv", n_participants=15)

    assert path.is_file()
    reloaded = pd.read_csv(path, sep="\t")
    assert len(reloaded) == 15
    assert "participant_id" in reloaded.columns


def test_describe_cohort_reports_shape_and_columns(tmp_path: Path):
    path = write_synthetic_cohort(tmp_path / "participants.tsv", n_participants=20)

    report = describe_cohort(path)

    assert report["n_participants"] == 20
    assert "participant_id" in report["columns"]
    assert report["path"] == str(path)


def test_describe_cohort_refuses_a_missing_table(tmp_path: Path):
    with pytest.raises(FileNotFoundError, match="not found"):
        describe_cohort(tmp_path / "absent.tsv")


def test_describe_cohort_refuses_a_table_without_ids(tmp_path: Path):
    path = tmp_path / "participants.tsv"
    pd.DataFrame({"age_at_stroke": [60, 70]}).to_csv(path, sep="\t", index=False)

    with pytest.raises(ValueError, match="participant_id"):
        describe_cohort(path)


def test_describe_cohort_refuses_duplicate_participants(tmp_path: Path):
    path = tmp_path / "participants.tsv"
    frame = make_synthetic_cohort(n_participants=2)
    frame.loc[1, "participant_id"] = frame.loc[0, "participant_id"]
    frame.to_csv(path, sep="\t", index=False)

    with pytest.raises(ValueError, match="duplicated"):
        describe_cohort(path)
