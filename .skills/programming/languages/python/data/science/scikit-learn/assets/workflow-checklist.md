# Scikit-learn Best Practices: Workflow Checklist

A practical run sheet for applying [Scikit-learn Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Estimator Discipline: **Uniform API: fit/predict/transform/score — no per-model dialects:**
- [ ] 1. Estimator Discipline: **random_state everywhere for determinism; seed the split too.**
- [ ] 2. Pipelines: **All preprocessing inside the Pipeline — the pipeline is the model:**
- [ ] 2. Pipelines: **ColumnTransformer for mixed types: numeric scaling + one-hot/ordinal for categories in one fit.**
- [ ] 3. Preprocessing & Missing Data: **SimpleImputer/KNNImputer before scaling; treat missingness as a design decision (mask features when informative).**
- [ ] 3. Preprocessing & Missing Data: **StandardScaler/MinMaxScaler fit on train only (the pipeline applies it to test inside).**
- [ ] 4. Splits & Evaluation: **train_test_split(..., stratify=y, random_state=...) for classification splits:**
- [ ] 4. Splits & Evaluation: **cross_val_score/StratifiedKFold for robust estimate; keep the test set untouched until the final run.**
- [ ] 5. Tuning: **GridSearchCV/RandomizedSearchCV tune inside the same pipeline object:**
- [ ] 5. Tuning: **Nested CV for honest performance; param prefixes (model__) on pipeline steps.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
