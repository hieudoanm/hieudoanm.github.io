"""CLI entry point for the MRI pipeline."""

import typer
from typing import Optional
import json
from pipeline.core import check_system

app = typer.Typer(
    name="pipeline",
    help="MRI Pipeline for predicting post-stroke aphasia outcome from lesion MRI plus clinical data",
    add_completion=False,
)


@app.command()
def doctor(
    verbose: bool = typer.Option(False, "--verbose", "-v", help="Show detailed information"),
    data_path: str = typer.Option("data/", "--data-path", help="Path to data directory"),
) -> None:
    """Check system dependencies and configuration."""
    typer.echo("Pipeline doctor - checking system...")
    
    system_info = check_system(verbose=verbose)
    
    typer.echo(f"\nPython version: {system_info['python_version']}")
    typer.echo(f"Platform: {system_info['platform']['system']} ({system_info['platform']['machine']})")
    
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


@app.command()
def export_schemas(
    output_dir: str = typer.Option("schemas/", "--output-dir", "-o", help="Output directory for schemas"),
) -> None:
    """Export configuration schemas as JSON Schema."""
    from pipeline.schemas import export_all_schemas
    
    typer.echo(f"Exporting schemas to {output_dir}...")
    export_all_schemas(output_dir)
    typer.echo("✓ Schemas exported successfully")


@app.command()
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


@app.command()
def data(
    action: str = typer.Argument(..., help="Action: fetch, cohort, or check"),
) -> None:
    """Data management commands."""
    if action == "fetch":
        typer.echo("Fetching data...")
    elif action == "cohort":
        typer.echo("Building cohort...")
    elif action == "check":
        typer.echo("Checking data integrity...")
    else:
        typer.echo(f"Unknown action: {action}")


@app.command()
def split() -> None:
    """Create train/validation/test splits."""
    typer.echo("Creating splits...")


@app.command()
def preprocess() -> None:
    """Preprocess imaging data."""
    typer.echo("Preprocessing data...")


@app.command()
def images() -> None:
    """Generate image representations."""
    typer.echo("Generating images...")


@app.command()
def baseline() -> None:
    """Run baseline models."""
    typer.echo("Running baselines...")


@app.command()
def train() -> None:
    """Train deep models."""
    typer.echo("Training models...")


@app.command()
def evaluate() -> None:
    """Evaluate models."""
    typer.echo("Evaluating models...")


@app.command()
def compare() -> None:
    """Compare model results."""
    typer.echo("Comparing results...")


@app.command()
def report() -> None:
    """Generate reports."""
    typer.echo("Generating reports...")


@app.command()
def serve() -> None:
    """Start the pipeline server (optional)."""
    typer.echo("Starting server...")


def main() -> None:
    """Main entry point."""
    app()


if __name__ == "__main__":
    main()
