# Overview

Focused reference for **scikit-learn-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Scikit-learn Best Practices

scikit-learn centers the work on **consistent estimators — `fit(X, y)` / `predict(X)` / `score(X, y)`** — joined into `Pipeline`s that compose preprocessing + modeling into one grid-searchable object. Practical scikit-learn leans on **`Pipeline` + `ColumnTransformer` for reproducible preprocessing, `train_test_split`/`cross_val_score` for honest evaluation, `GridSearchCV`/`RandomizedSearchCV` for tuning on the train set only**, and **metrics matched to the problem (not one-score-fits-all)**.

---

## 1. Estimator Discipline

- **Uniform API: `fit`/`predict`/`transform`/`score` — no per-model dialects:**

```python
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)
pred = model.predict(X_test)
```

- **`random_state` everywhere for determinism; seed the split too.**
- **`clone` estimators before mutating params (`param1` in grid search) — don't mutate fitted objects in place.**

---
