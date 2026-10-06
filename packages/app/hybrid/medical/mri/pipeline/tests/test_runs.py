"""Tests for run folder and manifest management."""

from pathlib import Path

from pipeline.core import (
    create_manifest,
    create_run_folder,
    generate_run_id,
    list_runs,
    load_manifest,
    save_config,
)


def test_generate_run_id():
    """Test that run IDs are generated correctly."""
    run_id = generate_run_id()
    assert run_id.startswith("r_")
    assert len(run_id) > 10  # Should have timestamp


def test_create_run_folder(tmp_path: Path):
    """Test that run folder is created correctly."""
    run_path = create_run_folder(str(tmp_path))
    assert run_path.exists()
    assert run_path.is_dir()


def test_create_manifest(tmp_path: Path):
    """Test that manifest is created and saved correctly."""
    run_path = create_run_folder(str(tmp_path))
    config = {"split": {"seed": 42}, "run": {"device": "cpu"}}

    manifest = create_manifest(run_path, config)

    assert "schema_version" in manifest
    assert "start_time" in manifest
    assert manifest["seeds"] == 42
    assert manifest["device"] == "cpu"

    # Check that manifest file exists
    manifest_path = run_path / "manifest.json"
    assert manifest_path.exists()

    # Check that manifest can be loaded
    loaded_manifest = load_manifest(run_path)
    assert loaded_manifest["schema_version"] == manifest["schema_version"]


def test_save_config(tmp_path: Path):
    """Test that config is saved correctly."""
    run_path = create_run_folder(str(tmp_path))
    config = {"split": {"seed": 42}, "run": {"device": "cpu"}}

    save_config(run_path, config)

    # Check that config file exists
    config_path = run_path / "config.yaml"
    assert config_path.exists()


def test_list_runs(tmp_path: Path):
    """Test that runs are listed correctly."""
    import time

    # Create multiple runs with delay to ensure unique timestamps
    run1 = create_run_folder(str(tmp_path))
    time.sleep(0.001)  # Small delay for unique timestamp
    run2 = create_run_folder(str(tmp_path))

    config = {"split": {"seed": 42}}
    create_manifest(run1, config)
    create_manifest(run2, config)

    runs = list_runs(str(tmp_path))

    assert len(runs) == 2
    assert all("run_id" in run for run in runs)
    assert all("manifest" in run for run in runs)
