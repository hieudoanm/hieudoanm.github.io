"""Comparing the folds of two or more run folders.

`comparison.py` holds the statistics; this module reads run folders and hands
`compare_models` the paired per-fold scores it expects. The folds must be the
same participants in the same order or the paired test would compare unrelated
samples, so the saved splits are checked before any p-value is computed.
"""

import json
from pathlib import Path
from typing import Any

import numpy as np

from pipeline.core.comparison import compare_models
from pipeline.core.reports import create_comparison_table, create_significance_table


def load_run_scores(run_path: Path, metric: str) -> np.ndarray:
    """Per-fold values of one metric, ordered by fold, from a run's metrics.json.

    Args:
        run_path: A completed run folder
        metric: Metric name to collect, e.g. `balanced_accuracy`

    Returns:
        One score per fold, in fold order

    Raises:
        ValueError: If the folder has no metrics.json, no folds, or no fold
            reports the requested metric
    """
    metrics_path = run_path / "metrics.json"
    if not metrics_path.is_file():
        raise ValueError(f"{run_path} has no metrics.json; it is not a completed run")

    folds: list[dict[str, Any]] = json.loads(metrics_path.read_text()).get("folds") or []
    scores = [
        row["value"]
        for fold in sorted(folds, key=_fold_index)
        for row in fold.get("metrics", [])
        if row.get("name") == metric and isinstance(row.get("value"), (int, float))
    ]
    if not scores:
        raise ValueError(f"{run_path} reports no per-fold '{metric}' score")
    return np.asarray(scores, dtype=float)


def read_split(run_path: Path) -> dict[str, Any]:
    """The saved split `run_path` was built on.

    Raises:
        ValueError: If the folder has no splits/split.json
    """
    split_path = run_path / "splits" / "split.json"
    if not split_path.is_file():
        raise ValueError(f"{run_path} has no splits/split.json; it is not a completed run")
    return json.loads(split_path.read_text())


def compare_runs(
    run_paths: list[Path],
    metric: str = "balanced_accuracy",
    df_scaling: float = 0.45,
    alpha: float = 0.05,
) -> dict[str, Any]:
    """Compare runs that share a split, using their per-fold scores.

    Args:
        run_paths: Completed run folders, two or more
        metric: Per-fold metric to compare
        df_scaling: Degrees-of-freedom scaling for the corrected test
        alpha: Significance level for the Benjamini-Hochberg step

    Returns:
        `compare_models` output plus the metric that was compared

    Raises:
        ValueError: If fewer than two runs are given, a run was not split
            identically to the first, or a run is missing the metric
    """
    if len(run_paths) < 2:
        raise ValueError("comparing runs needs at least two of them")

    reference = read_split(run_paths[0])
    for run_path in run_paths[1:]:
        if read_split(run_path) != reference:
            raise ValueError(
                f"{run_path} was not split identically to {run_paths[0]}; the "
                "corrected paired test needs the same folds in the same order"
            )

    scores = {
        label: load_run_scores(run_path, metric)
        for label, run_path in zip(_labels(run_paths), run_paths)
    }
    return {
        "metric": metric,
        **compare_models(scores, df_scaling=df_scaling, alpha=alpha),
    }


def write_comparison(result: dict[str, Any], output_dir: Path) -> Path:
    """Write the comparison, significance and machine-readable artefacts.

    The JSON copy is what the desktop workbench reads; the CSV and LaTeX copies
    are the dissertation tables.

    Args:
        result: Output of `compare_runs`
        output_dir: Directory to create and fill

    Returns:
        The directory written to
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    comparisons = result["comparisons"]
    alpha = float(result["alpha"])

    create_comparison_table(comparisons, output_dir / "comparisons.csv")
    create_comparison_table(comparisons, output_dir / "comparisons.tex", format="latex")
    create_significance_table(comparisons, output_dir / "significance.csv", alpha=alpha)
    create_significance_table(
        comparisons, output_dir / "significance.tex", format="latex", alpha=alpha
    )
    (output_dir / "comparison.json").write_text(
        json.dumps(result, indent=2, default=str)
    )
    return output_dir


def _fold_index(fold: dict[str, Any]) -> int:
    """Sort key for folds, tolerating a fold that did not record its index."""
    index = fold.get("fold", 0)
    return index if isinstance(index, int) else 0


def _labels(run_paths: list[Path]) -> list[str]:
    """A unique, human-readable label per run: its model type, else its id."""
    labels: list[str] = []
    for run_path in run_paths:
        metrics_path = run_path / "metrics.json"
        model_type = None
        if metrics_path.is_file():
            model_type = json.loads(metrics_path.read_text()).get("model_type")
        label = model_type or run_path.name
        if label in labels:
            label = run_path.name
        labels.append(label)
    return labels
