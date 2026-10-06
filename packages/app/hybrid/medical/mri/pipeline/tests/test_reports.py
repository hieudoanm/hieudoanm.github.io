"""Tests for the report tables written to CSV and LaTeX."""

from pathlib import Path

import numpy as np
import pandas as pd
import pytest

from pipeline.core.reports import (
    create_calibration_table,
    create_comparison_table,
    create_metrics_table,
    create_significance_table,
    generate_all_reports,
)

RESULTS = {
    "logreg": {
        "accuracy": {"value": 0.62, "ci_lower": 0.50, "ci_upper": 0.73},
        "calibration": {"brier_score": 0.24, "ece": 0.11},
    },
    "boost": {
        "accuracy": {"value": 0.66, "ci_lower": 0.54, "ci_upper": 0.77},
        "calibration": {"brier_score": 0.22, "ece": 0.09},
    },
}

COMPARISONS = [
    {"model1": "boost", "model2": "logreg", "corrected_p_value": 0.0004, "mean_diff": 0.04},
    {"model1": "boost", "model2": "rf", "corrected_p_value": 0.021, "mean_diff": 0.01},
    {"model1": "logreg", "model2": "rf", "corrected_p_value": 0.31, "mean_diff": -0.01},
]


def test_metrics_table_flattens_values_and_intervals(tmp_path: Path):
    path = tmp_path / "metrics.csv"

    create_metrics_table(RESULTS, str(path))

    frame = pd.read_csv(path)
    assert list(frame["model"]) == ["logreg", "boost"]
    assert frame.loc[0, "accuracy"] == pytest.approx(0.62)
    assert frame.loc[0, "accuracy_ci_lower"] == pytest.approx(0.50)
    assert frame.loc[0, "accuracy_ci_upper"] == pytest.approx(0.73)


def test_metrics_table_writes_latex_with_three_decimals(tmp_path: Path):
    path = tmp_path / "metrics.tex"

    create_metrics_table(RESULTS, str(path), format="latex")

    text = path.read_text()
    assert text.startswith("\\begin{tabular}")
    assert "0.620" in text
    assert text.rstrip().endswith("\\end{tabular}")


def test_metrics_table_rejects_an_unknown_format(tmp_path: Path):
    with pytest.raises(ValueError, match="Unknown format"):
        create_metrics_table(RESULTS, str(tmp_path / "metrics.txt"), format="docx")


def test_comparison_table_keeps_every_column(tmp_path: Path):
    path = tmp_path / "comparisons.csv"

    create_comparison_table(COMPARISONS, str(path))

    frame = pd.read_csv(path)
    assert len(frame) == 3
    assert frame.loc[0, "corrected_p_value"] == pytest.approx(0.0004)


def test_significance_table_marks_thresholds_and_fills_the_diagonal(tmp_path: Path):
    path = tmp_path / "significance.csv"

    create_significance_table(COMPARISONS, str(path))

    frame = pd.read_csv(path, index_col=0)
    assert frame.loc["boost", "logreg"].endswith("***")
    assert frame.loc["boost", "rf"].endswith("*")
    assert frame.loc["logreg", "rf"].endswith("0.3100")
    assert (frame.values[np.diag_indices(len(frame))] == "-").all()


def test_significance_table_uses_the_fdr_column_when_present(tmp_path: Path):
    comparisons = [
        {"model1": "a", "model2": "b", "corrected_p_value": 0.5, "fdr_corrected_p": 0.0004}
    ]
    path = tmp_path / "significance.csv"

    create_significance_table(comparisons, str(path))

    frame = pd.read_csv(path, index_col=0)
    assert frame.loc["a", "b"].endswith("***")


def test_significance_markers_use_strict_thresholds(tmp_path: Path):
    # 0.001 is not strictly below 0.001, so it earns two stars rather than three.
    comparisons = [
        {"model1": "a", "model2": "b", "corrected_p_value": 0.001},
        {"model1": "a", "model2": "c", "corrected_p_value": 0.05},
    ]
    path = tmp_path / "significance.csv"

    create_significance_table(comparisons, str(path), alpha=0.05)

    frame = pd.read_csv(path, index_col=0)
    assert frame.loc["a", "b"].endswith("**")
    assert frame.loc["a", "c"] == "0.0500"


def test_calibration_table_lists_brier_and_ece(tmp_path: Path):
    path = tmp_path / "calibration.csv"

    create_calibration_table(
        {name: metrics["calibration"] for name, metrics in RESULTS.items()},
        str(path),
    )

    frame = pd.read_csv(path)
    assert frame.loc[0, "brier_score"] == pytest.approx(0.24)
    assert frame.loc[1, "ece"] == pytest.approx(0.09)


def test_generate_all_reports_writes_every_table(tmp_path: Path):
    generate_all_reports(RESULTS, COMPARISONS, str(tmp_path))

    written = {path.name for path in tmp_path.iterdir()}
    assert written == {
        "metrics.csv",
        "metrics.tex",
        "comparisons.csv",
        "comparisons.tex",
        "significance.csv",
        "significance.tex",
        "calibration.csv",
        "calibration.tex",
    }


def test_generate_all_reports_skips_calibration_when_no_model_provided_it(tmp_path: Path):
    without_calibration = {"logreg": {"accuracy": {"value": 0.6, "ci_lower": 0.5, "ci_upper": 0.7}}}

    generate_all_reports(without_calibration, [], str(tmp_path))

    assert not (tmp_path / "calibration.csv").exists()
    assert (tmp_path / "metrics.csv").exists()


def test_generate_all_reports_creates_a_missing_directory(tmp_path: Path):
    target = tmp_path / "nested" / "reports"

    generate_all_reports(RESULTS, COMPARISONS, str(target))

    assert (target / "metrics.csv").exists()

def test_latex_tables_escape_model_names_that_contain_underscores(tmp_path: Path):
    path = tmp_path / "metrics.tex"

    create_metrics_table(
        {"resnet18_hybrid": {"accuracy": {"value": 0.71}}}, str(path), format="latex"
    )

    text = path.read_text()
    assert r"resnet18\_hybrid" in text
    assert "resnet18_hybrid" not in text


def test_latex_tables_mark_missing_intervals_instead_of_printing_nan(tmp_path: Path):
    path = tmp_path / "metrics.tex"

    create_metrics_table({"boost": {"accuracy": {"value": 0.66}}}, str(path), format="latex")

    text = path.read_text()
    assert "--" in text
    assert "nan" not in text.lower()
