# Scikit-learn Best Practices: 2. Pipelines

## Source guidance

This example applies the **2. Pipelines** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **All preprocessing inside the `Pipeline` — the pipeline is the model:**
- **`ColumnTransformer` for mixed types: numeric scaling + one-hot/ordinal for categories in one `fit`.**
- **Never preprocess outside the pipeline for the same branch** — leakage and split-decay follow you.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for scikit-learn-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
