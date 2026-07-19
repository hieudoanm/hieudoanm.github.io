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

## Original PDF Structure
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

## Performance Results
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

## Neuroimaging Machine Learning
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

## Common Failure
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

## Final Validation
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
