# XGBoost Best Practices

XGBoost is **a leading gradient-boosted tree library** — strong on tabular data — via the sklearn-compatible wrapper (XGBClassifier/XGBRegressor) or the native DMatrix API. Practical XGBoost leans on **xgb.DMatrix with explicit labels/weights and eval_metric, params tuned deliberately (learning rate/depth/reg), early_stopping_rounds against a validation split, and feature importance inspected with a grain of salt** — trees...

## When to use

Use when writing, structuring, or reviewing XGBoost.

## Core topics

- 1. Data & DMatrix
- 2. Parameters
- 3. Training & Early Stopping
- 4. Evaluation & Feature Importance
- 5. Saving & Serving
- 6. Reproducibility & Scaling

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [XGBoost Best Practices: Basic Usage](./examples/basic-usage.md)
- [XGBoost Best Practices: 6. Reproducibility & Scaling](./examples/reliability-and-edge-cases.md)
- [XGBoost Best Practices: 2. Parameters](./examples/setup-and-configuration.md)
- [XGBoost Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [XGBoost Best Practices: Decision Record](./assets/decision-record.md)
- [XGBoost Best Practices: Starter Template](./assets/starter-template.md)
- [XGBoost Best Practices: Validation Plan](./assets/validation-plan.md)
- [XGBoost Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
