# Click Best Practices: 5. Output & UX

## Source guidance

This example applies the **5. Output & UX** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`click.echo` with `err=True` for diagnostics; `click.style`/`click.secho` for colored output where the platform supports it** — the user interface consistency matters:
- **`click.progressbar` for long tasks; `prompt`/`confirm` for interactive gates — keep the non-interactive path first** (scriptable with flags, interactive as enhancement).
- **Usage/help auto-generated; `epilog` for examples; every option documented with `help=`.**
- **Exit via `click.exceptions`/`return` from command functions** — Click's CLI runner collects the exit code.

## Example

```python
click.echo(click.style("OK", fg="green"))
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for click-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
