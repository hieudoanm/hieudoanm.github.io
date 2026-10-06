"""The commands that do real work.

They are plain functions so the tests can call them without going through the
typer runner; `cli.py` registers them on the app next to the stubs.
"""

import json
from pathlib import Path

import typer

from pipeline.core import check_system


def doctor(
    verbose: bool = typer.Option(False, "--verbose", "-v", help="Show detailed information"),
    data_path: str = typer.Option("data/", "--data-path", help="Path to data directory"),
) -> None:
    """Check system dependencies and configuration."""
    typer.echo("Pipeline doctor - checking system...")

    system_info = check_system(verbose=verbose)

    typer.echo(f"\nPython version: {system_info['python_version']}")
    typer.echo(
        f"Platform: {system_info['platform']['system']} ({system_info['platform']['machine']})"
    )

    device = system_info['device']
    typer.echo(f"\nAvailable devices: {', '.join(device['available_devices'])}")
    typer.echo(f"Recommended device: {device['recommended_device']}")

    if device.get('cuda_available'):
        typer.echo(f"CUDA devices: {device['cuda_device_count']}")
        typer.echo(f"CUDA device name: {device['cuda_device_name']}")

    deps = system_info['dependencies']
    typer.echo("\nRequired dependencies:")
    for dep, installed in deps['required'].items():
        status = "✓" if installed else "✗"
        typer.echo(f"  {status} {dep}")

    typer.echo("\nOptional dependencies:")
    for dep, installed in deps['optional'].items():
        status = "✓" if installed else "✗"
        typer.echo(f"  {status} {dep}")

    paths = system_info['paths']
    typer.echo(f"\nData path: {paths['data_path']}")
    typer.echo(f"Data path exists: {'✓' if paths['data_path_exists'] else '✗'}")

    if verbose:
        typer.echo("\n" + "="*50)
        typer.echo("Full system info:")
        typer.echo(json.dumps(system_info, indent=2, default=str))

    typer.echo("\n✓ System check complete")


def export_schemas(
    output_dir: str = typer.Option(
        "schemas/", "--output-dir", "-o", help="Output directory for schemas"
    ),
) -> None:
    """Export configuration schemas as JSON Schema."""
    from pipeline.schemas import export_all_schemas

    typer.echo(f"Exporting schemas to {output_dir}...")
    export_all_schemas(output_dir)
    typer.echo("✓ Schemas exported successfully")


def list_runs(
    output_dir: str = typer.Option("runs/", "--output-dir", "-o", help="Output directory for runs"),
) -> None:
    """List all runs."""
    from pipeline.core import list_runs

    runs = list_runs(output_dir)

    if not runs:
        typer.echo("No runs found.")
        return

    typer.echo(f"Found {len(runs)} run(s):")
    for run in runs:
        manifest = run["manifest"]
        typer.echo(f"\n  {run['run_id']}")
        typer.echo(f"    Git commit: {manifest.get('git_commit', 'unknown')}")
        typer.echo(f"    Start time: {manifest.get('start_time', 'unknown')}")
        typer.echo(f"    End time: {manifest.get('end_time', 'running')}")
        typer.echo(f"    Device: {manifest.get('device', 'unknown')}")


def run(
    config: str = typer.Option(..., "--config", "-c", help="Path to a YAML configuration file"),
    output_dir: str = typer.Option(
        "runs/", "--output-dir", "-o", help="Parent directory for run folders"
    ),
    run_id: str | None = typer.Option(None, "--run-id", help="Run id; generated when omitted"),
) -> None:
    """Run the configured stages and write one run folder.

    This is the command the desktop workbench launches. Progress is written to
    the run folder's events.jsonl as JSON Lines; the summary is printed here.
    """
    from pipeline.core.runner import run_experiment
    from pipeline.schemas.config import load_config

    try:
        validated = load_config(config)
    except Exception as error:
        typer.secho(f"Configuration error: {error}", err=True, fg=typer.colors.RED)
        raise typer.Exit(code=2)

    resolved = validated.model_dump(mode="json")
    try:
        summary = run_experiment(resolved, output_dir=output_dir, run_id=run_id)
    except Exception as error:
        typer.secho(f"Run failed: {error}", err=True, fg=typer.colors.RED)
        raise typer.Exit(code=1)

    typer.echo(json.dumps(summary, indent=2, default=str))


def compare(
    runs: list[str] = typer.Argument(..., help="Two or more completed run folders to compare"),
    metric: str = typer.Option(
        "balanced_accuracy", "--metric", "-m", help="Per-fold metric to compare"
    ),
    output_dir: str | None = typer.Option(
        None, "--output-dir", "-o", help="Write the comparison tables and JSON here"
    ),
    alpha: float = typer.Option(0.05, "--alpha", help="FDR significance level"),
    df_scaling: float = typer.Option(
        0.45, "--df-scaling", help="Degrees-of-freedom scaling for the corrected test"
    ),
) -> None:
    """Compare runs that share a split, with the corrected test and BH-FDR.

    The runs must have been built on the same split, so fold k is the same
    participants in both; a mismatched split is refused rather than paired.
    """
    from pipeline.core.run_compare import compare_runs, write_comparison

    if len(runs) < 2:
        typer.secho(
            "compare needs at least two run folders", err=True, fg=typer.colors.RED
        )
        raise typer.Exit(code=2)

    try:
        result = compare_runs(
            [Path(run) for run in runs],
            metric=metric,
            df_scaling=df_scaling,
            alpha=alpha,
        )
    except Exception as error:
        typer.secho(f"Comparison failed: {error}", err=True, fg=typer.colors.RED)
        raise typer.Exit(code=1)

    for comparison in result["comparisons"]:
        verdict = "significant" if comparison["fdr_rejected"] else "not significant"
        typer.echo(
            f"{comparison['model1']} vs {comparison['model2']}: "
            f"mean_diff={comparison['mean_diff']:.4f} "
            f"corrected_p={comparison['corrected_p_value']:.4f} "
            f"fdr_p={comparison['fdr_corrected_p']:.4f} {verdict}"
        )

    if output_dir is not None:
        write_comparison(result, Path(output_dir))
        typer.echo(f"\nWrote comparison tables to {output_dir}")
