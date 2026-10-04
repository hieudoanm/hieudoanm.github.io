"""How a cohort table is divided into a lock-box and cross-validation folds.

Split out of `split.py`, which owns the `Splitter` state and persists a split
once it exists. Everything here is a pure function: table in, row subsets out.
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedGroupKFold, train_test_split


def partition_lock_box(
    df: pd.DataFrame,
    participant_col: str,
    stratify_by: str,
    lock_box_fraction: float,
    seed: int,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Hold one lock-box's worth of participants aside, stratified when possible.

    Returns:
        Tuple of (lock_box_df, remaining_df)
    """
    np.random.seed(seed)

    # Get unique participants
    participants = df[participant_col].unique()

    # Stratify by the stratify column if available
    if stratify_by in df.columns:
        # Get the stratify value for each participant (use first session's value)
        participant_stratify = df.groupby(participant_col)[stratify_by].first()

        # For continuous values, bin them for stratification
        stratify_values = participant_stratify.reindex(participants).to_numpy()
        if stratify_values.dtype.kind in 'fc':  # float or complex
            # Bin into quantiles
            try:
                n_bins = min(5, len(stratify_values) // 2)
                if n_bins >= 2:
                    stratify_binned = pd.qcut(
                        stratify_values, q=n_bins, labels=False, duplicates='drop'
                    )
                    lock_box_participants, remaining_participants = train_test_split(
                        participants,
                        test_size=1 - lock_box_fraction,
                        random_state=seed,
                        stratify=stratify_binned,
                    )
                else:
                    # Fall back to simple split if not enough samples
                    lock_box_participants, remaining_participants = train_test_split(
                        participants,
                        test_size=1 - lock_box_fraction,
                        random_state=seed,
                    )
            except ValueError:
                # Fall back to simple split if binning fails
                lock_box_participants, remaining_participants = train_test_split(
                    participants,
                    test_size=1 - lock_box_fraction,
                    random_state=seed,
                )
        else:
            # Use categorical values directly
            try:
                lock_box_participants, remaining_participants = train_test_split(
                    participants,
                    test_size=1 - lock_box_fraction,
                    random_state=seed,
                    stratify=stratify_values,
                )
            except ValueError:
                # Fall back to simple split if stratification fails
                lock_box_participants, remaining_participants = train_test_split(
                    participants,
                    test_size=1 - lock_box_fraction,
                    random_state=seed,
                )
    else:
        # Simple random split if no stratify column
        lock_box_participants, remaining_participants = train_test_split(
            participants,
            test_size=1 - lock_box_fraction,
            random_state=seed,
        )

    # `list(...)` because train_test_split returns either a list or an ndarray, and
    # pandas types `isin` against Sequence but not ndarray.
    lock_box_df = df.loc[df[participant_col].isin(list(lock_box_participants))]
    remaining_df = df.loc[df[participant_col].isin(list(remaining_participants))]

    return lock_box_df, remaining_df


def partition_cv_splits(
    df: pd.DataFrame,
    participant_col: str,
    stratify_by: str,
    n_folds: int,
    seed: int,
) -> list[tuple[np.ndarray, np.ndarray]]:
    """Build participant-disjoint cross-validation folds over the given rows.

    Returns:
        List of (train_indices, val_indices) tuples
    """
    np.random.seed(seed)

    # Create groups for participant-level splitting
    groups = df[participant_col].values

    # Stratification needs discrete labels, so a continuous score such as
    # wab_aq is binned into quantile bins first. StratifiedGroupKFold
    # rejects a continuous target outright.
    y = (
        discrete_stratify_labels(df, stratify_by)
        if stratify_by in df.columns
        else None
    )

    # Use StratifiedGroupKFold if y is available, otherwise GroupKFold
    if y is not None:
        sgkf = StratifiedGroupKFold(
            n_splits=n_folds,
            shuffle=True,
            random_state=seed,
        )
        splits = list(sgkf.split(df, y, groups=groups))
    else:
        # Fallback to simple group K-fold
        from sklearn.model_selection import GroupKFold
        gkf = GroupKFold(n_splits=n_folds)
        splits = list(gkf.split(df, groups=groups))

    return splits


def discrete_stratify_labels(
    frame: pd.DataFrame,
    column: str,
    max_bins: int = 5,
) -> np.ndarray | None:
    """Turn a stratification column into discrete labels.

    A continuous score has to be binned before it can stratify a split;
    quantiles keep the rare tails visible instead of collapsing them.

    The frame and the column name are taken rather than the column itself:
    pandas ships no `py.typed`, so `frame[column]` is typed as a union of Series
    and DataFrame, while a single existing label always produces a Series.

    Args:
        frame: The cohort to read from
        column: Name of the column to stratify by
        max_bins: Largest number of quantile bins to use

    Returns:
        Integer bin labels, or None when the column is not usable as a label

    Raises:
        ValueError: If the label does not resolve to a single column
    """
    selected = frame[column]
    if not isinstance(selected, pd.Series):
        raise ValueError(f"{column!r} did not resolve to a single column")

    values = selected
    usable = values.dropna()
    if usable.empty:
        return None

    if usable.dtype.kind not in "fc":
        return usable.astype(str).to_numpy()

    bins = min(max_bins, len(usable) // 2)
    if bins < 2:
        return None
    # qcut is typed as a union that includes ndarray and Categorical, so its
    # codes are unwrapped first and then realigned to the original index.
    codes = np.asarray(pd.qcut(usable, q=bins, labels=False, duplicates="drop"))
    return pd.Series(codes, index=usable.index).reindex(values.index).to_numpy()
