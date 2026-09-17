# Overview

Focused reference for **lightgbm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# LightGBM Best Practices

LightGBM is a gradient boosting framework that uses tree-based learning algorithms. Best practice is to prepare data properly, tune hyperparameters effectively, use cross-validation, handle categorical features appropriately, and follow ML best practices for model performance and interpretability.

---

## 1. Core Concepts

- **Gradient boosting** — ensemble method that builds trees sequentially
- **Leaf-wise growth** — LightGBM's unique tree growth strategy
- **Categorical feature support** — native handling of categorical features
- **GPU acceleration** — support for GPU training
- **Distributed training** — support for distributed computing

---

## 2. Installation

- **Install LightGBM:**

```bash
pip install lightgbm
```

- **GPU support:**

```bash
pip install lightgbm --install-option=--gpu
```

---

## 3. Data Preparation

- **Format data for LightGBM:**

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

- **Handle categorical features:**

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
