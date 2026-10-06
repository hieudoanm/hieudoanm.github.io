"""Tests for locating and measuring lesion masks in a BIDS derivatives tree."""

from pathlib import Path
from types import SimpleNamespace
from typing import Any

import nibabel as nib
import numpy as np
import pandas as pd
import pytest

from pipeline.core import imaging
from pipeline.core.events import EventWriter
from pipeline.core.imaging import (
    ImagingError,
    build_lesion_table,
    find_lesion_masks,
    lesion_volume_mm3,
)
from pipeline.core.stages_data import stage_data


def _write_participants(path: Path, size: int = 60) -> Path:
    rng = np.random.default_rng(7)
    frame = pd.DataFrame({
        "participant_id": [f"sub-{index:03d}" for index in range(size)],
        "age_at_stroke": rng.normal(65, 9, size).round(1),
        "sex": rng.choice(["M", "F"], size),
        "wab_days": rng.uniform(3, 90, size).round(1),
        "wab_aq": np.clip(rng.normal(50, 20, size), 5, 99).round(1),
    })
    path.parent.mkdir(parents=True, exist_ok=True)
    frame.to_csv(path, sep="\t", index=False)
    return path


def _write_mask(
    root: Path,
    participant: str,
    session: str = "ses-1",
    zooms: tuple[float, float, float] = (2.0, 2.0, 3.0),
) -> Path:
    data = np.zeros((4, 4, 4), dtype=np.uint8)
    data[:2, :, :] = 1
    image = nib.Nifti1Image(data, affine=np.eye(4))
    image.header.set_zooms(zooms)
    name = f"{participant}_{session}_desc-lesion_mask.nii.gz"
    path = root / participant / session / "anat" / name
    path.parent.mkdir(parents=True, exist_ok=True)
    nib.save(image, str(path))
    return path


def test_find_lesion_masks_maps_each_participant(tmp_path: Path):
    _write_mask(tmp_path, "sub-001")
    _write_mask(tmp_path, "sub-002")

    masks = find_lesion_masks(tmp_path)

    assert set(masks) == {"sub-001", "sub-002"}


def test_find_lesion_masks_refuses_two_masks_for_one_participant(tmp_path: Path):
    _write_mask(tmp_path, "sub-001", session="ses-1")
    _write_mask(tmp_path, "sub-001", session="ses-2")

    with pytest.raises(ImagingError, match="more than one lesion mask"):
        find_lesion_masks(tmp_path)


def test_lesion_volume_multiplies_voxels_by_voxel_size(tmp_path: Path):
    path = _write_mask(tmp_path, "sub-001", zooms=(2.0, 2.0, 3.0))

    assert lesion_volume_mm3(path) == pytest.approx(32 * 12.0)


def test_build_lesion_table_skips_participants_without_a_mask(tmp_path: Path):
    _write_mask(tmp_path, "sub-001")

    table = build_lesion_table(tmp_path, ["sub-001", "sub-002"])

    assert table["participant_id"].tolist() == ["sub-001"]
    assert table["lesion_volume_mm3"].tolist() == pytest.approx([384.0])


def test_build_lesion_table_names_an_unfetched_mask(tmp_path: Path):
    mask = _write_mask(tmp_path, "sub-001")
    mask.unlink()
    mask.symlink_to("/nonexistent/annex/object.nii.gz")

    with pytest.raises(ImagingError, match="not available"):
        build_lesion_table(tmp_path, ["sub-001"])


def test_lesion_volume_reports_a_missing_imaging_extra(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    path = _write_mask(tmp_path, "sub-001")

    def fake_import_module(name: str) -> object:
        raise ImportError(f"no {name}")

    monkeypatch.setattr(
        imaging, "importlib", SimpleNamespace(import_module=fake_import_module)
    )

    with pytest.raises(ImagingError, match="imaging extra"):
        lesion_volume_mm3(path)


def _imaging_config(participants: Path, masks: Path, features: list[str]) -> dict[str, Any]:
    return {
        "data": {
            "participants_tsv": str(participants),
            "lesion_mask_path": str(masks),
            "outcome_column": "wab_aq",
            "outcome_threshold": 50.0,
            "features": features,
        }
    }


def test_stage_data_joins_measured_lesion_volume(tmp_path: Path):
    participants = _write_participants(tmp_path / "participants.tsv")
    masks = tmp_path / "masks"
    for index in range(30):
        _write_mask(masks, f"sub-{index:03d}")
    run_path = tmp_path / "run"
    run_path.mkdir()
    config = _imaging_config(
        participants, masks, ["age_at_stroke", "sex", "wab_days", "lesion_volume_mm3"]
    )
    summary: dict[str, Any] = {}

    frame, features = stage_data(config, EventWriter(run_path), summary)

    assert "lesion_volume_mm3" in features.columns
    assert len(frame) == 30
    assert summary["imaging"]["n_masks"] == 30


def test_stage_data_refuses_an_unused_mask_configuration(tmp_path: Path):
    participants = _write_participants(tmp_path / "participants.tsv")
    config = _imaging_config(
        participants, tmp_path / "masks", ["age_at_stroke", "wab_days"]
    )

    with pytest.raises(ValueError, match="lesion_volume_mm3"):
        stage_data(config, EventWriter(tmp_path), {})


def test_stage_data_expands_the_arc_data_path(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    root = tmp_path / "ds004884"
    _write_participants(root / "participants.tsv")
    for index in range(60):
        _write_mask(root / "derivatives" / "lesion_masks", f"sub-{index:03d}")
    monkeypatch.setenv("ARC_DATA_PATH", str(root))
    run_path = tmp_path / "run"
    run_path.mkdir()
    config: dict[str, Any] = {
        "data": {
            "participants_tsv": "${ARC_DATA_PATH}/participants.tsv",
            "lesion_mask_path": "${ARC_DATA_PATH}/derivatives/lesion_masks",
            "outcome_column": "wab_aq",
            "outcome_threshold": 50.0,
            "features": ["age_at_stroke", "sex", "wab_days", "lesion_volume_mm3"],
        }
    }

    frame, features = stage_data(config, EventWriter(run_path), {})

    assert len(frame) == 60
    assert "lesion_volume_mm3" in features.columns
