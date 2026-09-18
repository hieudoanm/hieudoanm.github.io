---
name: scikit-learn-best-practices
description: Best practices for machine learning with scikit-learn — the estimator/pipeline conventions for predictive modeling in Python. Use when writing, structuring, or reviewing scikit-learn — covers estimators, pipelines, train/test splits, imputation, tuning, and evaluation.
---

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

## 2. Pipelines

- **All preprocessing inside the `Pipeline` — the pipeline is the model:**

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
    ("model", RandomForestClassifier(n_estimators=100, random_state=42)),
])
```

- **`ColumnTransformer` for mixed types: numeric scaling + one-hot/ordinal for categories in one `fit`.**
- **Never preprocess outside the pipeline for the same branch** — leakage and split-decay follow you.

---

## 3. Preprocessing & Missing Data

- **`SimpleImputer`/`KNNImputer` before scaling; treat missingness as a design decision (mask features when informative).**
- **`StandardScaler`/`MinMaxScaler` fit on train only (the pipeline applies it to test inside).**
- **One-hot via `OneHotEncoder(handle_unknown="ignore")`; ordinal for true order.**
- **Column names survive as feature names (`get_feature_names_out`) — verification aid.**

---

## 4. Splits & Evaluation

- **`train_test_split(..., stratify=y, random_state=...)` for classification splits:**

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
```

- **`cross_val_score`/`StratifiedKFold` for robust estimate; keep the test set untouched until the final run.**
- **Metrics from `sklearn.metrics` matched to the problem: accuracy only for balanced classes; `f1`/`precision`/`recall`/`roc_auc` for imbalance; MAE/RMSE for regression.**
- **`classification_report`/`confusion_matrix` read before a headline number is claimed.**

---

## 5. Tuning

- **`GridSearchCV`/`RandomizedSearchCV` tune inside the same pipeline object:**

```python
from sklearn.model_selection import GridSearchCV
search = GridSearchCV(pipe, {"model__n_estimators": [100, 200],
                             "model__max_depth": [None, 10]}, cv=5, scoring="f1_macro")
search.fit(X_train, y_train)
```

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