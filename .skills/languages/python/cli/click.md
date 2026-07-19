---
name: click-best-practices
description: Best practices for writing Python CLIs with Click — the composable command-line framework conventions. Use when writing, structuring, or reviewing Click tools — covers commands/groups, options/arguments, type handling, context, validation, error handling, and testing.
---

# Click Best Practices

Click builds CLIs from **decorators** (`@click.group`, `@click.command`, `@click.option`) that wrap functions — the function signature becomes the CLI contract. Practical Click leans on **small command functions with typed options/arguments, `@click.group` command clusters, `@click.option` with `type=` and `required`/`multiple`**, and **`ctx` (context) only for shared/stateful wiring**. Click's grouping and `ClickException` flow keep the parsing layer thin and the tools testable via `CliRunner`.

---

## 1. Commands & Groups

- **`@click.group()` for the root; `@click.command()` subcommands in the same module:**

```python
@click.group()
def cli(): ...

@click.command()
@click.argument("path")
def build(path: str):
    click.echo(f"building {path}")

cli.add_command(build)
```

- **`@click.group(chain=True)` for composable pipelines** (a multi-step CLI where order matters) — only when the UX demands it.
- **Group `invoke_without_command=True`** for a root that does something with no subcommand; else the group is pure dispatch.
- **`@cli.command()`-style decorator registration** (decorate-and-register in one) keeps the command tree visible at the definition.

---

## 2. Options & Arguments

- **Options = named flags, arguments = positional; typed via `type=`:**

```python
@click.option("--port", type=int, default=8080, help="listen port")
@click.option("--tags", multiple=True, help="repeatable tag")
@click.argument("path", type=click.Path(exists=True, dir_okay=False))
```

- **`required=True` for the never-optional; `multiple=True` for repeatable; `count=True` for `-v -v`.**
- **`click.Path`/`click.File`/`click.Choice`/`click.IntRange` handle the common validation** at the boundary:

```python
click.choice(["dev", "stage", "prod"])
click.IntRange(1, 65536)
```

- **`show_default=True`** on options so help states default values explicitly:

```python
@click.option("--port", default=8080, show_default=True, help="listen port")
```

- **Options parsed/env-variable fallback**: `envvar="PORT"` for secrets/config reads from the environment.

---

## 3. Types & Conversion

- **Custom types via `click.ParamType`** for the genuinely repeated shapes:

```python
class Port(click.ParamType):
    name = "port"
    def convert(self, value, param, ctx):
        v = int(value)
        if not 0 < v < 65536:
            self.fail(f"{value!r} is not a valid port", param, ctx)
        return v
```

- **`type=str` default; `ClickException` for clean error messages over raw raises** — convert domain errors to `click.UsageError`/`ClickException`.

---

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

---

## 6. Testing

- **`CliRunner` exercises the CLI end-to-end without subprocesses:**

```python
from click.testing import CliRunner

def test_build(runner, tmp_path):
    p = tmp_path / "input.txt"; p.write_text("x")
    result = runner.invoke(cli, ["build", str(p)])
    assert result.exit_code == 0
    assert "building" in result.output
```

- **Test the full group** — the command tree is the CLI contract; `invoke` from the root.
- **Contract cases**: missing argument, bad type/path, unknown option, `--help` output, and the error paths.

---

## General Rules of Thumb

- **Decorators declare the contract; function signatures are tested, not parsed twice.**
- **Options typed (`type=`/`Choice`/`Path`/custom); defaults in help.**
- **`ctx.obj` shared wiring only; domain logic stays in services.**
- **`click.echo` output with style; non-interactive path first.**
- **`CliRunner`-tested integration; happy + error paths covered.**

---

## Quick-Start Checklist

- [ ] `@click.group`/`@click.command` tree; one function per command
- [ ] Typed options with `required`/`multiple`/`count`; `show_default=True`
- [ ] `click.Path`/`Choice`/`IntRange`/custom `ParamType` for validation
- [ ] `envvar` for config/secrets; `ctx.obj` for shared wiring only
- [ ] `click.echo` output; `click.style`; `epilog`/`help=` documented
- [ ] `CliRunner.invoke` tests incl. error paths and `--help`