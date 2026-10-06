"""The `calibrate` command: search for the df scaling that matches alpha.

Split out of `commands.py` because the sweep has its own options and can write a
full JSON artefact; keeping it separate keeps the run and compare commands
together.
"""

import json
from pathlib import Path
from typing import Any

import typer

from pipeline.core.calibration import calibrate_df_scaling
from pipeline.core.null_test import normal_null_scores


def calibrate(
    n_folds: int = typer.Option(4, "--n-folds", min=2, help="Folds per simulated comparison"),
    n_simulations: int = typer.Option(
        1000, "--n-simulations", min=1, help="Simulations per candidate scaling"
    ),
    target_alpha: float = typer.Option(0.05, "--alpha", help="Nominal type-I error rate to hit"),
    seed: int = typer.Option(42, "--seed", help="Seed for the shared simulated data"),
    output_dir: str | None = typer.Option(
        None, "--output-dir", "-o", help="Write the full sweep here as calibration.json"
    ),
) -> None:
    """Search for the degrees-of-freedom scaling that reproduces the nominal alpha.

    Every candidate is scored on the same simulated data, so the printed
    fingerprint identifies the data the conclusion was measured on.
    """
    result = calibrate_df_scaling(
        normal_null_scores(n_folds=n_folds),
        n_folds=n_folds,
        target_alpha=target_alpha,
        n_simulations=n_simulations,
        seed=seed,
    )

    typer.echo(result["conclusion"])
    typer.echo(
        f"Best df scaling: {result['best_df_scaling']} "
        f"at {result['best_error_rate']:.4f}"
    )
    typer.echo(f"Data fingerprint: {result['data_fingerprint']}")

    if output_dir is not None:
        path = _write_calibration(result, Path(output_dir))
        typer.echo(f"\nWrote the sweep to {path}")


def _write_calibration(result: dict[str, Any], output_dir: Path) -> Path:
    """Write the full sweep, so a methods section can cite every candidate."""
    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / "calibration.json"
    path.write_text(json.dumps(result, indent=2, default=str))
    return path
