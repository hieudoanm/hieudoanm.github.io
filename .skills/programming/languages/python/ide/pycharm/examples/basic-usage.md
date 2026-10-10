# PyCharm: Basic Usage

Best practices for working in PyCharm — the unified free and paid tiers, virtualenv and uv/poetry environment management, pytest and the profiler, Jupyter support, and JetBrains shared conventions. Use when setting up, debugging, or profiling a Python project in PyCharm.

## Scenario

Use this example as a starting point when applying **pycharm-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Environment Management** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```text
.venv/                # ignored
.python-version       # committed
pyproject.toml        # committed, project metadata + deps
uv.lock / poetry.lock # committed
src/myapp/            # marked as Sources
tests/
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
