# XGBoost Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `DMatrix` with labels; validation split defined; test sealed
- [ ] `objective`/`eval_metric` match the problem; regularization present
- [ ] `xgb.train` with `evals` + `early_stopping_rounds`; `best_iteration` used
- [ ] Feature importance via `gain` + SHAP cross-check
- [ ] `save_model` JSON for serving; seeds/nthread pinned
- [ ] Versions pinned; golden parity test on the eval split

## Example

A team applying **Quick-Start Checklist** to a XGBoost Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `DMatrix` with labels; validation split defined; test sealed**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for xgboost-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
