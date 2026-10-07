# Example: Machine-Learning Research Reproduction

## Scenario

A machine-learning paper proposes a neural network for predicting cognitive impairment from structural MRI features.

The paper reports:

- 1,200 participants
- 256 MRI-derived features
- subject-level train/test splitting
- a neural network classifier
- five-fold cross-validation
- AUC as the primary metric

The reproduction target is the reported test-set performance.

---

## 1. Reproduction Target

The paper reports:

```text id="9n2j7v"
Test accuracy = 0.88
Test AUC = 0.93
```

The reproduction asks:

> Can the published test-set performance be recovered using the original dataset, split, preprocessing, model, and evaluation procedure?

---

## 2. Original Pipeline

```text id="7c4m9x"
MRI dataset
   ↓
Quality control
   ↓
Feature extraction
   ↓
Standardisation
   ↓
Subject-level split
   ↓
Training data
   ↓
5-fold cross-validation
   ↓
Hyperparameter selection
   ↓
Final model
   ↓
Held-out test set
   ↓
Accuracy / AUC
```

---

## 3. Dataset Validation

Original:

```text id="r3q7s1"
Participants: 1,200
Features: 256
Classes: 2
```

Reproduction:

```text id="k8v4m2"
Participants: 1,200
Features: 256
Classes: 2
```

The dataset dimensions match.

---

## 4. Subject-Level Split

The paper specifies:

```text id="5m9x7q"
Training: 840 participants
Validation: 120 participants
Test: 240 participants
```

The split is performed at the **participant level**.

The reproduction obtains the same counts.

This is critical because each participant may have multiple MRI-derived observations.

---

## 5. Data-Leakage Check

The reproduction verifies:

```text id="w2f6k8"
Training participants ∩ Test participants = ∅
```

and:

```text id="q4n8s2"
Validation participants ∩ Test participants = ∅
```

No participant appears in more than one partition.

---

## 6. Preprocessing Validation

The original preprocessing is:

```text id="m5v7p9"
Missing-value handling
        ↓
Feature standardisation
        ↓
Feature selection
```

The reproduction uses the same procedure.

Importantly, the standardisation parameters are fitted using the training data only.

The reproduction does **not** calculate the mean and standard deviation using the complete dataset.

---

## 7. Model Configuration

Original model:

```text id="z8c3m1"
Input features: 256
Hidden layer: 128 units
Hidden layer: 64 units
Output: 2 classes
Dropout: 0.2
Learning rate: 0.001
Batch size: 32
Epochs: 100
```

The reproduction uses the same configuration.

---

## 8. Cross-Validation

The paper uses:

```text id="n6k3r5"
5-fold cross-validation
```

for model selection.

The held-out test set remains untouched until the final evaluation.

The reproduction preserves this distinction.

---

## 9. Performance Reproduction

Original:

```text id="1b7m4x"
Accuracy = 0.88
AUC = 0.93
```

Single reproduction run:

```text id="q8c2v6"
Accuracy = 0.87
AUC = 0.92
```

Comparison:

| Metric   | Original | Reproduced |
| -------- | -------: | ---------: |
| Accuracy |     0.88 |       0.87 |
| AUC      |     0.93 |       0.92 |

---

## 10. Stochastic Variation

Because neural-network training is stochastic, the reproduction is repeated across 10 random seeds.

Results:

```text id="x7p5n3"
Accuracy:
Mean = 0.87
SD = 0.01

AUC:
Mean = 0.92
SD = 0.01
```

The original reported values fall within the range of expected computational variation.

---

## 11. Prediction-Level Validation

Summary metrics are not sufficient.

The reproduction also compares:

```text id="j6v9q2"
Predicted probabilities
Confusion matrix
ROC curve
Classification errors
```

The confusion matrices are similar, although individual predictions differ for some participants.

This is expected for a stochastic model.

---

## 12. Failed Reproduction Example

Suppose the researcher accidentally performs:

```text id="v5m8r2"
Random sample-level split
```

instead of:

```text id="z3q7n6"
Subject-level split
```

The model obtains:

```text id="m4c8x1"
Accuracy = 0.96
AUC = 0.99
```

This appears better than the original.

It is **not** a successful reproduction.

The data-splitting procedure is different and may introduce leakage.

---

## 13. Another Failure: Preprocessing Leakage

Suppose standardisation is performed before splitting:

```text id="p9r4w7"
Entire dataset
   ↓
Standardise
   ↓
Train/test split
```

instead of:

```text id="s2k6m8"
Training set
   ↓
Fit scaler
   ↓
Transform training set

Test set
   ↓
Transform using training scaler
```

This changes the computational procedure.

Even if the resulting AUC is close to 0.93, the analysis is not a faithful reproduction.

---

## 14. Result Classification

The correctly implemented reproduction is:

```text id="c8n2v5"
Close reproduction
```

because:

- dataset matches
- feature dimensions match
- subject-level split matches
- preprocessing matches
- model architecture matches
- evaluation procedure matches
- performance is within expected stochastic variation

---

## 15. Final Reproduction Statement

> The published machine-learning result was closely reproduced. The original test-set performance was 0.88 accuracy and 0.93 AUC, while the reproduction achieved a mean accuracy of 0.87 and mean AUC of 0.92 across 10 random seeds. The dataset, subject-level partitioning, preprocessing, model architecture, cross-validation procedure, and evaluation protocol were consistent with the original study.

---

## Machine-Learning Lessons

This example demonstrates why ML reproduction must validate more than headline performance.

Check:

- dataset version
- participant count
- feature dimensions
- train/test split
- unit of splitting
- preprocessing
- feature selection
- model architecture
- hyperparameters
- random seeds
- cross-validation
- test-set isolation
- evaluation metrics
- data leakage

A model producing the same accuracy is not necessarily a reproduction if the data-processing or evaluation procedure is different.
