# Overview

Focused reference for **xgboost-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
