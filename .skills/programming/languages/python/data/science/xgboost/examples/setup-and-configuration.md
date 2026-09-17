# XGBoost Best Practices: 2. Parameters

## Source guidance

This example applies the **2. Parameters** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Start controlled: modest depth, moderate learning rate, some regularization:**
- **Regularization (`lambda`/`alpha`/`gamma`) over brute-force depth; fewer, taller trees tuned via `eta` + `n_estimators`.**
- **`objective` semantic: `reg:squarederror`, `binary:logistic`, `multi:softprob`, `count:poisson`.**
- **Speed vs accuracy: `hist` tree method + `early_stopping_rounds` for CI-friendly runs.**

## Example

```python
params = {
  "objective": "binary:logistic",
  "eval_metric": "auc",
  "max_depth": 6,
  "eta": 0.05,
  "subsample": 0.8,
  "colsample_bytree": 0.8,
  "lambda": 1.0,
  "alpha": 0.0,
  "nthread": 16,
  "seed": 42,
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for xgboost-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
