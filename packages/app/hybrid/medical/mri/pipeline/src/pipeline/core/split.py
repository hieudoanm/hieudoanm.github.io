"""Participant-level data splitting with lock-box test set."""

import json
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd

from pipeline.core.partition import (
    partition_cv_splits,
    partition_lock_box,
)


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
        """Split data into lock-box test set and remaining data."""
        return partition_lock_box(
            df,
            participant_col=participant_col,
            stratify_by=self.stratify_by,
            lock_box_fraction=self.lock_box_fraction,
            seed=self.seed,
        )

    def create_cv_splits(
        self,
        df: pd.DataFrame,
        participant_col: str = "participant_id",
    ) -> list[tuple[np.ndarray, np.ndarray]]:
        """Create cross-validation splits on the remaining data."""
        return partition_cv_splits(
            df,
            participant_col=participant_col,
            stratify_by=self.stratify_by,
            n_folds=self.n_folds,
            seed=self.seed,
        )

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
