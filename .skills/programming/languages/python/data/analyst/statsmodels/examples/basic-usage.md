# Statsmodels Best Practices: Basic Usage

Best practices for statistical modeling in Python with Statsmodels — the linear models, GLM, time-series, and hypothesis-testing conventions. Use when writing, structuring, or reviewing statsmodels — covers formula API, results interpretation, diagnostics, and reproducibility.

## Scenario

Use this example as a starting point when applying **statsmodels-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Building Models** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
import statsmodels.formula.api as smf

model = smf.ols("revenue ~ price + country", data=df).fit()
print(model.summary())
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
