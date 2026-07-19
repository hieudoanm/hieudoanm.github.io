# Review checklist

Focused reference for **lightgbm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
