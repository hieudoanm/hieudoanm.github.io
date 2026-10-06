"""CLI entry point for the MRI pipeline.

The commands that do real work live in `commands.py` and are registered here
next to the stubs, so one file lists the whole surface `pipeline --help` shows.
"""

import typer

from pipeline.commands import compare, data, doctor, export_schemas, list_runs, run

app = typer.Typer(
    name="pipeline",
    help="MRI Pipeline for predicting post-stroke aphasia outcome "
    "from lesion MRI plus clinical data",
    add_completion=False,
)

app.command()(doctor)
app.command()(export_schemas)
app.command()(list_runs)
app.command()(data)
app.command()(run)
app.command()(compare)


@app.command()
def split() -> None:
    """Create train/validation/test splits."""
    typer.secho(
        "Not available as a standalone command: the split is created by "
        "'pipeline run' and saved to the run folder's splits/split.json.",
        err=True,
    )
    raise typer.Exit(code=2)


@app.command()
def preprocess() -> None:
    """Preprocess imaging data."""
    _not_implemented(
        "preprocess",
        "imaging preprocessing is not implemented in this build; "
        "'pipeline run' executes the tabular baseline path",
    )


@app.command()
def images() -> None:
    """Generate image representations."""
    _not_implemented(
        "images",
        "image representation generation is not implemented in this build; "
        "'pipeline run' executes the tabular baseline path",
    )


@app.command()
def baseline() -> None:
    """Run baseline models."""
    _not_implemented(
        "baseline",
        "run the baseline inside a full run instead: 'pipeline run --config <path>'",
    )


@app.command()
def train() -> None:
    """Train deep models."""
    _not_implemented(
        "train",
        "deep models are not implemented in this build; "
        "'pipeline run' executes the tabular baseline path",
    )


@app.command()
def evaluate() -> None:
    """Evaluate models."""
    _not_implemented(
        "evaluate",
        "evaluation happens inside a run so the lock-box access is logged; "
        "use 'pipeline run --config <path>'",
    )


@app.command()
def report() -> None:
    """Generate reports."""
    _not_implemented(
        "report",
        "report tables are written into the run folder's artifacts/reports; "
        "use 'pipeline run --config <path>'",
    )


def _not_implemented(command: str, reason: str) -> None:
    """Report an unimplemented command instead of pretending it succeeded."""
    typer.secho(f"'{command}' is not implemented: {reason}", err=True, fg=typer.colors.RED)
    raise typer.Exit(code=2)


@app.command()
def serve() -> None:
    """Start the pipeline server (optional)."""
    _not_implemented(
        "serve",
        "this build has no server; the desktop workbench reads run folders directly",
    )


def main() -> None:
    """Main entry point."""
    app()


if __name__ == "__main__":
    main()
