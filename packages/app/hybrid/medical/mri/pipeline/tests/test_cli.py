"""Tests for the whole `pipeline` command surface.

Every command `pipeline --help` lists is invoked once through the typer runner:
the six that do real work are checked for their reported output, and the eight
stubs are checked for the refusal exit code so a no-op can never look like a run.
"""

import json
from pathlib import Path
from typing import Any

import yaml
from typer.testing import CliRunner

from pipeline.cli import app
from pipeline.core.runner import run_experiment
from tests.conftest import make_config

runner = CliRunner()

STUBS = ("split", "preprocess", "images", "baseline", "train", "evaluate", "report", "serve")


def _write_config(path: Path, config: dict[str, Any]) -> Path:
    path.write_text(yaml.safe_dump(config))
    return path


def _make_run(participants: Path, runs: Path, run_id: str) -> Path:
    summary = run_experiment(
        make_config(participants), output_dir=str(runs), run_id=run_id
    )
    return Path(summary["path"])


def test_doctor_reports_python_and_devices():
    result = runner.invoke(app, ["doctor"])

    assert result.exit_code == 0
    assert "Python version:" in result.output
    assert "Recommended device:" in result.output
    assert "dependencies" in result.output.lower()


def test_doctor_verbose_dumps_full_system_info():
    result = runner.invoke(app, ["doctor", "--verbose"])

    assert result.exit_code == 0
    assert "Full system info:" in result.output


def test_export_schemas_writes_every_schema(tmp_path: Path):
    output = tmp_path / "schemas"

    result = runner.invoke(app, ["export-schemas", "--output-dir", str(output)])

    assert result.exit_code == 0
    for name in (
        "config_schema.json",
        "data_config_schema.json",
        "model_config_schema.json",
        "split_config_schema.json",
        "run_config_schema.json",
    ):
        assert (output / name).is_file(), name


def test_list_runs_reports_an_empty_directory(tmp_path: Path):
    result = runner.invoke(app, ["list-runs", "--output-dir", str(tmp_path / "none")])

    assert result.exit_code == 0
    assert "No runs found." in result.output


def test_list_runs_reports_a_finished_run(workspace: tuple[Path, Path]):
    participants, runs = workspace
    _make_run(participants, runs, "r_listed")

    result = runner.invoke(app, ["list-runs", "--output-dir", str(runs)])

    assert result.exit_code == 0
    assert "r_listed" in result.output


def test_data_cohort_writes_a_runnable_table(tmp_path: Path):
    table = tmp_path / "participants.tsv"

    result = runner.invoke(
        app, ["data", "cohort", "--participants", str(table), "--n", "40"]
    )

    assert result.exit_code == 0
    assert f"to {table}" in result.output
    assert table.is_file()


def test_data_check_reports_a_valid_table(tmp_path: Path):
    table = tmp_path / "participants.tsv"
    runner.invoke(app, ["data", "cohort", "--participants", str(table), "--n", "40"])

    result = runner.invoke(app, ["data", "check", "--participants", str(table)])

    assert result.exit_code == 0
    assert "Participants: 40" in result.output


def test_data_check_fails_on_a_missing_table(tmp_path: Path):
    result = runner.invoke(
        app, ["data", "check", "--participants", str(tmp_path / "absent.tsv")]
    )

    assert result.exit_code == 1
    assert "Cohort check failed" in result.output


def test_data_fetch_refuses_without_arc_access():
    result = runner.invoke(app, ["data", "fetch"])

    assert result.exit_code == 2
    assert "ARC dataset" in result.output


def test_data_reports_an_unknown_action():
    result = runner.invoke(app, ["data", "explode"])

    assert result.exit_code == 2
    assert "Unknown action: explode" in result.output


def test_run_executes_a_valid_config(workspace: tuple[Path, Path], tmp_path: Path):
    participants, _ = workspace
    config = _write_config(tmp_path / "config.yaml", make_config(participants))
    output = tmp_path / "runs"

    result = runner.invoke(
        app, ["run", "--config", str(config), "--output-dir", str(output), "--run-id", "r_cli"]
    )

    assert result.exit_code == 0
    summary = json.loads(result.output)
    assert summary["run_id"] == "r_cli"
    assert (output / "r_cli" / "manifest.json").is_file()


def test_run_rejects_a_missing_config_file(tmp_path: Path):
    result = runner.invoke(app, ["run", "--config", str(tmp_path / "absent.yaml")])

    assert result.exit_code == 2
    assert "Configuration error" in result.output


def test_run_reports_a_failure_as_exit_one(tmp_path: Path):
    path = _write_config(tmp_path / "config.yaml", make_config(Path("/nonexistent.tsv")))

    result = runner.invoke(app, ["run", "--config", str(path)])

    assert result.exit_code == 1
    assert "Run failed:" in result.output


def test_main_prints_help():
    result = runner.invoke(app, ["--help"])

    assert result.exit_code == 0
    assert "MRI Pipeline" in result.output


def test_every_stub_refuses_instead_of_pretending_to_run():
    for command in STUBS:
        result = runner.invoke(app, [command])
        assert result.exit_code == 2, command
        assert "not implemented" in result.output or "Not available" in result.output, command


def test_compare_refuses_a_single_run(workspace: tuple[Path, Path]):
    participants, runs = workspace
    run_path = _make_run(participants, runs, "r_cli_single")

    result = runner.invoke(app, ["compare", str(run_path)])

    assert result.exit_code == 2
    assert "at least two" in result.output


def test_calibrate_reports_the_sweep(tmp_path: Path):
    output = tmp_path / "calibration"

    result = runner.invoke(
        app,
        ["calibrate", "--n-simulations", "25", "--output-dir", str(output)],
    )

    assert result.exit_code == 0
    assert "Best df scaling:" in result.output
    assert "Data fingerprint:" in result.output
    assert (output / "calibration.json").is_file()
