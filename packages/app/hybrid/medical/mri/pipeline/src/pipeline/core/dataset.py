"""Cohort loading for the tabular baseline experiments.

One row per participant is the unit of analysis, so the session rule has to be
enforced rather than assumed: a table with several sessions per participant is
rejected with a message naming the rule to apply, instead of silently averaging
or duplicating people across folds.
"""

from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd


class CohortError(ValueError):
    """The cohort table cannot be used as configured."""


def load_cohort(participants_tsv: str) -> pd.DataFrame:
    """Read the participants table and require one row per participant.

    Args:
        participants_tsv: Path to a BIDS-style participants.tsv

    Returns:
        The table with a `session_id` column when one was present

    Raises:
        CohortError: If the file is missing, lacks `participant_id`, or lists
            more than one session for some participant
    """
    path = Path(participants_tsv)
    if not path.is_file():
        raise CohortError(f"participants table not found: {path}")

    frame = pd.read_csv(path, sep="\t")
    if "participant_id" not in frame.columns:
        raise CohortError("participants table must contain a 'participant_id' column")

    session_column = _session_column(frame)
    if session_column and _has_repeated_participants(frame, session_column):
        raise CohortError(
            "the table holds several sessions per participant; resolve them first "
            "(for example keep the first session per participant) so a person "
            "cannot appear in two folds"
        )
    return frame


def _session_column(frame: pd.DataFrame) -> str | None:
    for candidate in ("session_id", "session", "session_label"):
        if candidate in frame.columns:
            return candidate
    return None


def _has_repeated_participants(frame: pd.DataFrame, session_column: str) -> bool:
    return bool(frame.groupby("participant_id")[session_column].nunique().gt(1).any())


def binarise_outcome(
    frame: pd.DataFrame,
    outcome_column: str,
    threshold: float,
) -> pd.DataFrame:
    """Add a binary `outcome` column, keeping the continuous score as well.

    Both forms are kept because a binarised cut is a modelling choice, not a
    fact about the data, and the continuous value stays available for calibration
    and subgroup analysis.

    Args:
        frame: Cohort table
        outcome_column: Column holding the continuous outcome score
        threshold: Value at or above which the outcome counts as positive

    Returns:
        A copy with the extra `outcome` column

    Raises:
        CohortError: If the column is missing or has no usable values
    """
    if outcome_column not in frame.columns:
        raise CohortError(
            f"outcome column '{outcome_column}' is missing; available columns: "
            f"{sorted(frame.columns)}"
        )

    usable = frame.dropna(subset=[outcome_column])
    if usable.empty:
        raise CohortError(f"outcome column '{outcome_column}' has no usable values")

    result = frame.copy()
    result[outcome_column] = pd.to_numeric(result[outcome_column], errors="coerce")
    result["outcome"] = (result[outcome_column] >= threshold).astype("float")
    result.loc[result[outcome_column].isna(), "outcome"] = np.nan
    return result


def select_features(
    frame: pd.DataFrame,
    feature_columns: list[str],
    outcome_column: str,
) -> pd.DataFrame:
    """Keep participants with every feature and the outcome present.

    Args:
        frame: Cohort table with an `outcome` column
        feature_columns: Columns to use as model inputs
        outcome_column: Continuous outcome column, excluded from the inputs

    Returns:
        One row per participant with complete features and a known outcome

    Raises:
        CohortError: If a requested feature is absent, or nothing survives
    """
    missing = [column for column in feature_columns if column not in frame.columns]
    if missing:
        raise CohortError(
            f"feature columns not present in the cohort: {missing}; "
            f"available columns: {sorted(frame.columns)}"
        )

    usable = frame.dropna(subset=[*feature_columns, "outcome"]).copy()
    if usable.empty:
        raise CohortError(
            "no participant has every requested feature and an outcome; "
            "check the feature list against the cohort"
        )
    return usable


def encode_features(
    frame: pd.DataFrame,
    feature_columns: list[str],
) -> pd.DataFrame:
    """Turn the feature block into a numeric table, one-hot encoding categories.

    The result keeps `frame`'s index so a subset of rows - the lock-box, one
    validation fold - can be selected by label instead of by position.

    Args:
        frame: One row per participant
        feature_columns: Columns to use as model inputs

    Returns:
        Numeric features aligned to `frame.index`

    Raises:
        CohortError: If encoding produces no usable column
    """
    block = frame.reindex(columns=feature_columns).copy()
    # Anything that is not already a numeric or boolean dtype is categorical,
    # including pandas' StringDtype, which a dtype == object check would miss.
    categorical = [
        column
        for column in block.columns
        if not pd.api.types.is_numeric_dtype(block[column])
        and not pd.api.types.is_bool_dtype(block[column])
    ]
    # Only the categorical columns are re-typed, so the numeric ones keep the
    # dtype the check above just trusted.
    if categorical:
        block[categorical] = block.reindex(columns=categorical).astype(object).fillna(
            "missing"
        )
    encoded = pd.get_dummies(block, columns=categorical, drop_first=True)
    encoded = pd.DataFrame(encoded.apply(pd.to_numeric, errors="coerce"))
    if encoded.empty or encoded.shape[1] == 0:
        raise CohortError(
            f"feature encoding of {feature_columns} produced no usable column"
        )
    encoded = encoded.astype(float)
    if bool(encoded.isna().to_numpy().any()):
        missing = encoded.columns[encoded.isna().any()].tolist()
        raise CohortError(
            f"features still contain missing values after encoding: {missing}; "
            "select_features should have dropped those participants"
        )
    # Index alignment is mandatory: down-stream CV uses iloc/loc against this
    # frame. Do not reset it.
    return encoded


def summarise_classes(labels: np.ndarray) -> dict[str, Any]:
    """Class balance of the outcome, so an imbalanced cohort is visible in the log."""
    values, counts = np.unique(labels, return_counts=True)
    return {
        "n": int(labels.size),
        "n_positive": int(counts[values == 1].sum()) if np.isin(values, 1).any() else 0,
        "n_negative": int(counts[values == 0].sum()) if np.isin(values, 0).any() else 0,
        "positive_rate": float(np.mean(labels == 1)) if labels.size else float("nan"),
    }


def participant_labels(
    frame: pd.DataFrame,
    folds: list[tuple[np.ndarray, np.ndarray]],
) -> list[tuple[np.ndarray, np.ndarray]]:
    """Convert positional fold indices into participant labels."""
    participants = frame["participant_id"].to_numpy()
    return [(participants[train], participants[valid]) for train, valid in folds]


def has_both_classes(labels: np.ndarray) -> bool:
    """Whether a split contains both outcome classes, i.e. can train and score."""
    return len(np.unique(labels)) > 1
