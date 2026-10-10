# Argparse Best Practices: Basic Usage

Best practices for writing Python CLIs with argparse — the stdlib command-line parser conventions. Use when writing, structuring, or reviewing argparse-based tools — covers parser layout, arguments, subcommands, validation, help text, typing, and testing.

## Scenario

Use this example as a starting point when applying **argparse-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Parser Layout** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="tool", description="Do the thing.")
    parser.add_argument("path", help="input path")
    parser.add_argument("-v", "--verbose", action="store_true", help="verbose output")
    parser.add_argument("--port", type=int, default=8080, help="listen port")
    return parser
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
