# Statsmodels Best Practices: Starter Template

A reusable starting point derived from the **1. Building Models** section of [Statsmodels Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
import statsmodels.formula.api as smf

model = smf.ols("revenue ~ price + country", data=df).fit()
print(model.summary())
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
