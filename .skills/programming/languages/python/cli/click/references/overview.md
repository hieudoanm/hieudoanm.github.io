# Overview

Focused reference for **click-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
