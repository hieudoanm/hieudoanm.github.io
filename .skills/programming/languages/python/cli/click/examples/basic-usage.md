# Click Best Practices: Basic Usage

Best practices for writing Python CLIs with Click — the composable command-line framework conventions. Use when writing, structuring, or reviewing Click tools — covers commands/groups, options/arguments, type handling, context, validation, error handling, and testing.

## Scenario

Use this example as a starting point when applying **click-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Commands & Groups** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
@click.group()
def cli(): ...

@click.command()
@click.argument("path")
def build(path: str):
    click.echo(f"building {path}")

cli.add_command(build)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
