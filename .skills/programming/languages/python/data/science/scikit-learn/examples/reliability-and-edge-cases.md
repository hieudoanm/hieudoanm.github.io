# Scikit-learn Best Practices: 4. Splits & Evaluation

## Source guidance

This example applies the **4. Splits & Evaluation** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`train_test_split(..., stratify=y, random_state=...)` for classification splits:**
- **`cross_val_score`/`StratifiedKFold` for robust estimate; keep the test set untouched until the final run.**
- **Metrics from `sklearn.metrics` matched to the problem: accuracy only for balanced classes; `f1`/`precision`/`recall`/`roc_auc` for imbalance; MAE/RMSE for regression.**
- **`classification_report`/`confusion_matrix` read before a headline number is claimed.**

## Example

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for scikit-learn-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
