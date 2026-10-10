# Workflow notes

Focused reference for **scikit-learn-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
