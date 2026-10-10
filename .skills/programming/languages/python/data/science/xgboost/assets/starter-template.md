# XGBoost Best Practices: Starter Template

A reusable starting point derived from the **2. Parameters** section of [XGBoost Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
params = {
  "objective": "binary:logistic",
  "eval_metric": "auc",
  "max_depth": 6,
  "eta": 0.05,
  "subsample": 0.8,
  "colsample_bytree": 0.8,
  "lambda": 1.0,
  "alpha": 0.0,
  "nthread": 16,
  "seed": 42,
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
