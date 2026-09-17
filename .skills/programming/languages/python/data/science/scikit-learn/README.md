# Scikit-learn Best Practices

scikit-learn centers the work on **consistent estimators — fit(X, y) / predict(X) / score(X, y)** — joined into Pipelines that compose preprocessing + modeling into one grid-searchable object. Practical scikit-learn leans on **Pipeline + ColumnTransformer for reproducible preprocessing, train_test_split/cross_val_score for honest evaluation, GridSearchCV/RandomizedSearchCV for tuning on the train set only**, and **metrics...

## When to use

Use when writing, structuring, or reviewing scikit-learn.

## Core topics

- 1. Estimator Discipline
- 2. Pipelines
- 3. Preprocessing & Missing Data
- 4. Splits & Evaluation
- 5. Tuning

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Scikit-learn Best Practices: Basic Usage](./examples/basic-usage.md)
- [Scikit-learn Best Practices: 4. Splits & Evaluation](./examples/reliability-and-edge-cases.md)
- [Scikit-learn Best Practices: 2. Pipelines](./examples/setup-and-configuration.md)
- [Scikit-learn Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Scikit-learn Best Practices: Decision Record](./assets/decision-record.md)
- [Scikit-learn Best Practices: Starter Template](./assets/starter-template.md)
- [Scikit-learn Best Practices: Validation Plan](./assets/validation-plan.md)
- [Scikit-learn Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
