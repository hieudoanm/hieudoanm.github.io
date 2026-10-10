# LightGBM Best Practices: Basic Usage

Best practices for using LightGBM for gradient boosting. Use when implementing, structuring, or reviewing LightGBM models — covers data preparation, hyperparameter tuning, model training, and deployment.

## Scenario

Use this example as a starting point when applying **lightgbm-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Data Preparation** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
import lightgbm as lgb
import pandas as pd
from sklearn.model_selection import train_test_split

# Load data
df = pd.read_csv('data.csv')

# Prepare features and target
X = df.drop('target', axis=1)
y = df['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create LightGBM Dataset
train_data = lgb.Dataset(X_train, label=y_train)
test_data = lgb.Dataset(X_test, label=y_test, reference=train_data)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
