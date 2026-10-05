"""Baseline models for comparison."""

import numpy as np
import pandas as pd
from typing import Dict, Any, Optional, Tuple
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score
import joblib


class BaselineModel:
    """Base class for baseline models."""
    
    def __init__(
        self,
        random_state: int = 42,
        class_weight: Optional[str] = "balanced",
    ):
        """Initialize baseline model.
        
        Args:
            random_state: Random seed
            class_weight: Class weighting strategy
        """
        self.random_state = random_state
        self.class_weight = class_weight
        self.model = None
        self.scaler = StandardScaler()
        self.is_fitted = False
    
    def fit(self, X: np.ndarray, y: np.ndarray) -> "BaselineModel":
        """Fit the model.
        
        Args:
            X: Features
            y: Labels
        
        Returns:
            Self
        """
        raise NotImplementedError
    
    def predict(self, X: np.ndarray) -> np.ndarray:
        """Make predictions.
        
        Args:
            X: Features
        
        Returns:
            Predicted labels
        """
        if not self.is_fitted:
            raise ValueError("Model must be fitted before prediction")
        return self.model.predict(X)
    
    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        """Predict class probabilities.
        
        Args:
            X: Features
        
        Returns:
            Predicted probabilities
        """
        if not self.is_fitted:
            raise ValueError("Model must be fitted before prediction")
        return self.model.predict_proba(X)
    
    def save(self, path: str) -> None:
        """Save model to disk.
        
        Args:
            path: Path to save model
        """
        joblib.dump(self.model, path)
    
    def load(self, path: str) -> "BaselineModel":
        """Load model from disk.
        
        Args:
            path: Path to load model from
        
        Returns:
            Self
        """
        self.model = joblib.load(path)
        self.is_fitted = True
        return self


class LogisticRegressionBaseline(BaselineModel):
    """Logistic regression baseline model."""
    
    def __init__(
        self,
        C: float = 1.0,
        penalty: str = "l2",
        solver: str = "lbfgs",
        max_iter: int = 1000,
        random_state: int = 42,
        class_weight: Optional[str] = "balanced",
    ):
        """Initialize logistic regression baseline.
        
        Args:
            C: Inverse regularization strength
            penalty: Regularization penalty
            solver: Solver to use
            max_iter: Maximum iterations
            random_state: Random seed
            class_weight: Class weighting
        """
        super().__init__(random_state, class_weight)
        self.C = C
        self.penalty = penalty
        self.solver = solver
        self.max_iter = max_iter
        
        self.model = Pipeline([
            ("scaler", StandardScaler()),
            ("logreg", LogisticRegression(
                C=C,
                penalty=penalty,
                solver=solver,
                max_iter=max_iter,
                random_state=random_state,
                class_weight=class_weight,
            )),
        ])
    
    def fit(self, X: np.ndarray, y: np.ndarray) -> "LogisticRegressionBaseline":
        """Fit the logistic regression model.
        
        Args:
            X: Features
            y: Labels
        
        Returns:
            Self
        """
        self.model.fit(X, y)
        self.is_fitted = True
        return self


class GradientBoostingBaseline(BaselineModel):
    """Gradient boosting baseline model."""
    
    def __init__(
        self,
        n_estimators: int = 100,
        learning_rate: float = 0.1,
        max_depth: int = 3,
        random_state: int = 42,
        class_weight: Optional[str] = "balanced",
    ):
        """Initialize gradient boosting baseline.
        
        Args:
            n_estimators: Number of trees
            learning_rate: Learning rate
            max_depth: Maximum tree depth
            random_state: Random seed
            class_weight: Class weighting
        """
        super().__init__(random_state, class_weight)
        self.n_estimators = n_estimators
        self.learning_rate = learning_rate
        self.max_depth = max_depth
        
        self.model = GradientBoostingClassifier(
            n_estimators=n_estimators,
            learning_rate=learning_rate,
            max_depth=max_depth,
            random_state=random_state,
        )
    
    def fit(self, X: np.ndarray, y: np.ndarray) -> "GradientBoostingBaseline":
        """Fit the gradient boosting model.
        
        Args:
            X: Features
            y: Labels
        
        Returns:
            Self
        """
        self.model.fit(X, y)
        self.is_fitted = True
        return self


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
) -> Dict[str, Any]:
    """Evaluate a baseline model.
    
    Args:
        model: Trained model
        X_test: Test features
        y_test: Test labels
    
    Returns:
        Dictionary of evaluation metrics
    """
    from pipeline.core.metrics import calculate_metrics_with_ci
    
    y_pred = model.predict(X_test)
    y_proba = model.predict_proba(X_test)[:, 1]
    
    metrics = calculate_metrics_with_ci(y_test, y_pred, y_proba)
    
    return metrics


def cross_validate_baseline(
    model: BaselineModel,
    X: np.ndarray,
    y: np.ndarray,
    cv: int = 5,
) -> Dict[str, Any]:
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
    if hasattr(model.model, "named_steps"):
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
