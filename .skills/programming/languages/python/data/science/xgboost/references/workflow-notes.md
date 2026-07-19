# Workflow notes

Focused reference for **xgboost-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Start controlled: modest depth, moderate learning rate, some regularization:**

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

- **Regularization (`lambda`/`alpha`/`gamma`) over brute-force depth; fewer, taller trees tuned via `eta` + `n_estimators`.**
- **`objective` semantic: `reg:squarederror`, `binary:logistic`, `multi:softprob`, `count:poisson`.**
- **Speed vs accuracy: `hist` tree method + `early_stopping_rounds` for CI-friendly runs.**

---

## 3. Training & Early Stopping

- **Always train against a validation split with early stopping:**

```python
bst = xgb.train(
  params, dtr, num_boost_round=2000,
  evals=[(dva, "val")], early_stopping_rounds=50, verbose_eval=False,
)
```

- **`early_stopping_rounds` on the validation metric — the test set stays sealed.**
- **SKLearn wrapper for grid-search (`.fit(..., eval_set=..., early_stopping_rounds)`); native for full control.**
- **`best_iteration`/`best_score` read from the result — not eyeballed.**

---
