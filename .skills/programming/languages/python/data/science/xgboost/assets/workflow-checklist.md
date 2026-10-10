# XGBoost Best Practices: Workflow Checklist

A practical run sheet for applying [XGBoost Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Data & DMatrix: **Native API: DMatrix carries features, labels, and (optional) sample weights:**
- [ ] 1. Data & DMatrix: **Categoricals: enable_categorical=True + feature_types strongly typed (else encode deliberately).**
- [ ] 2. Parameters: **Start controlled: modest depth, moderate learning rate, some regularization:**
- [ ] 2. Parameters: **Regularization (lambda/alpha/gamma) over brute-force depth; fewer, taller trees tuned via eta + n_estimators.**
- [ ] 3. Training & Early Stopping: **Always train against a validation split with early stopping:**
- [ ] 3. Training & Early Stopping: **early_stopping_rounds on the validation metric — the test set stays sealed.**
- [ ] 4. Evaluation & Feature Importance: **Metrics matched to problem: auc, logloss, rmse, mae, ndcg (ranker).**
- [ ] 4. Evaluation & Feature Importance: **Feature importance has caveats — gain ≠ causality; weight churn across seeds:**
- [ ] 5. Saving & Serving: **bst.save_model("model.json") (JSON) or bst.save_raw — portable across versions.**
- [ ] 5. Saving & Serving: **bst.save_model (json/ubj) over raw pkl — deployment across ML stacks.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
