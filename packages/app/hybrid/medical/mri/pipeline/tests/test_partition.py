"""Tests for the pure partition functions: table in, row subsets out."""

import numpy as np
import pandas as pd
import pytest

from pipeline.core.partition import (
    discrete_stratify_labels,
    partition_cv_splits,
    partition_lock_box,
)


def test_partition_lock_box_falls_back_when_too_few_continuous_values():
    """A continuous stratum with too few rows cannot be binned, so split plainly."""
    frame = pd.DataFrame({
        "participant_id": ["a", "b", "c"],
        "wab_aq": [1.0, 2.0, 3.0],
    })

    lock_box, remaining = partition_lock_box(
        frame, "participant_id", "wab_aq", 0.34, seed=1
    )

    assert len(lock_box) + len(remaining) == 3
    assert set(lock_box["participant_id"]).isdisjoint(remaining["participant_id"])


def test_partition_lock_box_falls_back_when_a_category_is_too_rare():
    """train_test_split refuses a class with one member; the plain split still runs."""
    frame = pd.DataFrame({
        "participant_id": ["a", "b", "c", "d", "e"],
        "group": ["g", "g", "g", "x", "y"],
    })

    lock_box, remaining = partition_lock_box(
        frame, "participant_id", "group", 0.2, seed=3
    )

    assert len(lock_box) + len(remaining) == 5
    assert set(lock_box["participant_id"]).isdisjoint(remaining["participant_id"])


def test_partition_lock_box_falls_back_when_a_bin_is_too_rare():
    """A skewed continuous column can leave a one-member bin, which stratify rejects."""
    frame = pd.DataFrame({
        "participant_id": ["a", "b", "c", "d", "e"],
        "wab_aq": [1.0, 2.0, 3.0, 4.0, 100.0],
    })

    lock_box, remaining = partition_lock_box(
        frame, "participant_id", "wab_aq", 0.2, seed=5
    )

    assert len(lock_box) + len(remaining) == 5
    assert set(lock_box["participant_id"]).isdisjoint(remaining["participant_id"])


def test_partition_lock_box_splits_plainly_without_a_stratify_column():
    frame = pd.DataFrame({
        "participant_id": [f"sub-{i}" for i in range(10)],
        "age_at_stroke": range(10),
    })

    lock_box, remaining = partition_lock_box(
        frame, "participant_id", "not_a_column", 0.2, seed=42
    )

    assert len(lock_box) + len(remaining) == 10
    assert set(lock_box["participant_id"]).isdisjoint(remaining["participant_id"])


def test_partition_cv_splits_keeps_participants_whole():
    frame = pd.DataFrame({
        "participant_id": [f"sub-{i}" for i in range(12)],
        "wab_aq": np.linspace(10, 90, 12),
    })

    splits = partition_cv_splits(frame, "participant_id", "wab_aq", 3, seed=42)

    assert len(splits) == 3
    groups = frame["participant_id"].to_numpy()
    for train_index, valid_index in splits:
        assert set(groups[train_index]).isdisjoint(groups[valid_index])


def test_discrete_labels_refuses_a_duplicated_column():
    frame = pd.DataFrame([[1.0, 2.0]], columns=["wab_aq", "wab_aq"])

    with pytest.raises(ValueError, match="did not resolve to a single column"):
        discrete_stratify_labels(frame, "wab_aq")


def test_discrete_labels_returns_none_when_every_value_is_missing():
    frame = pd.DataFrame({"wab_aq": [np.nan, np.nan]})

    assert discrete_stratify_labels(frame, "wab_aq") is None


def test_discrete_labels_returns_none_when_too_few_values_to_bin():
    frame = pd.DataFrame({"wab_aq": [1.0, 2.0, 3.0]})

    assert discrete_stratify_labels(frame, "wab_aq") is None


def test_discrete_labels_bins_a_continuous_column():
    frame = pd.DataFrame({"wab_aq": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0]})

    labels = discrete_stratify_labels(frame, "wab_aq")

    assert labels is not None
    assert len(labels) == 6


def test_discrete_labels_keeps_a_categorical_column_as_strings():
    frame = pd.DataFrame({"group": ["a", "b", "a", "b"]})

    labels = discrete_stratify_labels(frame, "group")

    assert labels is not None
    assert set(labels) == {"a", "b"}
