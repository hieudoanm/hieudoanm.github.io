# Research Gap Example: Clinical Neuroscience

## Purpose

This example demonstrates how to identify, validate, and formulate a research gap in clinical neuroscience.

The example focuses on **language recovery after stroke**, particularly aphasia, because clinical neuroscience research often combines:

- Clinical outcomes
- Behavioural measurements
- Neuroimaging
- Individual differences
- Longitudinal recovery
- Prediction
- Intervention
- Mechanistic interpretation

The example is intentionally simplified. It demonstrates the reasoning process rather than representing a complete systematic review.

---

## Validate the prediction gap
Search for studies reporting:

- Training and test sets
- Cross-validation
- External validation
- Independent cohorts
- Prediction intervals
- Calibration
- AUC
- MAE
- RMSE
- R²
- Clinical utility

Suppose many studies report strong performance using internal cross-validation, but few use independent external datasets.

This suggests a possible generalisation problem.

---

## Candidate gap: external validation
The candidate becomes:

> Many prediction models for post-stroke language recovery have been developed, but their performance on independent patient cohorts remains insufficiently established.

This is stronger than:

> More machine-learning models are needed.

The problem is not the absence of another algorithm.

The problem is:

```text
Development
    ↓
Internal validation
    ↓
???
    ↓
External validation
```

The missing evidence is whether the model generalises.

---

## Search for evidence against the gap
Search specifically for:

```text
stroke aphasia prediction external validation

language recovery stroke independent cohort prediction

aphasia outcome prediction external validation

stroke language recovery machine learning validation

aphasia prognosis multicentre validation
```

The goal is to find studies that might have already closed the gap.

Suppose several recent studies perform external validation.

The original gap is therefore too broad.

---

## Candidate gap: measurement
Clinical neuroscience often uses many different language outcomes.

For example:

```text
Naming
Comprehension
Repetition
Reading
Writing
Spontaneous speech
Composite language score
```

A prediction model trained to predict one outcome may not generalise to another.

Suppose studies use different measures of "language recovery."

This creates a measurement problem.

Candidate gap:

> Variation in outcome definitions limits the comparability of language-recovery prediction studies and makes it difficult to determine whether models generalise across clinically meaningful language domains.

This could motivate harmonisation or multi-outcome modelling.

---

## Compare candidate gaps
| Candidate                     | Evidence         | Importance | Novelty | Feasibility |
| ----------------------------- | ---------------- | ---------- | ------- | ----------- |
| Identify predictors           | Low uncertainty  | High       | Low     | High        |
| Individual prediction         | High uncertainty | High       | Medium  | High        |
| External validation           | High uncertainty | Very high  | High    | Medium      |
| Recovery-stage generalisation | High uncertainty | High       | High    | Medium      |
| Treatment response            | High uncertainty | Very high  | High    | Medium/Low  |
| Mechanism                     | High uncertainty | Very high  | High    | Low/Medium  |
| Outcome harmonisation         | Medium/High      | High       | High    | Medium      |
| Dataset shift                 | High uncertainty | Very high  | High    | Medium      |

The best research gap depends on:

```text
Scientific importance
+
Clinical importance
+
Evidence of uncertainty
+
Available data
+
Feasibility
```

---

## Formulate a validated gap
Suppose the literature supports the following conclusion:

> Numerous studies have identified behavioural, lesion-based, and neuroimaging predictors of language outcome after stroke. However, many prediction models are evaluated using internal validation, while evidence for robust performance across independent patient populations remains more limited. Differences in recovery stage, clinical characteristics, imaging acquisition, and language outcome measures may further affect model generalisability.

A defensible gap statement is:

> The extent to which multimodal prediction models of post-stroke language recovery generalise across independent patient populations and clinically relevant differences in recovery stage and outcome measurement remains uncertain.

This is specific and testable.

---

## Convert the gap into a research question
A corresponding question could be:

> How accurately does a multimodal model trained to predict post-stroke language outcome generalise to an independent patient cohort with different clinical and demographic characteristics?

This directly tests generalisation.

---
