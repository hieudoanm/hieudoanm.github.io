---
name: xgboost-best-practices
description: Best practices for gradient boosting with XGBoost — the tree-ensemble conventions for tabular ML in Python. Use when writing, structuring, or reviewing XGBoost — covers DMatrix, params, training/eval, native API vs sklearn wrapper, feature importance, and tuning.
---

# XGBoost Best Practices

XGBoost is **a leading gradient-boosted tree library** — strong on tabular data — via the sklearn-compatible wrapper (`XGBClassifier`/`XGBRegressor`) or the native `DMatrix` API. Practical XGBoost leans on **`xgb.DMatrix` with explicit labels/weights and `eval_metric`, params tuned deliberately (learning rate/depth/reg), `early_stopping_rounds` against a validation split, and feature importance inspected with a grain of salt** — trees are cheap, control is the discipline (depth, subsample, regularization).

---

## 1. Data & DMatrix

- **Native API: `DMatrix` carries features, labels, and (optional) sample weights:**

```python
import xgboost as xgb
dtr = xgb.DMatrix(X_train, label=y_train)
dva = xgb.DMatrix(X_val, label=y_val)
```

- **Categoricals: `enable_categorical=True` + `feature_types` strongly typed (else encode deliberately).**
- **`set_info(weight=...)` for imbalance weights; `missing=np.nan` handled natively (sparse OK).**
- **DataFrame features kept as strings for `get_importance` names; no dumb float round-tripping.**

---

## 2. Parameters

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

## 4. Evaluation & Feature Importance

- **Metrics matched to problem: `auc`, `logloss`, `rmse`, `mae`, `ndcg` (ranker).**
- **Feature importance has caveats — `gain` ≠ causality; weight churn across seeds:**
  - cross-fit `xgb.feature_importances_` and SHAP (`shap`) for the real story.
- **Leakage watch: `eval_metric="auc"` on training only overfits; split properly before boosting.**

---

## 5. Saving & Serving

- **`bst.save_model("model.json")` (JSON) or `bst.save_raw` — portable across versions.**

```python
bst.save_model("model.json")          # new_round-trip safe
loaded = xgb.Booster(); loaded.load_model("model.json")
```

- **`bst.save_model` (`json`/`ubj`) over raw pkl — deployment across ML stacks.**
- **Serve the booster or the wrapper (`predict` vs `predict_proba`) matching the task; CPU/GPU minimal diff documented.**

---

## 6. Reproducibility & Scaling

- **`seed` + `nthread` explicit; data split fixed (`random_state`).**
- **Deterministic `seed` in params + `set_param({"random_state": 42})` for the wrapper path.**
- **Scale: `hist` + `grow_policy`, `max_bin`; GPU for big flattening (`tree_method="gpu_hist"` where available).**
- **Version-pin `xgboost`; golden-test parity on a fixed evaluation split.**

---

## General Rules of Thumb

- **`DMatrix` explicit labels/weights; native `xgb.train` with `evals` + early stopping.**
- **Params deliberate: `eta`/`max_depth`/`subsample`/reg; objective metric semantic.**
- **Metrics + feature importance (gain ≠ causal) cross-checked with SHAP.**
- **Save as JSON (portable); seeds + splits for reproducibility.**
- **Tune for robustness (regularization) over memorization.**

---

## Quick-Start Checklist

- [ ] `DMatrix` with labels; validation split defined; test sealed
- [ ] `objective`/`eval_metric` match the problem; regularization present
- [ ] `xgb.train` with `evals` + `early_stopping_rounds`; `best_iteration` used
- [ ] Feature importance via `gain` + SHAP cross-check
- [ ] `save_model` JSON for serving; seeds/nthread pinned
- [ ] Versions pinned; golden parity test on the eval split