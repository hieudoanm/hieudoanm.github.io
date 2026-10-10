# Machine Learning Replication Example

## Purpose

This example demonstrates how to design and evaluate a replication of a machine-learning study.

The example focuses on a hypothetical neuroimaging model that predicts cognitive impairment from structural MRI.

The goal is to show how replication principles apply when:

- Models can overfit
- Datasets differ across sites
- Preprocessing can leak information
- Hyperparameter tuning can contaminate evaluation
- Performance depends strongly on the evaluation protocol
- External validation may be more informative than internal cross-validation

---

## Research question
Suppose an original study asks:

> Can structural MRI predict whether an individual has mild cognitive impairment?

The original study reports that a machine-learning model achieves high classification performance.

The replication should begin with:

```text
Does structural MRI contain predictive information
that generalises to new individuals?
```

Not:

```text
Can we reproduce the original accuracy?
```

---

## Identify the replication target
Before designing the replication, specify:

```text
Population:
Adults with and without MCI

Input:
Structural MRI

Target:
MCI classification

Primary metric:
AUC

Secondary metrics:
Sensitivity
Specificity
Balanced accuracy
Calibration
```

If the original study emphasises AUC, preserve it as the primary metric.

---

## Compare effect estimates
For ML replication, the analogue of an effect size may be:

```text
AUC
RMSE
MAE
R²
Accuracy
F1
```

Compare:

```text
Estimate
+
Confidence interval
+
Evaluation protocol
```

rather than only:

```text
Best reported score
```

---

## Feature-importance replication
If the original claim includes a biological interpretation, replicate both:

```text
Predictive performance
```

and, where justified:

```text
Feature importance
```

But do not assume that the same feature ranking must appear exactly.

Feature importance can be unstable across samples.

---

## Architecture replication
For deep learning, distinguish:

```text
Same architecture
```

from:

```text
Same scientific question.
```

A new architecture may produce different performance while still testing the same prediction problem.

Do not interpret algorithmic differences as biological contradictions without evidence.

---

## ML replication result example
Suppose:

```text
Original:
AUC = .89
95% CI [.86, .92]

Replication:
AUC = .83
95% CI [.79, .87]
```

The model performs worse but remains above chance and potentially useful.

A reasonable interpretation is:

> The predictive relationship generalises to the independent cohort, but performance is lower than originally reported.

Do not claim:

```text
The replication failed.
```

without defining what would count as failure.

---

## Leaderboard effects
A model may appear better because:

```text
Researchers repeatedly optimise
against the same benchmark.
```

The reported performance can therefore become inflated.

Replication should consider whether the benchmark remains genuinely held out.

---
