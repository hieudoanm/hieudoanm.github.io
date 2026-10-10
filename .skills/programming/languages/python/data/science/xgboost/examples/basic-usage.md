# XGBoost Best Practices: Basic Usage

Best practices for gradient boosting with XGBoost — the tree-ensemble conventions for tabular ML in Python. Use when writing, structuring, or reviewing XGBoost — covers DMatrix, params, training/eval, native API vs sklearn wrapper, feature importance, and tuning.

## Scenario

Use this example as a starting point when applying **xgboost-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Data & DMatrix** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
import xgboost as xgb
dtr = xgb.DMatrix(X_train, label=y_train)
dva = xgb.DMatrix(X_val, label=y_val)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
