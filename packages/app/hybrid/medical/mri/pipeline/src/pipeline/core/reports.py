"""Report generation in CSV and LaTeX formats."""

from pathlib import Path
from typing import Any

import pandas as pd

from pipeline.core.latex import to_latex_table

FORMATS = ("csv", "latex")


def _write(
    frame: pd.DataFrame,
    output_path: str,
    output_format: str,
    digits: int = 3,
    index: bool = False,
) -> None:
    """Write one table as CSV or as a LaTeX booktabs table."""
    if output_format not in FORMATS:
        raise ValueError(f"Unknown format: {output_format}")
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    if output_format == "csv":
        frame.to_csv(path, index=index)
        return
    headers = [str(column) for column in frame.columns]
    rows = [[value for value in row] for row in frame.itertuples(index=False, name=None)]
    path.write_text(to_latex_table(headers, rows, digits=digits) + "\n")


def _metrics_frame(results: dict[str, dict[str, Any]]) -> pd.DataFrame:
    """One row per model, one column per metric value and interval bound."""
    rows = []
    for model_name, metrics in results.items():
        row: dict[str, Any] = {"model": model_name}
        for metric_name, metric_data in metrics.items():
            if isinstance(metric_data, dict) and "value" in metric_data:
                row[metric_name] = metric_data["value"]
                row[f"{metric_name}_ci_lower"] = metric_data.get("ci_lower")
                row[f"{metric_name}_ci_upper"] = metric_data.get("ci_upper")
            else:
                row[metric_name] = metric_data
        rows.append(row)
    return pd.DataFrame(rows)


def create_metrics_table(
    results: dict[str, dict[str, Any]],
    output_path: str,
    format: str = "csv",
) -> None:
    """Create a metrics table from model results.

    Args:
        results: Model name to metric dictionary
        output_path: Where to write the table
        format: 'csv' or 'latex'
    """
    _write(_metrics_frame(results), output_path, format, digits=3)


def create_comparison_table(
    comparisons: list[dict[str, Any]],
    output_path: str,
    format: str = "csv",
) -> None:
    """Create a model comparison table.
    
    Args:
        comparisons: List of comparison dictionaries
        output_path: Path to save the table
        format: Output format ('csv' or 'latex')
    """
    _write(pd.DataFrame(comparisons), output_path, format, digits=4)


def create_significance_table(
    comparisons: list[dict[str, Any]],
    output_path: str,
    format: str = "csv",
    alpha: float = 0.05,
) -> None:
    """Create a significance table with asterisks for significance levels.
    
    Args:
        comparisons: List of comparison dictionaries
        output_path: Path to save the table
        format: Output format ('csv' or 'latex')
        alpha: Significance threshold
    """
    # Create a matrix of model comparisons
    model_names = set()
    for comp in comparisons:
        model_names.add(comp["model1"])
        model_names.add(comp["model2"])
    model_names = sorted(list(model_names))

    # Create matrix
    matrix = pd.DataFrame(index=model_names, columns=model_names, dtype=object)

    for comp in comparisons:
        model1 = comp["model1"]
        model2 = comp["model2"]
        p_value = comp.get("fdr_corrected_p", comp.get("corrected_p_value", 1.0))

        # Add significance asterisks
        if p_value < 0.001:
            sig = "***"
        elif p_value < 0.01:
            sig = "**"
        elif p_value < alpha:
            sig = "*"
        else:
            sig = ""

        matrix.loc[model1, model2] = f"{p_value:.4f}{sig}"

    # Fill diagonal
    for model in model_names:
        matrix.loc[model, model] = "-"

    _write(matrix, output_path, format, digits=4, index=True)


def create_calibration_table(
    calibration_results: dict[str, dict[str, Any]],
    output_path: str,
    format: str = "csv",
) -> None:
    """Create a calibration metrics table.
    
    Args:
        calibration_results: Dictionary mapping model names to calibration metrics
        output_path: Path to save the table
        format: Output format ('csv' or 'latex')
    """
    rows = []
    for model_name, cal_metrics in calibration_results.items():
        row = {
            "model": model_name,
            "brier_score": cal_metrics.get("brier_score", ""),
            "ece": cal_metrics.get("ece", ""),
        }
        rows.append(row)

    _write(pd.DataFrame(rows), output_path, format, digits=4)


def generate_all_reports(
    results: dict[str, dict[str, Any]],
    comparisons: list[dict[str, Any]],
    output_dir: str | Path,
) -> None:
    """Generate all report tables.
    
    Args:
        results: Model results dictionary
        comparisons: Model comparisons list
        output_dir: Directory to save reports
    """
    reports_dir = Path(output_dir)
    reports_dir.mkdir(parents=True, exist_ok=True)

    create_metrics_table(results, reports_dir / "metrics.csv")
    create_metrics_table(results, reports_dir / "metrics.tex", format="latex")
    create_comparison_table(comparisons, reports_dir / "comparisons.csv")
    create_comparison_table(comparisons, reports_dir / "comparisons.tex", format="latex")
    create_significance_table(comparisons, reports_dir / "significance.csv")
    create_significance_table(comparisons, reports_dir / "significance.tex", format="latex")

    calibration_results = _calibration_frame(results)
    if calibration_results:
        create_calibration_table(calibration_results, reports_dir / "calibration.csv")
        create_calibration_table(
            calibration_results, reports_dir / "calibration.tex", format="latex"
        )


def _calibration_frame(results: dict[str, dict[str, Any]]) -> dict[str, dict[str, Any]]:
    """Calibration metrics per model, skipping models that report none."""
    return {
        model: metrics["calibration"]
        for model, metrics in results.items()
        if isinstance(metrics.get("calibration"), dict)
    }
