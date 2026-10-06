"""Cohort builder: participants.tsv in, one row per participant out."""

from pathlib import Path

import pandas as pd

from pipeline.core.session_rules import (
    SessionRule,
    find_session_column,
    rule_key,
    session_key,
)


class CohortBuilder:
    """Builder for creating a cohort dataframe from BIDS participants.tsv."""

    def __init__(
        self,
        participants_tsv: str,
        session_rule: SessionRule = SessionRule.FIRST,
    ):
        """Initialize cohort builder.
        
        Args:
            participants_tsv: Path to participants.tsv file
            session_rule: Rule for selecting which session to use
        """
        self.participants_tsv = Path(participants_tsv)
        self.session_rule = session_rule
        self.cohort_df: pd.DataFrame | None = None

    def load_participants(self) -> pd.DataFrame:
        """Load participants.tsv file."""
        if not self.participants_tsv.exists():
            raise FileNotFoundError(f"Participants file not found: {self.participants_tsv}")

        df = pd.read_csv(self.participants_tsv, sep="\t")

        # Ensure participant_id column exists
        if "participant_id" not in df.columns:
            raise ValueError("participants.tsv must contain 'participant_id' column")

        return df

    def apply_session_rule(self, df: pd.DataFrame) -> pd.DataFrame:
        """Reduce the table to exactly one row per participant.

        The split unit is the participant, so leaving two sessions of the same
        person in the table would put that person in two folds. A table without a
        session column is already one row per participant and passes through.

        Args:
            df: Loaded participants table

        Returns:
            A table with one row per participant

        Raises:
            ValueError: If no session column exists and a session rule was asked
                for explicitly, or if a rule needs a column the table lacks
        """
        session_column = find_session_column(df)
        if session_column is None:
            if self.session_rule is SessionRule.FIRST and len(df) > 0:
                duplicates = df["participant_id"].duplicated().sum()
                if duplicates:
                    raise ValueError(
                        f"{duplicates} participant rows share an id but the table has "
                        "no session column, so no session rule can be applied"
                    )
            return df

        missing = self.session_rule.column()
        if missing is not None and missing not in df.columns:
            raise ValueError(
                f"session rule '{self.session_rule.value}' needs the column "
                f"'{missing}', which is not in the table; available columns: "
                f"{sorted(df.columns)}"
            )

        ranked = df.copy()
        ranked["_session_key"] = session_key(
            ranked, session_column, descending=self.session_rule is SessionRule.LAST
        )
        ranked["_rule_key"] = rule_key(ranked, self.session_rule)
        ranked = ranked.sort_values(["participant_id", "_rule_key", "_session_key"])
        selected = ranked.groupby("participant_id", as_index=False).head(1)
        return selected.drop(columns=["_session_key", "_rule_key"]).reset_index(drop=True)

    def filter_required_columns(
        self,
        df: pd.DataFrame,
        required_columns: list[str],
    ) -> pd.DataFrame:
        """Filter to participants who have all required columns."""
        # Drop rows with missing values in required columns
        filtered_df = df.dropna(subset=required_columns)

        return filtered_df

    def build(
        self,
        required_columns: list[str] | None = None,
    ) -> pd.DataFrame:
        """Build the cohort dataframe.
        
        Args:
            required_columns: List of columns that must be non-null for inclusion
        
        Returns:
            DataFrame with one row per participant
        """
        df = self.load_participants()

        # Apply session rule
        df = self.apply_session_rule(df)

        # Filter required columns if specified
        if required_columns:
            df = self.filter_required_columns(df, required_columns)

        self.cohort_df = df
        return df

    def get_cohort_size(self) -> int:
        """Get the size of the cohort."""
        if self.cohort_df is None:
            raise ValueError("Cohort not built yet. Call build() first.")
        return len(self.cohort_df)

    def get_participant_ids(self) -> list[str]:
        """Get list of participant IDs in the cohort."""
        if self.cohort_df is None:
            raise ValueError("Cohort not built yet. Call build() first.")
        return self.cohort_df["participant_id"].tolist()

    def save_cohort(self, output_path: str | Path) -> None:
        """Save cohort dataframe to file."""
        if self.cohort_df is None:
            raise ValueError("Cohort not built yet. Call build() first.")

        path = Path(output_path)
        path.parent.mkdir(parents=True, exist_ok=True)

        self.cohort_df.to_csv(path, sep="\t", index=False)


def create_cohort_from_tsv(
    participants_tsv: str,
    session_rule: str = "first",
    required_columns: list[str] | None = None,
) -> pd.DataFrame:
    """Convenience function to create a cohort from a TSV file.
    
    Args:
        participants_tsv: Path to participants.tsv
        session_rule: Session selection rule
        required_columns: Required columns for inclusion
    
    Returns:
        Cohort dataframe
    """
    builder = CohortBuilder(
        participants_tsv=participants_tsv,
        session_rule=SessionRule(session_rule),
    )

    return builder.build(required_columns=required_columns)
