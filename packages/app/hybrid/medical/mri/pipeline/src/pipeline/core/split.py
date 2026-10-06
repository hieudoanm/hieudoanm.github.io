"""Participant-level data splitting with lock-box test set."""

import json
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedGroupKFold, train_test_split


class Splitter:
    """Participant-level splitter with lock-box test set."""

    def __init__(
        self,
        n_folds: int = 4,
        lock_box_fraction: float = 0.2,
        seed: int = 42,
        stratify_by: str = "wab_aq",
    ):
        """Initialize splitter.
        
        Args:
            n_folds: Number of cross-validation folds
            lock_box_fraction: Fraction of data for lock-box test set
            seed: Random seed for reproducibility
            stratify_by: Column to stratify by
        """
        self.n_folds = n_folds
        self.lock_box_fraction = lock_box_fraction
        self.seed = seed
        self.stratify_by = stratify_by
        self.lock_box_access_count = 0

    def split_lock_box(
        self,
        df: pd.DataFrame,
        participant_col: str = "participant_id",
    ) -> tuple[pd.DataFrame, pd.DataFrame]:
        """Split data into lock-box test set and remaining data.
        
        Args:
            df: Cohort dataframe
            participant_col: Column name for participant IDs
        
        Returns:
            Tuple of (lock_box_df, remaining_df)
        """
        np.random.seed(self.seed)

        # Get unique participants
        participants = df[participant_col].unique()

        # Stratify by the stratify column if available
        if self.stratify_by in df.columns:
            # Get the stratify value for each participant (use first session's value)
            participant_stratify = df.groupby(participant_col)[self.stratify_by].first()

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
                            test_size=1 - self.lock_box_fraction,
                            random_state=self.seed,
                            stratify=stratify_binned,
                        )
                    else:
                        # Fall back to simple split if not enough samples
                        lock_box_participants, remaining_participants = train_test_split(
                            participants,
                            test_size=1 - self.lock_box_fraction,
                            random_state=self.seed,
                        )
                except ValueError:
                    # Fall back to simple split if binning fails
                    lock_box_participants, remaining_participants = train_test_split(
                        participants,
                        test_size=1 - self.lock_box_fraction,
                        random_state=self.seed,
                    )
            else:
                # Use categorical values directly
                try:
                    lock_box_participants, remaining_participants = train_test_split(
                        participants,
                        test_size=1 - self.lock_box_fraction,
                        random_state=self.seed,
                        stratify=stratify_values,
                    )
                except ValueError:
                    # Fall back to simple split if stratification fails
                    lock_box_participants, remaining_participants = train_test_split(
                        participants,
                        test_size=1 - self.lock_box_fraction,
                        random_state=self.seed,
                    )
        else:
            # Simple random split if no stratify column
            lock_box_participants, remaining_participants = train_test_split(
                participants,
                test_size=1 - self.lock_box_fraction,
                random_state=self.seed,
            )

        # `list(...)` because train_test_split returns either a list or an ndarray, and
        # pandas types `isin` against Sequence but not ndarray.
        lock_box_df = df.loc[df[participant_col].isin(list(lock_box_participants))]
        remaining_df = df.loc[df[participant_col].isin(list(remaining_participants))]

        return lock_box_df, remaining_df

    def create_cv_splits(
        self,
        df: pd.DataFrame,
        participant_col: str = "participant_id",
    ) -> list[tuple[np.ndarray, np.ndarray]]:
        """Create cross-validation splits on the remaining data.
        
        Args:
            df: Dataframe (excluding lock-box)
            participant_col: Column name for participant IDs
        
        Returns:
            List of (train_indices, val_indices) tuples
        """
        np.random.seed(self.seed)

        # Create groups for participant-level splitting
        groups = df[participant_col].values

        # Stratification needs discrete labels, so a continuous score such as
        # wab_aq is binned into quantile bins first. StratifiedGroupKFold
        # rejects a continuous target outright.
        y = (
            _discrete_stratify_labels(df, self.stratify_by)
            if self.stratify_by in df.columns
            else None
        )

        # Use StratifiedGroupKFold if y is available, otherwise GroupKFold
        if y is not None:
            sgkf = StratifiedGroupKFold(
                n_splits=self.n_folds,
                shuffle=True,
                random_state=self.seed,
            )
            splits = list(sgkf.split(df, y, groups=groups))
        else:
            # Fallback to simple group K-fold
            from sklearn.model_selection import GroupKFold
            gkf = GroupKFold(n_splits=self.n_folds)
            splits = list(gkf.split(df, groups=groups))

        return splits

    def split_all(
        self,
        df: pd.DataFrame,
        participant_col: str = "participant_id",
    ) -> dict[str, Any]:
        """Perform complete split: lock-box + CV folds.
        
        Args:
            df: Cohort dataframe
            participant_col: Column name for participant IDs
        
        Returns:
            Dictionary with lock_box and cv_splits
        """
        lock_box_df, remaining_df = self.split_lock_box(df, participant_col)
        cv_splits = self.create_cv_splits(remaining_df, participant_col)

        return {
            "lock_box": lock_box_df,
            "remaining": remaining_df,
            "cv_splits": cv_splits,
            "lock_box_participants": lock_box_df[participant_col].unique().tolist(),
            "remaining_participants": remaining_df[participant_col].unique().tolist(),
        }

    def save_splits(
        self,
        splits: dict[str, Any],
        output_path: str | Path,
    ) -> None:
        """Save splits to disk for reproducibility.
        
        Args:
            splits: Splits dictionary from split_all
            output_path: Path to save splits
        """
        path = Path(output_path)
        path.parent.mkdir(parents=True, exist_ok=True)

        # Convert dataframes to lists of participant IDs for serialization
        splits_serializable = {
            "lock_box_participants": splits["lock_box_participants"],
            "remaining_participants": splits["remaining_participants"],
            "cv_splits": [
                {
                    "train_indices": train.tolist(),
                    "val_indices": val.tolist(),
                }
                for train, val in splits["cv_splits"]
            ],
            "n_folds": self.n_folds,
            "lock_box_fraction": self.lock_box_fraction,
            "seed": self.seed,
            "stratify_by": self.stratify_by,
        }

        with open(path, "w") as f:
            json.dump(splits_serializable, f, indent=2)

    def load_splits(
        self,
        input_path: str | Path,
        df: pd.DataFrame,
        participant_col: str = "participant_id",
    ) -> dict[str, Any]:
        """Load splits from disk.

        Args:
            input_path: Path to saved splits
            df: Original cohort dataframe
            participant_col: Column name for participant IDs

        Returns:
            Splits dictionary with dataframes
        """
        path = Path(input_path)
        with path.open() as f:
            splits_data = json.load(f)

        # Reconstruct dataframes from participant IDs
        lock_box_df = df[df[participant_col].isin(splits_data["lock_box_participants"])]
        remaining_df = df[df[participant_col].isin(splits_data["remaining_participants"])]

        # Reconstruct CV splits
        cv_splits = [
            (
                np.array(s["train_indices"]),
                np.array(s["val_indices"]),
            )
            for s in splits_data["cv_splits"]
        ]

        return {
            "lock_box": lock_box_df,
            "remaining": remaining_df,
            "cv_splits": cv_splits,
            "lock_box_participants": splits_data["lock_box_participants"],
            "remaining_participants": splits_data["remaining_participants"],
        }

    def increment_lock_box_access(self) -> int:
        """Increment and return lock-box access count."""
        self.lock_box_access_count += 1
        return self.lock_box_access_count

    def get_lock_box_access_count(self) -> int:
        """Get current lock-box access count."""
        return self.lock_box_access_count


def verify_no_leakage(
    train_participants: list[str],
    test_participants: list[str],
) -> bool:
    """Verify that there is no participant leakage between train and test.
    
    Args:
        train_participants: List of training participant IDs
        test_participants: List of test participant IDs
    
    Returns:
        True if no leakage, False otherwise
    """
    train_set = set(train_participants)
    test_set = set(test_participants)

    return len(train_set.intersection(test_set)) == 0


def _discrete_stratify_labels(
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
