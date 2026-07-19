# LightGBM Best Practices: Starter Template

A reusable starting point derived from the **3. Data Preparation** section of [LightGBM Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
# Identify categorical features
categorical_features = ['category1', 'category2']

# Create dataset with categorical features
train_data = lgb.Dataset(
    X_train,
    label=y_train,
    categorical_feature=categorical_features
)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
