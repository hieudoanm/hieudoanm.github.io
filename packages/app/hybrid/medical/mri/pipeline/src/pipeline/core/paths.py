"""Resolving the filesystem paths a config carries.

A committed config cannot hold a machine-specific path, so `configs/full.yaml`
names its dataset through an environment variable (`${ARC_DATA_PATH}`). The rule
here is strict: an unresolved variable is an error, never a path literally named
`$ARC_DATA_PATH` that fails later with a confusing message.
"""

import os
from pathlib import Path

_VARIABLE_PREFIX = "$"


def expand_path(raw: str) -> Path:
    """Expand `~` and `$VAR`/`${VAR}` in a configured path.

    Args:
        raw: A path straight out of the configuration

    Returns:
        The path with the user directory and environment variables resolved

    Raises:
        ValueError: If the path names an environment variable that is not set
    """
    expanded = os.path.expanduser(os.path.expandvars(raw))
    if _VARIABLE_PREFIX in expanded:
        raise ValueError(
            f"unresolved environment variable in path {raw!r}; "
            "set it (for the ARC dataset, export ARC_DATA_PATH) before running"
        )
    return Path(expanded)
