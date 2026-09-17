# Pandas Best Practices: Basic Usage

Best practices for data analysis with pandas — the DataFrame conventions for Python. Use when writing, structuring, or reviewing pandas — covers import/read, dtypes, indexing, transformations, clean pipelines, and performance.

## Scenario

Use this example as a starting point when applying **pandas-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Transformations** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
(df
 .assign(amount = lambda d: d["price"] * d["qty"])
 .query("amount > 100")
 .groupby("region")["amount"].sum())
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
