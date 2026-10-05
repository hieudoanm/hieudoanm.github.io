"""Report generation in CSV and LaTeX formats."""

import pandas as pd
from typing import Dict, Any, List, Optional
from pathlib import Path


def create_metrics_table(
    results: Dict[str, Dict[str, Any]],
    output_path: str,
    format: str = "csv",
) -> None:
    """Create a metrics table from model results.
    
    Args:
        results: Dictionary mapping model names to metric dictionaries
        output_path: Path to save the table
        format: Output format ('csv' or 'latex')
    """
    # Flatten results into a dataframe
    rows = []
    for model_name, metrics in results.items():
        row = {"model": model_name}
        for metric_name, metric_data in metrics.items():
            if isinstance(metric_data, dict) and "value" in metric_data:
                row[metric_name] = metric_data["value"]
                row[f"{metric_name}_ci_lower"] = metric_data.get("ci_lower", "")
                row[f"{metric_name}_ci_upper"] = metric_data.get("ci_upper", "")
            else:
                row[metric_name] = metric_data
        rows.append(row)
    
    df = pd.DataFrame(rows)
    
    if format == "csv":
        df.to_csv(output_path, index=False)
    elif format == "latex":
        latex_table = df.to_latex(index=False, float_format="%.3f")
        with open(output_path, "w") as f:
            f.write(latex_table)
    else:
        raise ValueError(f"Unknown format: {format}")


def create_comparison_table(
    comparisons: List[Dict[str, Any]],
    output_path: str,
    format: str = "csv",
) -> None:
    """Create a model comparison table.
    
    Args:
        comparisons: List of comparison dictionaries
        output_path: Path to save the table
        format: Output format ('csv' or 'latex')
    """
    df = pd.DataFrame(comparisons)
    
    if format == "csv":
        df.to_csv(output_path, index=False)
    elif format == "latex":
        latex_table = df.to_latex(index=False, float_format="%.4f")
        with open(output_path, "w") as f:
            f.write(latex_table)
    else:
        raise ValueError(f"Unknown format: {format}")


def create_significance_table(
    comparisons: List[Dict[str, Any]],
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
    
    if format == "csv":
        matrix.to_csv(output_path)
    elif format == "latex":
        latex_table = matrix.to_latex()
        with open(output_path, "w") as f:
            f.write(latex_table)
    else:
        raise ValueError(f"Unknown format: {format}")


def create_calibration_table(
    calibration_results: Dict[str, Dict[str, Any]],
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
    
    df = pd.DataFrame(rows)
    
    if format == "csv":
        df.to_csv(output_path, index=False)
    elif format == "latex":
        latex_table = df.to_latex(index=False, float_format="%.4f")
        with open(output_path, "w") as f:
            f.write(latex_table)
    else:
        raise ValueError(f"Unknown format: {format}")


def generate_all_reports(
    results: Dict[str, Dict[str, Any]],
    comparisons: List[Dict[str, Any]],
    output_dir: str,
) -> None:
    """Generate all report tables.
    
    Args:
        results: Model results dictionary
        comparisons: Model comparisons list
        output_dir: Directory to save reports
    """
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Metrics table
    create_metrics_table(
        results,
        output_dir / "metrics.csv",
        format="csv",
    )
    create_metrics_table(
        results,
        output_dir / "metrics.tex",
        format="latex",
    )
    
    # Comparison table
    create_comparison_table(
        comparisons,
        output_dir / "comparisons.csv",
        format="csv",
    )
    create_comparison_table(
        comparisons,
        output_dir / "comparisons.tex",
        format="latex",
    )
    
    # Significance table
    create_significance_table(
        comparisons,
        output_dir / "significance.csv",
        format="csv",
    )
    create_significance_table(
        comparisons,
        output_dir / "significance.tex",
        format="latex",
    )
    
    # Calibration table (if available)
    calibration_results = {
        model: metrics.get("calibration", {})
        for model, metrics in results.items()
        if "calibration" in metrics
    }
    
    if calibration_results:
        create_calibration_table(
            calibration_results,
            output_dir / "calibration.csv",
            format="csv",
        )
        create_calibration_table(
            calibration_results,
            output_dir / "calibration.tex",
            format="latex",
        )
