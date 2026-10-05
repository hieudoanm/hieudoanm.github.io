"""Tests for participant-level splitting."""

import numpy as np
import pandas as pd
import pytest

from pipeline.core import Splitter, verify_no_leakage


@pytest.fixture
def sample_cohort():
    """Create a sample cohort for testing."""
    data = {
        "participant_id": [f"sub-{i:03d}" for i in range(100)],
        "wab_aq": np.random.rand(100) * 100,
        "age_at_stroke": np.random.randint(30, 80, 100),
        "outcome_group": np.random.choice(["good", "moderate", "poor"], 100),
    }
    return pd.DataFrame(data)


def test_splitter_initialization():
    """Test that splitter initializes correctly."""
    splitter = Splitter(n_folds=4, lock_box_fraction=0.2, seed=42, stratify_by="outcome_group")
    assert splitter.n_folds == 4
    assert splitter.lock_box_fraction == 0.2
    assert splitter.seed == 42


def test_lock_box_split(sample_cohort):
    """Test that lock-box split works correctly."""
    splitter = Splitter(n_folds=4, lock_box_fraction=0.2, seed=42, stratify_by="outcome_group")
    lock_box_df, remaining_df = splitter.split_lock_box(sample_cohort)

    # Check that split is approximately correct
    total = len(sample_cohort)
    lock_box_size = len(lock_box_df)
    remaining_size = len(remaining_df)

    assert lock_box_size + remaining_size == total
    assert 0.15 < lock_box_size / total < 0.25  # Allow some tolerance


def test_cv_splits(sample_cohort):
    """Test that CV splits are created correctly."""
    splitter = Splitter(n_folds=4, lock_box_fraction=0.2, seed=42, stratify_by="outcome_group")
    _, remaining_df = splitter.split_lock_box(sample_cohort)
    cv_splits = splitter.create_cv_splits(remaining_df)

    assert len(cv_splits) == 4

    # Check that each split has train and val indices
    for train_idx, val_idx in cv_splits:
        assert len(train_idx) > 0
        assert len(val_idx) > 0
        assert len(set(train_idx).intersection(set(val_idx))) == 0


def test_split_all(sample_cohort):
    """Test complete split pipeline."""
    splitter = Splitter(n_folds=4, lock_box_fraction=0.2, seed=42, stratify_by="outcome_group")
    splits = splitter.split_all(sample_cohort)

    assert "lock_box" in splits
    assert "remaining" in splits
    assert "cv_splits" in splits
    assert len(splits["cv_splits"]) == 4


def test_no_participant_leakage(sample_cohort):
    """Test that there is no participant leakage between splits."""
    splitter = Splitter(n_folds=4, lock_box_fraction=0.2, seed=42, stratify_by="outcome_group")
    splits = splitter.split_all(sample_cohort)

    lock_box_participants = splits["lock_box_participants"]
    remaining_participants = splits["remaining_participants"]

    assert verify_no_leakage(lock_box_participants, remaining_participants)


def test_split_reproducibility(sample_cohort):
    """Test that splits are reproducible with the same seed."""
    splitter1 = Splitter(n_folds=4, lock_box_fraction=0.2, seed=42, stratify_by="outcome_group")
    splits1 = splitter1.split_all(sample_cohort)

    splitter2 = Splitter(n_folds=4, lock_box_fraction=0.2, seed=42, stratify_by="outcome_group")
    splits2 = splitter2.split_all(sample_cohort)

    # Check that lock-box participants are the same
    assert splits1["lock_box_participants"] == splits2["lock_box_participants"]

    # Check that CV splits are the same
    for (train1, val1), (train2, val2) in zip(splits1["cv_splits"], splits2["cv_splits"]):
        assert np.array_equal(train1, train2)
        assert np.array_equal(val1, val2)


def test_save_and_load_splits(sample_cohort, tmp_path):
    """Test that splits can be saved and loaded."""
    splitter = Splitter(n_folds=4, lock_box_fraction=0.2, seed=42, stratify_by="outcome_group")
    splits = splitter.split_all(sample_cohort)

    # Save splits
    output_path = tmp_path / "splits.json"
    splitter.save_splits(splits, str(output_path))

    # Load splits
    loaded_splits = splitter.load_splits(str(output_path), sample_cohort)

    # Check that loaded splits match original
    assert splits["lock_box_participants"] == loaded_splits["lock_box_participants"]
    assert splits["remaining_participants"] == loaded_splits["remaining_participants"]


def test_lock_box_access_counter():
    """Test that lock-box access counter works."""
    splitter = Splitter(n_folds=4, lock_box_fraction=0.2, seed=42)

    assert splitter.get_lock_box_access_count() == 0

    splitter.increment_lock_box_access()
    assert splitter.get_lock_box_access_count() == 1

    splitter.increment_lock_box_access()
    assert splitter.get_lock_box_access_count() == 2


def test_continuous_stratify_column_is_binned(sample_cohort):
    """A continuous score must be binned; StratifiedGroupKFold rejects it raw."""
    frame = sample_cohort.copy()
    frame["wab_aq"] = frame["age_at_stroke"] * 1.7 + frame["wab_aq"] * 0.3
    splitter = Splitter(n_folds=3, lock_box_fraction=0.2, seed=42, stratify_by="wab_aq")

    splits = splitter.create_cv_splits(frame)

    assert len(splits) == 3
    assert frame["wab_aq"].dtype.kind == "f"  # the column really is continuous


def test_missing_stratify_column_falls_back_to_group_kfold(sample_cohort):
    splitter = Splitter(n_folds=3, seed=42, stratify_by="not_a_column")

    splits = splitter.create_cv_splits(sample_cohort)

    assert len(splits) == 3
    for train_index, valid_index in splits:
        assert set(train_index).isdisjoint(valid_index)
