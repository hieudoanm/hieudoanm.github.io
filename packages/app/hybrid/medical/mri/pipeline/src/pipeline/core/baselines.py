"""Training, scoring and cross-validating the baseline models.

The estimators live in `models.py`; the model keys they answer to are listed
here, next to the factory that builds them.
"""

from typing import Any

import numpy as np
from sklearn.model_selection import cross_val_score

from pipeline.core.models import (
    BaselineModel,
    GradientBoostingBaseline,
    LogisticRegressionBaseline,
)


def train_baseline(
    model_type: str,
    X_train: np.ndarray,
    y_train: np.ndarray,
    **kwargs: Any,
) -> BaselineModel:
    """Train a baseline model.
    
    Args:
        model_type: Type of model ('logistic_regression' or 'gradient_boosting')
        X_train: Training features
        y_train: Training labels
        **kwargs: Additional arguments for the model
    
    Returns:
        Trained model
    """
    if model_type == "logistic_regression":
        model = LogisticRegressionBaseline(**kwargs)
    elif model_type == "gradient_boosting":
        model = GradientBoostingBaseline(**kwargs)
    else:
        raise ValueError(f"Unknown model type: {model_type}")

    model.fit(X_train, y_train)
    return model


def evaluate_baseline(
    model: BaselineModel,
    X_test: np.ndarray,
    y_test: np.ndarray,
) -> dict[str, Any]:
    """Evaluate a baseline model.
    
    Args:
        model: Trained model
        X_test: Test features
        y_test: Test labels
    
    Returns:
        Dictionary of evaluation metrics
    """
    from pipeline.core.confidence import calculate_metrics_with_ci

    y_pred = model.predict(X_test)
    y_proba = model.predict_proba(X_test)[:, 1]

    metrics = calculate_metrics_with_ci(y_test, y_pred, y_proba)

    return metrics


def cross_validate_baseline(
    model: BaselineModel,
    X: np.ndarray,
    y: np.ndarray,
    cv: int = 5,
) -> dict[str, Any]:
    """Perform cross-validation on a baseline model.
    
    Args:
        model: Model to evaluate
        X: Features
        y: Labels
        cv: Number of CV folds
    
    Returns:
        Dictionary with CV results
    """
    # Get the underlying sklearn model
    if model.model is not None and hasattr(model.model, "named_steps"):
        sklearn_model = model.model.named_steps[list(model.model.named_steps.keys())[-1]]
    else:
        sklearn_model = model.model

    # Perform cross-validation
    cv_scores = cross_val_score(sklearn_model, X, y, cv=cv, scoring="balanced_accuracy")

    return {
        "cv_scores": cv_scores.tolist(),
        "mean_score": float(np.mean(cv_scores)),
        "std_score": float(np.std(cv_scores)),
        "n_folds": cv,
    }
