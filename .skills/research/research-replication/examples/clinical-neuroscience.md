# Clinical Neuroscience Replication Example

## Purpose

This example demonstrates how to design and evaluate a replication in clinical neuroscience.

The example focuses on a hypothetical study investigating whether baseline neuroimaging and behavioural measures can predict language recovery after stroke.

The purpose is to show how replication principles apply when:

- Patients are clinically heterogeneous
- Outcomes are clinically meaningful
- Recovery changes over time
- Samples are often relatively small
- Neuroimaging measurements vary across sites
- Prediction models can easily suffer from data leakage
- Statistical significance alone is insufficient

---

## Research question
Suppose an original study asks:

> Can baseline brain and behavioural measures predict language recovery after stroke?

The original study reports that a combination of:

```text
Baseline language impairment
+
Lesion characteristics
+
Neuroimaging measures
```

predicts language outcome several months later.

The replication should begin with the scientific claim:

```text
Baseline information contains predictive information
about later language recovery after stroke.
```

Not:

```text
Run the same machine-learning code again.
```

---

## Replication design
A close external replication might use:

```text
Original:
Hospital A
120 patients
Baseline MRI
Baseline language assessment
6-month outcome

Replication:
Hospital B
150 new patients
Baseline MRI
Baseline language assessment
6-month outcome
```

The core prediction question remains unchanged.

---

## Replication of a neural mechanism
Suppose the original study claims:

> Functional connectivity predicts language recovery because it reflects preserved language-network integrity.

A replication should distinguish:

```text
Predictive replication
```

from:

```text
Mechanistic replication
```

Reproducing predictive accuracy does not automatically validate the proposed mechanism.

---

## Example replication results
Suppose:

```text
Original:
R² = 0.42
95% CI [0.30, 0.52]

Replication:
R² = 0.31
95% CI [0.22, 0.39]
```

The model still predicts meaningful outcome variation.

However, performance is lower.

Possible conclusion:

> The replication provides broadly consistent evidence that baseline measures contain predictive information about later language outcome, although predictive performance was lower in the independent cohort.

---

## Do not overinterpret model failure
A failed external validation can result from:

```text
Dataset shift
Measurement differences
Scanner differences
Outcome differences
Clinical differences
Implementation errors
Preprocessing differences
Original overfitting
```

Therefore investigate the failure before concluding:

```text
The biological relationship does not exist.
```

---

## Replication result matrix
A useful summary is:

| Dimension      | Original               | Replication            | Assessment    |
| -------------- | ---------------------- | ---------------------- | ------------- |
| Population     | Aphasia after stroke   | Aphasia after stroke   | Similar       |
| N              | 120                    | 150                    | Larger        |
| Outcome        | 6-month language score | 6-month language score | Same          |
| Imaging        | MRI                    | MRI                    | Same modality |
| Site           | Hospital A             | Hospital B             | Different     |
| Model          | Regularised regression | Same model             | Same          |
| R²             | .42                    | .31                    | Lower         |
| Baseline model | .28                    | .27                    | Similar       |
| Imaging gain   | .14                    | .04                    | Reduced       |

This makes the interpretation clearer than reporting a single model score.

---

## Overall interpretation
A reasonable conclusion might be:

> The original predictive relationship was partially replicated in an independent clinical cohort. Baseline behavioural and neuroimaging measures predicted six-month language outcome above the clinical baseline model, but the incremental contribution of neuroimaging was substantially smaller than originally reported. This suggests that the general prognostic relationship is plausible, while the magnitude and clinical value of the additional neuroimaging information remain uncertain.

This is more informative than:

> The model replicated.

---
