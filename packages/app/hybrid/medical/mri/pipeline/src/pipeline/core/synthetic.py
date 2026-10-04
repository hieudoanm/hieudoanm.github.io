"""A synthetic cohort so a fresh clone can run the pipeline without ARC data.

The real cohort is not redistributable, so `pipeline data cohort` writes a table
with the same columns (and a learnable signal) that the dev config expects. It is
seeded, so the same command always produces the same table and the demo run is
reproducible.
"""

from pathlib import Path
from typing import TypedDict

import numpy as np
import pandas as pd

SYNTHETIC_COLUMNS = ("age_at_stroke", "sex", "wab_days", "wab_aq")


class CohortReport(TypedDict):
    """What a participants table holds, as reported by the `data check` action."""

    path: str
    n_participants: int
    columns: list[str]


def make_synthetic_cohort(n_participants: int = 120, seed: int = 42) -> pd.DataFrame:
    """Build a one-row-per-participant table with a signal the baseline can learn.

    The outcome is driven partly by age and time post-stroke, so a run on this
    table produces non-chance scores and exercises the whole evaluation path.

    Args:
        n_participants: Number of rows to generate
        seed: Seed for the generator

    Returns:
        A cohort table with `participant_id` and the modelled columns
    """
    if n_participants < 1:
        raise ValueError("the synthetic cohort needs at least one participant")

    rng = np.random.default_rng(seed)
    age = rng.normal(65, 9, n_participants).round(1)
    days = rng.uniform(3, 90, n_participants).round(1)
    sex = rng.choice(["M", "F"], n_participants)
    signal = 0.03 * (age - 65) - 0.04 * (days - 45) + rng.normal(scale=1.0, size=n_participants)
    score = np.clip(50 + 18 * signal + rng.normal(scale=7, size=n_participants), 5, 99)

    return pd.DataFrame({
        "participant_id": [f"sub-{i:04d}" for i in range(n_participants)],
        "age_at_stroke": age,
        "sex": sex,
        "wab_days": days,
        "wab_aq": score.round(1),
    })


def write_synthetic_cohort(
    output_path: str | Path,
    n_participants: int = 120,
    seed: int = 42,
) -> Path:
    """Write a synthetic cohort as a tab-separated participants table.

    Args:
        output_path: Where to write the table
        n_participants: Number of participants
        seed: Seed for the generator

    Returns:
        The path that was written
    """
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    make_synthetic_cohort(n_participants=n_participants, seed=seed).to_csv(
        path, sep="\t", index=False
    )
    return path


def describe_cohort(participants_tsv: str | Path) -> CohortReport:
    """Read a participants table back and report what a run would receive.

    Args:
        participants_tsv: Path to the table to check

    Returns:
        A report with the path, row count and columns

    Raises:
        FileNotFoundError: If the table does not exist
        ValueError: If it lacks `participant_id` or lists duplicate participants
    """
    path = Path(participants_tsv)
    if not path.is_file():
        raise FileNotFoundError(f"participants table not found: {path}")

    frame = pd.read_csv(path, sep="\t")
    if "participant_id" not in frame.columns:
        raise ValueError("participants table must contain a 'participant_id' column")

    duplicated = int(frame["participant_id"].duplicated().sum())
    if duplicated:
        raise ValueError(
            f"{duplicated} participant rows are duplicated; a run needs one row "
            "per participant so a person cannot appear in two folds"
        )

    return {
        "path": str(path),
        "n_participants": int(len(frame)),
        "columns": [str(column) for column in frame.columns],
    }
