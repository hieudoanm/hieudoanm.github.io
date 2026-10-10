# Scikit-learn Best Practices: Decision Record

Use this record when applying [Scikit-learn Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for machine learning with scikit-learn — the estimator/pipeline conventions for predictive modeling in Python. Use when writing, structuring, or reviewing scikit-learn — covers estimators, pipelines, train/test splits, imputation, tuning, and evaluation.

scikit-learn centers the work on **consistent estimators — fit(X, y) / predict(X) / score(X, y)** — joined into Pipelines that compose preprocessing + modeling into one grid-searchable object. Practical scikit-learn leans on **Pipeline + ColumnTransformer for reproducible preprocessing, train_test_split/cross_val_score for honest evaluation, GridSearchCV/RandomizedSearchCV for tuning on the train set only**, and **metrics matched to the problem (not one-score-fits-all)**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Estimator Discipline
- [ ] 2. Pipelines
- [ ] 3. Preprocessing & Missing Data
- [ ] 4. Splits & Evaluation
- [ ] 5. Tuning
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
