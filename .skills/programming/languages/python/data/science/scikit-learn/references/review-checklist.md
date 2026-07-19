# Review checklist

Focused reference for **scikit-learn-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Nested CV for honest performance; param prefixes (`model__`) on pipeline steps.**
- **Default parameters are the baseline — go with defaults until a targeted reason to move.**

---

## General Rules of Thumb

- **One API (`fit`/`predict`), seeded + deterministic.**
- **Everything in a `Pipeline`/`ColumnTransformer`; no fit-outside-the-pipeline preprocessing.**
- **Test set sealed; evaluation via stratified CV + matched metrics.**
- **Tuning on train only (grid search); nested CV for the claim.**
- **Feature names verified; confusion matrix/report read first.**

---

## Quick-Start Checklist

- [ ] Estimators seeded (`random_state`); uniforms fit/predict
- [ ] Full `Pipeline` (+ `ColumnTransformer`) for all preprocessing
- [ ] Imputation + scaling inside the pipeline; no leakage
- [ ] Stratified split + CV; metrics matched (f1/auc/rmse as needed)
- [ ] `GridSearchCV`/`RandomizedSearchCV` on the pipeline; params prefixed
- [ ] Test set untouched; final evaluation on the held-out split
