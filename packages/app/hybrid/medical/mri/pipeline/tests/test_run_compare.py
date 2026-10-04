"""Tests for comparing two runs that share a split.

The units are run folders: build two real runs with `run_experiment`, then check
that `pipeline compare` pairs their folds, refuses a mismatched split, and writes
the tables and JSON the workbench and the dissertation read.
"""

import json
from pathlib import Path

import pytest
from typer.testing import CliRunner

from pipeline.cli import app
from pipeline.core.run_compare import (
    compare_runs,
    load_run_scores,
    read_split,
    write_comparison,
)
from pipeline.core.runner import run_experiment
from tests.conftest import make_config


def _make_run(participants: Path, runs: Path, model_type: str, run_id: str) -> Path:
    summary = run_experiment(
        make_config(participants, model_type),
        output_dir=str(runs),
        run_id=run_id,
    )
    return Path(summary["path"])


def test_load_run_scores_reads_one_value_per_fold_in_order(workspace: tuple[Path, Path]):
    participants, runs = workspace
    run_path = _make_run(participants, runs, "logistic_regression", "r_scores")

    scores = load_run_scores(run_path, "balanced_accuracy")

    assert scores.shape == (3,)
    assert all(0.0 <= value <= 1.0 for value in scores)


def test_load_run_scores_refuses_a_folder_without_metrics(workspace: tuple[Path, Path]):
    _, runs = workspace
    empty = Path(runs) / "r_empty"
    empty.mkdir(parents=True)

    with pytest.raises(ValueError, match="no metrics.json"):
        load_run_scores(empty, "balanced_accuracy")


def test_load_run_scores_refuses_an_unknown_metric(workspace: tuple[Path, Path]):
    participants, runs = workspace
    run_path = _make_run(participants, runs, "logistic_regression", "r_metric")

    with pytest.raises(ValueError, match="no per-fold 'not_a_metric'"):
        load_run_scores(run_path, "not_a_metric")


def test_compare_runs_needs_at_least_two(workspace: tuple[Path, Path]):
    participants, runs = workspace
    run_path = _make_run(participants, runs, "logistic_regression", "r_one")

    with pytest.raises(ValueError, match="at least two"):
        compare_runs([run_path])


def test_compare_runs_pairs_two_models_on_the_same_split(workspace: tuple[Path, Path]):
    participants, runs = workspace
    logistic = _make_run(participants, runs, "logistic_regression", "r_log")
    boosting = _make_run(participants, runs, "gradient_boosting", "r_boost")

    result = compare_runs([logistic, boosting], metric="balanced_accuracy")

    assert result["metric"] == "balanced_accuracy"
    assert result["n_models"] == 2
    assert result["n_comparisons"] == 1
    comparison = result["comparisons"][0]
    assert {comparison["model1"], comparison["model2"]} == {
        "logistic_regression",
        "gradient_boosting",
    }
    assert 0.0 <= comparison["fdr_corrected_p"] <= 1.0
    assert isinstance(comparison["fdr_rejected"], bool)


def test_compare_runs_refuses_a_mismatched_split(workspace: tuple[Path, Path]):
    participants, runs = workspace
    first = _make_run(participants, runs, "logistic_regression", "r_split_a")

    different = make_config(participants, "gradient_boosting")
    different["split"]["seed"] = 7
    summary = run_experiment(different, output_dir=str(runs), run_id="r_split_b")

    with pytest.raises(ValueError, match="not split identically"):
        compare_runs([first, Path(summary["path"])])


def test_read_split_refuses_a_folder_without_a_split(workspace: tuple[Path, Path]):
    _, runs = workspace
    empty = Path(runs) / "r_nosplit"
    empty.mkdir(parents=True)

    with pytest.raises(ValueError, match="no splits/split.json"):
        read_split(empty)


def test_write_comparison_writes_the_tables_and_json(workspace: tuple[Path, Path], tmp_path: Path):
    participants, runs = workspace
    logistic = _make_run(participants, runs, "logistic_regression", "r_out_log")
    boosting = _make_run(participants, runs, "gradient_boosting", "r_out_boost")
    result = compare_runs([logistic, boosting])

    output = write_comparison(result, tmp_path / "comparison")

    for name in (
        "comparisons.csv",
        "comparisons.tex",
        "significance.csv",
        "significance.tex",
        "comparison.json",
    ):
        assert (output / name).is_file(), name
    document = json.loads((output / "comparison.json").read_text())
    assert document["metric"] == "balanced_accuracy"
    assert document["n_comparisons"] == 1


def test_cli_compare_needs_two_runs(workspace: tuple[Path, Path]):
    participants, runs = workspace
    run_path = _make_run(participants, runs, "logistic_regression", "r_cli_one")

    result = CliRunner().invoke(app, ["compare", str(run_path)])

    assert result.exit_code == 2
    assert "at least two" in result.output


def test_cli_compare_writes_tables_for_two_runs(workspace: tuple[Path, Path], tmp_path: Path):
    participants, runs = workspace
    logistic = _make_run(participants, runs, "logistic_regression", "r_cli_log")
    boosting = _make_run(participants, runs, "gradient_boosting", "r_cli_boost")
    output = tmp_path / "cli_out"

    result = CliRunner().invoke(
        app, ["compare", str(logistic), str(boosting), "--output-dir", str(output)]
    )

    assert result.exit_code == 0
    assert "vs" in result.output
    assert (output / "comparison.json").is_file()
