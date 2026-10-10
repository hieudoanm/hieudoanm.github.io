# Implementation notes

Focused reference for **scikit-learn-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
