# Implementation notes

Focused reference for **click-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Context & Shared State

- **`@click.pass_context` to receive `ctx`; state shared via `ctx.obj` (a config object):**

```python
@click.group()
@click.option("--verbose", is_flag=True)
@click.pass_context
def cli(ctx, verbose):
    ctx.obj = {"verbose": verbose}
```

- **`ctx.obj` for request-scoped wiring only** — never business logic; subcommands read `ctx.obj` at the top:

```python
@cli.command()
@click.pass_context
def status(ctx):
    verbose = ctx.obj["verbose"]
```

- **`click.get_current_context()` as the escape hatch** — rare and named, not scattered.

---

## 5. Output & UX

- **`click.echo` with `err=True` for diagnostics; `click.style`/`click.secho` for colored output where the platform supports it** — the user interface consistency matters:

```python
click.echo(click.style("OK", fg="green"))
```

- **`click.progressbar` for long tasks; `prompt`/`confirm` for interactive gates — keep the non-interactive path first** (scriptable with flags, interactive as enhancement).
- **Usage/help auto-generated; `epilog` for examples; every option documented with `help=`.**
- **Exit via `click.exceptions`/`return` from command functions** — Click's CLI runner collects the exit code.
