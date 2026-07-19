# Implementation notes

Focused reference for **xgboost-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
