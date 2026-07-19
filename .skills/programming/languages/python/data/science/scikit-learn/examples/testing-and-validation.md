# Scikit-learn Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Estimators seeded (`random_state`); uniforms fit/predict
- [ ] Full `Pipeline` (+ `ColumnTransformer`) for all preprocessing
- [ ] Imputation + scaling inside the pipeline; no leakage
- [ ] Stratified split + CV; metrics matched (f1/auc/rmse as needed)
- [ ] `GridSearchCV`/`RandomizedSearchCV` on the pipeline; params prefixed
- [ ] Test set untouched; final evaluation on the held-out split

## Example

A team applying **Quick-Start Checklist** to a Scikit-learn Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Estimators seeded (`random_state`); uniforms fit/predict**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for scikit-learn-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
