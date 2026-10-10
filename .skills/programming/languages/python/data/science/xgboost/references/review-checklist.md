# Review checklist

Focused reference for **xgboost-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
