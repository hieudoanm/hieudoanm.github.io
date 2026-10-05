"""Cohort builder for participant selection."""

import pandas as pd
from pathlib import Path
from typing import Dict, Any, Optional, List
from enum import Enum


class SessionRule(str, Enum):
    """Rules for selecting which session to use for a participant."""
    FIRST = "first"
    LAST = "last"
    WITH_WAB_AQ = "with_wab_aq"
    WITH_T1 = "with_t1"
    WITH_LESION = "with_lesion"


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
        self.cohort_df: Optional[pd.DataFrame] = None
    
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
        """Apply session selection rule to the dataframe.
        
        This is a placeholder - actual implementation depends on the dataset structure.
        For ARC, we need to check the actual session structure.
        """
        # Placeholder: for now, just return the dataframe as-is
        # In a real implementation, this would:
        # 1. Load session information from BIDS structure
        # 2. Apply the session rule to select one session per participant
        # 3. Filter to participants that have the required data
        
        return df
    
    def filter_required_columns(
        self,
        df: pd.DataFrame,
        required_columns: List[str],
    ) -> pd.DataFrame:
        """Filter to participants who have all required columns."""
        # Drop rows with missing values in required columns
        filtered_df = df.dropna(subset=required_columns)
        
        return filtered_df
    
    def build(
        self,
        required_columns: Optional[List[str]] = None,
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
    
    def get_participant_ids(self) -> List[str]:
        """Get list of participant IDs in the cohort."""
        if self.cohort_df is None:
            raise ValueError("Cohort not built yet. Call build() first.")
        return self.cohort_df["participant_id"].tolist()
    
    def save_cohort(self, output_path: str) -> None:
        """Save cohort dataframe to file."""
        if self.cohort_df is None:
            raise ValueError("Cohort not built yet. Call build() first.")
        
        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        self.cohort_df.to_csv(output_path, sep="\t", index=False)


def create_cohort_from_tsv(
    participants_tsv: str,
    session_rule: str = "first",
    required_columns: Optional[List[str]] = None,
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
