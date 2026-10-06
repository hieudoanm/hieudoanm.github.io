"""Reading lesion masks out of a BIDS derivatives tree.

The baseline model is tabular, so the one imaging signal it can consume is a
per-participant scalar: the lesion volume. Masks are found by BIDS pattern, not
by a dataset-specific layout, so the same reader works for ARC and any other
BIDS tree that publishes a `*_desc-lesion_mask.nii.gz`. nibabel is an optional
extra, so it is imported only when a mask is actually measured.
"""

import importlib
from collections.abc import Sequence
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd

LESION_VOLUME_FEATURE = "lesion_volume_mm3"
_MASK_SUFFIX = "_desc-lesion_mask.nii.gz"


class ImagingError(RuntimeError):
    """The configured imaging inputs cannot be read."""


def find_lesion_masks(mask_root: Path) -> dict[str, Path]:
    """Map each participant to their lesion mask under `mask_root`.

    Args:
        mask_root: Root of the lesion-mask derivatives tree

    Returns:
        Participant label to mask path, one entry per participant

    Raises:
        ImagingError: If a participant has more than one mask, so which one to
            measure is a decision the pipeline must not make silently
    """
    masks: dict[str, Path] = {}
    for path in sorted(mask_root.glob(f"sub-*/**/*{_MASK_SUFFIX}")):
        participant = _participant_id(path)
        if participant in masks:
            raise ImagingError(
                f"more than one lesion mask for {participant}: "
                f"{masks[participant]} and {path}"
            )
        masks[participant] = path
    return masks


def build_lesion_table(
    mask_root: Path,
    participant_ids: Sequence[str],
) -> pd.DataFrame:
    """Measure the lesion volume of every participant that has a mask.

    Participants without a mask are absent from the result, so a later join
    leaves them missing and they drop out of the modelling cohort rather than
    being modelled as a zero-lesion.

    Args:
        mask_root: Root of the lesion-mask derivatives tree
        participant_ids: Participant labels to look up

    Returns:
        Columns `participant_id` and `lesion_volume_mm3`

    Raises:
        ImagingError: If a mask exists in the tree but its content is not
            fetched, or nibabel is not installed
    """
    masks = find_lesion_masks(mask_root)
    rows = [
        {
            "participant_id": participant,
            LESION_VOLUME_FEATURE: _measure(participant, masks[participant]),
        }
        for participant in participant_ids
        if participant in masks
    ]
    return pd.DataFrame(rows, columns=["participant_id", LESION_VOLUME_FEATURE])


def lesion_volume_mm3(mask_path: Path) -> float:
    """Total in-mask volume in cubic millimetres.

    Args:
        mask_path: Path to a NIfTI mask

    Returns:
        Voxel count times voxel volume, in mm^3
    """
    nibabel = _load_nibabel()
    image: Any = nibabel.load(str(mask_path))
    data = np.asarray(image.dataobj)
    sizes = np.asarray(image.header.get_zooms()[: data.ndim], dtype=float)
    return float(np.count_nonzero(data) * np.prod(sizes))


def _measure(participant: str, mask_path: Path) -> float:
    if not mask_path.is_file():
        raise ImagingError(
            f"lesion mask for {participant} is not available at {mask_path}; "
            "the dataset contents are not fetched (try `datalad get`)"
        )
    return lesion_volume_mm3(mask_path)


def _participant_id(mask_path: Path) -> str:
    for part in mask_path.parts:
        if part.startswith("sub-"):
            return part
    raise ImagingError(f"no participant label in mask path {mask_path}")


def _load_nibabel() -> Any:
    try:
        return importlib.import_module("nibabel")
    except ImportError as error:
        raise ImagingError(
            "reading lesion masks needs the imaging extra: install it with "
            "`uv sync --extra imaging`"
        ) from error
