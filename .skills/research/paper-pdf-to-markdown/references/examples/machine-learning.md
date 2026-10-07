# Example: Machine-Learning Paper

## Scenario

A machine-learning paper contains:

- Mathematical model definitions
- Dataset descriptions
- Feature definitions
- Training and test splits
- Cross-validation
- Hyperparameters
- Performance metrics
- Baseline models
- Architecture diagrams
- Performance tables

The conversion must preserve enough information to understand and reproduce the computational experiment.

---

## 1. Original PDF Structure

A typical ML paper might contain:

```text
Title
Authors

Abstract

1. Introduction

2. Related Work

3. Dataset

4. Methods
   4.1 Preprocessing
   4.2 Feature Extraction
   4.3 Model
   4.4 Training
   4.5 Hyperparameters

5. Experiments
   5.1 Experimental Setup
   5.2 Baselines
   5.3 Evaluation Metrics

6. Results

7. Discussion

8. Conclusion

References
```

---

## 2. Dataset Description

Suppose the paper states:

> The dataset contains 12,000 samples with 128 features and three target classes.

Preserve:

```markdown
The dataset contains 12,000 samples with 128 features
and three target classes.
```

Do not shorten this to:

```markdown
The study used a large dataset.
```

Dataset dimensions are scientifically relevant.

---

## 3. Train/Test Split

Suppose the paper states:

> The data were divided into training (80%), validation (10%), and test (10%) sets.

Preserve:

```markdown
The data were divided into:

- Training: 80%
- Validation: 10%
- Test: 10%
```

If the paper specifies subject-level splitting, preserve that explicitly:

```markdown
The split was performed at the subject level to prevent
observations from the same participant appearing in multiple
data partitions.
```

Do not assume this if the source does not say so.

---

## 4. Mathematical Model

Suppose the PDF contains:

> L(θ) = −Σᵢ yᵢ log pθ(yᵢ|xᵢ)

Represent it using LaTeX:

```markdown
$$
L(\theta)
=
-\sum_i y_i \log p_\theta(y_i \mid x_i)
$$
```

Preserve:

- variable names
- subscripts
- superscripts
- Greek symbols
- signs
- summation limits
- mathematical operators

---

## 5. Model Configuration

Suppose the paper reports:

```text
Learning rate: 0.001
Batch size: 64
Epochs: 100
Dropout: 0.2
Hidden units: 256
```

Represent it explicitly:

```markdown
| Hyperparameter | Value |
| -------------- | ----: |
| Learning rate  | 0.001 |
| Batch size     |    64 |
| Epochs         |   100 |
| Dropout        |   0.2 |
| Hidden units   |   256 |
```

Do not round:

```text
0.001 → 0.01
```

or otherwise normalize numerical precision.

---

## 6. Performance Results

Suppose the paper reports:

| Model               | Accuracy |  AUC |
| ------------------- | -------: | ---: |
| Logistic Regression |     0.81 | 0.86 |
| Random Forest       |     0.84 | 0.89 |
| Neural Network      |     0.88 | 0.93 |

Preserve the table:

```markdown
| Model               | Accuracy |  AUC |
| ------------------- | -------: | ---: |
| Logistic Regression |     0.81 | 0.86 |
| Random Forest       |     0.84 | 0.89 |
| Neural Network      |     0.88 | 0.93 |
```

Do not replace it with:

```markdown
The neural network performed best.
```

That statement loses the numerical evidence.

---

## 7. Evaluation Metrics

Preserve the exact metric definitions when provided.

For example:

```markdown
### Evaluation Metrics

Performance was evaluated using:

- Accuracy
- Precision
- Recall
- F1 score
- Area under the ROC curve (AUC)
```

If the paper distinguishes macro-F1 from weighted-F1, preserve that distinction:

```text
Macro-F1
Weighted-F1
```

Do not collapse them into simply:

```text
F1
```

---

## 8. Baseline Models

Baseline models are part of the scientific experiment.

Preserve:

```markdown
### Baselines

The proposed model was compared against:

1. Logistic Regression
2. Random Forest
3. Support Vector Machine
4. Neural Network
```

If preprocessing differs between baselines, preserve that information as well.

---

## 9. Machine-Learning-Specific Quality Control

Check:

### Dataset

Verify:

- number of samples
- number of features
- number of classes
- class labels
- missing values

### Data splits

Verify:

- train/test proportions
- validation strategy
- subject-level vs sample-level splitting
- temporal splitting
- site-level splitting

### Cross-validation

Preserve:

```text
5-fold cross-validation
```

rather than merely:

```text
cross-validation
```

### Hyperparameters

Verify:

- learning rate
- batch size
- epochs
- regularisation
- dropout
- tree depth
- number of estimators
- kernel parameters

### Random seeds

If reported, preserve them:

```text
Random seed = 42
```

### Metrics

Verify:

- Accuracy
- Precision
- Recall
- F1
- AUC
- MAE
- MSE
- RMSE
- R²

Do not assume that similarly named metrics have identical definitions.

---

## 10. Neuroimaging Machine Learning

Additional checks are required when ML is applied to neuroimaging.

Preserve information such as:

```text
Subject-level split
Voxel dimensions
Atlas
ROI definitions
Preprocessing pipeline
Feature selection
Cross-validation strategy
External validation
```

For example:

```markdown
The train/test split was performed at the participant level,
ensuring that scans from the same participant did not occur
in both partitions.
```

This information can be essential for identifying data leakage.

---

## 11. Common Failure

Suppose the PDF states:

```text
5-fold subject-level cross-validation
```

An extraction might reduce this to:

```text
5-fold cross-validation
```

That is incomplete because the unit of splitting has been lost.

Similarly:

```text
AUC = 0.93
```

should not become:

```text
Accuracy = 0.93
```

because the metric itself carries scientific meaning.

---

## 12. Final Validation

For machine-learning papers, compare the Markdown against the PDF for:

- dataset size
- feature dimensions
- class labels
- train/test split
- validation strategy
- cross-validation folds
- subject-level splitting
- preprocessing
- feature selection
- model architecture
- mathematical equations
- hyperparameters
- random seeds
- baseline models
- metric definitions
- performance values
- confidence intervals
- tables
- figure captions
- references

### Final principle

> A successful ML paper conversion preserves the computational experiment: what data were used, how they were split, what model was trained, how it was evaluated, and what numerical results were obtained.
