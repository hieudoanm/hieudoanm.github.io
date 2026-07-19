# XGBoost Best Practices: Decision Record

Use this record when applying [XGBoost Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for gradient boosting with XGBoost — the tree-ensemble conventions for tabular ML in Python. Use when writing, structuring, or reviewing XGBoost — covers DMatrix, params, training/eval, native API vs sklearn wrapper, feature importance, and tuning.

XGBoost is **a leading gradient-boosted tree library** — strong on tabular data — via the sklearn-compatible wrapper (XGBClassifier/XGBRegressor) or the native DMatrix API. Practical XGBoost leans on **xgb.DMatrix with explicit labels/weights and eval_metric, params tuned deliberately (learning rate/depth/reg), early_stopping_rounds against a validation split, and feature importance inspected with a grain of salt** — trees are cheap, control is the discipline (depth, subsample, regularization).

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Data & DMatrix
- [ ] 2. Parameters
- [ ] 3. Training & Early Stopping
- [ ] 4. Evaluation & Feature Importance
- [ ] 5. Saving & Serving
- [ ] 6. Reproducibility & Scaling
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
