# Scikit-learn Best Practices: Basic Usage

Best practices for machine learning with scikit-learn — the estimator/pipeline conventions for predictive modeling in Python. Use when writing, structuring, or reviewing scikit-learn — covers estimators, pipelines, train/test splits, imputation, tuning, and evaluation.

## Scenario

Use this example as a starting point when applying **scikit-learn-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Estimator Discipline** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)
pred = model.predict(X_test)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
