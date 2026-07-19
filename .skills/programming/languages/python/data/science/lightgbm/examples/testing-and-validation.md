# LightGBM Best Practices: 7. Cross-Validation

## Source guidance

This example applies the **7. Cross-Validation** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **K-fold cross-validation:**

## Example

```python
from sklearn.model_selection import KFold
from sklearn.metrics import accuracy_score

kf = KFold(n_splits=5, shuffle=True, random_state=42)
scores = []

for train_index, test_index in kf.split(X):
    X_train_fold, X_test_fold = X.iloc[train_index], X.iloc[test_index]
    y_train_fold, y_test_fold = y.iloc[train_index], y.iloc[test_index]

    train_data = lgb.Dataset(X_train_fold, label=y_train_fold)
    model = lgb.train(params, train_data, num_boost_round=100)

    predictions = model.predict(X_test_fold)
    score = accuracy_score(y_test_fold, predictions)
    scores.append(score)

print(f"CV Score: {sum(scores)/len(scores)}")
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for lightgbm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
