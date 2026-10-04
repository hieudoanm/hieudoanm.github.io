---
name: lightgbm-best-practices
description: Best practices for using LightGBM for gradient boosting. Use when implementing, structuring, or reviewing LightGBM models — covers data preparation, hyperparameter tuning, model training, and deployment.
---

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

---

## 4. Model Training

- **Basic model training:**

```python
params = {
    'objective': 'binary',
    'metric': 'binary_logloss',
    'boosting_type': 'gbdt',
    'num_leaves': 31,
    'learning_rate': 0.05,
    'feature_fraction': 0.9
}

model = lgb.train(
    params,
    train_data,
    valid_sets=[train_data, test_data],
    num_boost_round=100,
    early_stopping_rounds=10
)
```

- **Training with callbacks:**

```python
callbacks = [
    lgb.early_stopping(stopping_rounds=10),
    lgb.log_evaluation(period=10)
]

model = lgb.train(
    params,
    train_data,
    valid_sets=[train_data, test_data],
    num_boost_round=1000,
    callbacks=callbacks
)
```

---

## 5. Hyperparameter Tuning

- **Grid search:**

```python
from sklearn.model_selection import GridSearchCV
import lightgbm as lgb

param_grid = {
    'num_leaves': [31, 63, 127],
    'learning_rate': [0.01, 0.05, 0.1],
    'n_estimators': [100, 200, 500]
}

model = lgb.LGBMClassifier()

grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring='accuracy'
)

grid_search.fit(X_train, y_train)
```

- **Random search:**

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import uniform as sp_uniform

param_distributions = {
    'num_leaves': sp_uniform(20, 150),
    'learning_rate': sp_uniform(0.01, 0.3),
    'n_estimators': sp_uniform(100, 1000)
}

random_search = RandomizedSearchCV(
    estimator=model,
    param_distributions=param_distributions,
    n_iter=50,
    cv=5,
    scoring='accuracy'
)

random_search.fit(X_train, y_train)
```

---

## 6. Feature Importance

- **Get feature importance:**

```python
importance = model.feature_importance()
feature_names = X_train.columns

for feature, importance in zip(feature_names, importance):
    print(f"{feature}: {importance}")
```

- **Plot feature importance:**

```python
import matplotlib.pyplot as plt

lgb.plot_importance(model, importance_type='split')
plt.show()
```

---

## 7. Cross-Validation

- **K-fold cross-validation:**

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

---

## 8. Model Evaluation

- **Evaluate model performance:**

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)
precision = precision_score(y_test, predictions)
recall = recall_score(y_test, predictions)
f1 = f1_score(y_test, predictions)

print(f"Accuracy: {accuracy}")
print(f"Precision: {precision}")
print(f"Recall: {recall}")
print(f"F1 Score: {f1}")
```

---

## 9. Model Persistence

- **Save and load model:**

```python
# Save model
model.save_model('model.txt')

# Load model
loaded_model = lgb.Booster(model_file='model.txt')
```

- **Save with sklearn API:**

```python
from sklearn.externals import joblib

# Save
joblib.dump(model, 'model.pkl')

# Load
loaded_model = joblib.load('model.pkl')
```

---

## 10. Advanced Features

- **Custom objective function:**

```python
def custom_objective(y_true, y_pred):
    grad = y_pred - y_true
    hess = np.ones_like(y_pred)
    return grad, hess

params = {
    'objective': 'custom',
    'metric': 'custom'
}

model = lgb.train(
    params,
    train_data,
    fobj=custom_objective
)
```

- **Custom evaluation metric:**

```python
def custom_metric(y_true, y_pred):
    error = y_pred - y_true
    is_higher_better = False
    return 'custom_metric', np.mean(np.abs(error)), is_higher_better

model = lgb.train(
    params,
    train_data,
    feval=custom_metric
)
```

---

## 11. GPU Training

- **Enable GPU training:**

```python
params = {
    'device': 'gpu',
    'gpu_platform_id': 0,
    'gpu_device_id': 0
}

model = lgb.train(params, train_data)
```

---

## 12. General Rules of Thumb

- **Data preparation** — clean and format data properly
- **Categorical features** — use native categorical support
- **Cross-validation** — use cross-validation for robust evaluation
- **Early stopping** — use early stopping to prevent overfitting
- **Feature importance** — analyze feature importance for insights
- **Hyperparameter tuning** — tune hyperparameters for better performance
- **Model persistence** — save and load models properly
- **GPU acceleration** — use GPU for large datasets

---

## Quick-Start Checklist

- [ ] LightGBM installed with appropriate dependencies
- [ ] Data properly formatted and cleaned
- [ ] Categorical features identified and handled
- [ ] Train/validation/test split
- [ ] Appropriate hyperparameters chosen
- [ ] Cross-validation implemented
- [ ] Early stopping configured
- [ ] Model evaluation metrics calculated
- [ ] Feature importance analyzed
- [ ] Model saved for deployment
