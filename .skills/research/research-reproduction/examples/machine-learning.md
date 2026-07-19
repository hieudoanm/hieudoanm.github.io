# Example: Machine-Learning Research Reproduction

## Reproduction Target
The paper reports:

```text id="9n2j7v"
Test accuracy = 0.88
Test AUC = 0.93
```

The reproduction asks:

> Can the published test-set performance be recovered using the original dataset, split, preprocessing, model, and evaluation procedure?

---

## Dataset Validation
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

## Preprocessing Validation
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

## Cross-Validation
The paper uses:

```text id="n6k3r5"
5-fold cross-validation
```

for model selection.

The held-out test set remains untouched until the final evaluation.

The reproduction preserves this distinction.

---

## Performance Reproduction
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

## Prediction-Level Validation
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

## Failed Reproduction Example
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

## Result Classification
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

## Final Reproduction Statement
> The published machine-learning result was closely reproduced. The original test-set performance was 0.88 accuracy and 0.93 AUC, while the reproduction achieved a mean accuracy of 0.87 and mean AUC of 0.92 across 10 random seeds. The dataset, subject-level partitioning, preprocessing, model architecture, cross-validation procedure, and evaluation protocol were consistent with the original study.

---
