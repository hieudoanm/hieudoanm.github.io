# Workflow notes

Focused reference for **lightgbm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
