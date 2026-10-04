"""Which session of a participant belongs in the cohort.

Split out of `cohort.py`, which loads the participants table and applies these
rules to it. The rules themselves only describe ordering: they turn a session
label or the presence of a measurement into a sort key.
"""

from enum import Enum

import numpy as np
import pandas as pd


class SessionRule(str, Enum):
    """Rules for selecting which session to use for a participant."""
    FIRST = "first"
    LAST = "last"
    WITH_WAB_AQ = "with_wab_aq"
    WITH_T1 = "with_t1"
    WITH_LESION = "with_lesion"

    def column(self) -> str | None:
        """The column this rule needs, or None when it only needs a session label."""
        return {
            SessionRule.WITH_WAB_AQ: "wab_aq",
            SessionRule.WITH_T1: "t1_path",
            SessionRule.WITH_LESION: "lesion_mask_path",
        }.get(self)

    @property
    def prefers_measured(self) -> bool:
        """Whether this rule prefers the session that has the measurement."""
        return self.column() is not None


SESSION_COLUMNS = ("session_id", "session", "session_label")


def find_session_column(df: pd.DataFrame) -> str | None:
    for candidate in SESSION_COLUMNS:
        if candidate in df.columns:
            return candidate
    return None


def session_key(
    df: pd.DataFrame,
    session_column: str,
    descending: bool = False,
) -> pd.Series:
    """Sort key for a session label such as `ses-1` or `1`, with unknowns last.

    Negating the number reverses the order for the `last` rule, so both rules can
    share one ascending sort.
    """
    label = df[session_column].astype("string").str.extract(r"(\d+)", expand=False)
    numbers = np.asarray(pd.to_numeric(label, errors="coerce"), dtype=float)
    numbers = np.where(np.isnan(numbers), np.inf, numbers)
    if descending:
        numbers = -numbers
    return pd.Series(numbers, index=df.index, dtype=float)


def rule_key(df: pd.DataFrame, rule: SessionRule) -> pd.Series:
    """Sort key that puts the session the rule wants first."""
    if not rule.prefers_measured:
        return pd.Series(0.0, index=df.index)
    column = rule.column()
    measured = df[column].notna() & (df[column].astype("string") != "")
    return (~measured).astype(float)
