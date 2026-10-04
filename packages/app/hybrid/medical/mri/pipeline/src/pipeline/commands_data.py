"""The `data` command: build, check or fetch the cohort table.

Split out of `commands.py` so one file owns the data-management surface while the
run and comparison commands stay together.
"""

import typer

from pipeline.core.synthetic import describe_cohort, write_synthetic_cohort


def data(
    action: str = typer.Argument(..., help="Action: fetch, cohort, or check"),
    participants: str = typer.Option(
        "data/synthetic/participants.tsv",
        "--participants",
        "-p",
        help="Table the cohort action writes and the check action reads",
    ),
    n_participants: int = typer.Option(120, "--n", help="Participants in the synthetic cohort"),
    seed: int = typer.Option(42, "--seed", help="Seed for the synthetic cohort"),
) -> None:
    """Manage the cohort table: build a synthetic one, check it, or fetch ARC."""
    if action == "cohort":
        _build_cohort(participants, n_participants, seed)
    elif action == "check":
        _check_cohort(participants)
    elif action == "fetch":
        typer.secho(
            "data fetch needs the ARC dataset: download it from OpenNeuro and point "
            "data.participants_tsv at the participants table instead",
            err=True,
            fg=typer.colors.RED,
        )
        raise typer.Exit(code=2)
    else:
        typer.secho(
            f"Unknown action: {action}; expected fetch, cohort or check",
            err=True,
            fg=typer.colors.RED,
        )
        raise typer.Exit(code=2)


def _build_cohort(participants: str, n_participants: int, seed: int) -> None:
    """Write a seeded synthetic cohort and say where it went."""
    try:
        path = write_synthetic_cohort(participants, n_participants=n_participants, seed=seed)
    except ValueError as error:
        typer.secho(f"Cohort build failed: {error}", err=True, fg=typer.colors.RED)
        raise typer.Exit(code=2)
    typer.echo(f"Wrote a synthetic cohort of {n_participants} participants to {path}")


def _check_cohort(participants: str) -> None:
    """Report the shape of a participants table, or refuse it."""
    try:
        report = describe_cohort(participants)
    except (FileNotFoundError, ValueError) as error:
        typer.secho(f"Cohort check failed: {error}", err=True, fg=typer.colors.RED)
        raise typer.Exit(code=1)

    typer.echo(f"Cohort: {report['path']}")
    typer.echo(f"Participants: {report['n_participants']}")
    typer.echo(f"Columns: {', '.join(report['columns'])}")
