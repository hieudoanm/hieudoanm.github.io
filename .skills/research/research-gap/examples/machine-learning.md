# Research Gap Example: Machine Learning

## Purpose

This example demonstrates how to identify, validate, and formulate research gaps in machine learning research.

The example focuses on **machine learning for neuroimaging-based prediction**, but the reasoning applies more broadly to:

- Computer vision
- Natural language processing
- Healthcare AI
- Time-series modelling
- Computational neuroscience
- Recommender systems
- Predictive modelling
- Generative AI

The example is intentionally simplified. It demonstrates the research-gap reasoning process rather than representing a complete systematic review.

---

## Validate the generalisation gap
Search for evidence of:

- External validation
- Multi-site validation
- Independent cohorts
- Prospective validation
- Scanner variation
- Protocol variation
- Demographic variation
- Disease-spectrum variation

Suppose the literature shows:

```text
Internal validation
████████████████████

External validation
████
```

This supports the candidate gap.

But the search should continue.

---

## Search for evidence against the gap
Search specifically for:

```text
MRI cognitive impairment external validation

multisite MRI machine learning validation

cross-site neuroimaging prediction

external validation neuroimaging machine learning

prospective validation MRI cognitive prediction
```

Suppose several recent papers now demonstrate strong multi-site validation.

The original gap:

> External validation is absent.

is no longer defensible.

The gap must be narrowed.

---

## Candidate gap: target definition
Machine-learning models are only as meaningful as their target.

Suppose "cognitive impairment" is defined differently across studies:

```text
Clinical diagnosis
        vs
Cut-off on cognitive test
        vs
Composite score
        vs
Expert judgement
```

A model trained on one definition may not generalise to another.

Candidate gap:

> Variation in cognitive-impairment definitions limits comparability and may affect the apparent generalisability of MRI-based prediction models.

This is a **measurement/label-definition gap**.

---

## Candidate gap: interpretability
Suppose a model predicts well but provides little insight into what it has learned.

A candidate gap is:

> It remains unclear whether high-performing MRI prediction models rely on neurobiologically meaningful patterns or imaging artefacts and confounds.

Potential research question:

> Do features identified as predictive by MRI-based machine-learning models correspond to biologically plausible markers of cognitive impairment?

This connects predictive modelling with neuroscience.

---

## Candidate gap: sample size versus dimensionality
Consider:

```text
N = 150 participants

MRI features = 100,000+
```

The ratio between observations and potential features is challenging.

A model may fit complex patterns that do not generalise.

Potential gap:

> It remains unclear how stable MRI-based predictive performance is across independently sampled cohorts of limited size and high-dimensional feature spaces.

This is not necessarily solved by choosing a more complex algorithm.

---

## Compare candidate gaps
| Candidate                   | Evidence    | Importance | Novelty     | Feasibility |
| --------------------------- | ----------- | ---------- | ----------- | ----------- |
| New algorithm               | Low         | Low/Medium | Low         | High        |
| External validation         | High        | Very high  | High        | Medium      |
| Scanner generalisation      | High        | Very high  | High        | Medium      |
| Demographic generalisation  | High        | Very high  | High        | Medium      |
| Label-definition robustness | Medium/High | High       | High        | Medium      |
| Biological interpretability | High        | High       | High        | Medium      |
| Calibration                 | High        | High       | Medium/High | High        |
| Clinical utility            | High        | Very high  | High        | Medium/Low  |
| Leakage robustness          | Medium/High | High       | High        | High        |
| Benchmark generalisation    | High        | High       | High        | Medium      |

Again, the most interesting gap is not necessarily the one involving the newest algorithm.

---

## Formulate a validated gap
Suppose the literature supports:

> Machine-learning models can predict cognitive impairment from structural MRI with strong performance under internal validation. Increasing numbers of studies have also evaluated multi-site datasets. However, performance often varies across sites, scanners, and populations, and calibration and biological interpretability are less consistently evaluated than discrimination. Consequently, it remains unclear how robustly these models capture generalisable neurobiological signals rather than site-specific characteristics.

A defensible gap is:

> The extent to which structural-MRI prediction models capture generalisable neurobiological information rather than site-specific imaging characteristics remains uncertain, particularly when models are evaluated across heterogeneous scanners and patient populations.

---

## Convert the gap into a research question
A corresponding question could be:

> How does structural-MRI model performance change when predicting cognitive impairment across independent sites with different scanners and participant populations?

This directly targets the generalisation problem.

---
