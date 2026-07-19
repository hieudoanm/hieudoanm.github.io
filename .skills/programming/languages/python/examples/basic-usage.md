# Python Best Practices: Basic Usage

Idiomatic Python best practices covering project structure, type hints, dataclasses, error handling, pathlib, generators, packaging, testing and tooling. Use when writing, structuring, or reviewing Python code.

## Scenario

Use this example as a starting point when applying **python-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Type Hints & Typing** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
class Named(Protocol):
    name: str

def greet(obj: Named) -> str: return f"hi {obj.name}"
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
