"""The baseline estimators themselves.

`baselines.py` trains, scores and cross-validates them; this module only
defines what they are, so the sklearn wiring sits in one place.
"""

import joblib
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


class BaselineModel:
    """Base class for baseline models."""

    def __init__(
        self,
        random_state: int = 42,
        class_weight: str | None = "balanced",
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

    def fit(self, X: np.ndarray, y: np.ndarray) -> BaselineModel:
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
        if not self.is_fitted or self.model is None:
            raise ValueError("Model must be fitted before prediction")
        return self.model.predict(X)

    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        """Predict class probabilities.

        Args:
            X: Features

        Returns:
            Predicted probabilities
        """
        if not self.is_fitted or self.model is None:
            raise ValueError("Model must be fitted before prediction")
        return self.model.predict_proba(X)

    def save(self, path: str) -> None:
        """Save the fitted estimator to disk.

        Args:
            path: Path to save model
        """
        joblib.dump(self.model, path)

    def load(self, path: str) -> BaselineModel:
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
        solver: str = "lbfgs",
        max_iter: int = 1000,
        random_state: int = 42,
        class_weight: str | None = "balanced",
    ):
        """Initialize logistic regression baseline.

        scikit-learn 1.8 deprecated the `penalty` argument in favour of
        `l1_ratio`, so the default L2 penalty is left unset on purpose.

        Args:
            C: Inverse regularization strength
            solver: Solver to use
            max_iter: Maximum iterations
            random_state: Random seed
            class_weight: Class weighting
        """
        super().__init__(random_state, class_weight)
        self.C = C
        self.solver = solver
        self.max_iter = max_iter

        self.model = Pipeline([
            ("scaler", StandardScaler()),
            ("logreg", LogisticRegression(
                C=C,
                solver=solver,
                max_iter=max_iter,
                random_state=random_state,
                class_weight=class_weight,
            )),
        ])

    def fit(self, X: np.ndarray, y: np.ndarray) -> LogisticRegressionBaseline:
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
    ):
        """Initialize gradient boosting baseline.

        Args:
            n_estimators: Number of trees
            learning_rate: Learning rate
            max_depth: Maximum tree depth
            random_state: Random seed
        """
        super().__init__(random_state)
        self.n_estimators = n_estimators
        self.learning_rate = learning_rate
        self.max_depth = max_depth

        # scikit-learn's GradientBoostingClassifier has no class_weight; the
        # imbalance is handled by the evaluation metrics and the split, so the
        # accepted `class_weight` argument would be silently ignored here.
        self.model = GradientBoostingClassifier(
            n_estimators=n_estimators,
            learning_rate=learning_rate,
            max_depth=max_depth,
            random_state=random_state,
        )

    def fit(self, X: np.ndarray, y: np.ndarray) -> GradientBoostingBaseline:
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
