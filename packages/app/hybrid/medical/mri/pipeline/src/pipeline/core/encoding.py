"""Turning the feature block into numbers a model can consume.

Split out of `dataset.py`, which reads and validates the cohort table.
"""

import pandas as pd

from pipeline.core.dataset import CohortError


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
