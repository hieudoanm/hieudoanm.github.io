# Clinical Neuroscience Example

## Purpose

This example demonstrates how to conduct and interpret a meta-analysis in clinical neuroscience.

The example is hypothetical. The numerical results are illustrative rather than results from a real evidence synthesis.

The example focuses on an important clinical-neuroscience question:

> **Does rehabilitation improve language outcomes after stroke?**

This example combines issues from:

- Clinical trials
- Neuropsychological measurement
- Language outcomes
- Heterogeneous patient populations
- Functional recovery
- Intervention intensity
- Risk of bias
- Clinical significance

The central lesson is that a clinically meaningful meta-analysis must distinguish between:

```text
Statistical evidence
        ↓
Clinical importance
        ↓
Patient-level relevance
        ↓
Generalisability
```

---

## Define the Research Question
A structured question might be:

> Among adults with post-stroke aphasia, do language rehabilitation interventions improve language outcomes compared with usual care, no treatment, or alternative rehabilitation?

Using a PICO framework:

| Component    | Definition                                              |
| ------------ | ------------------------------------------------------- |
| Population   | Adults with post-stroke aphasia                         |
| Intervention | Language rehabilitation                                 |
| Comparator   | Usual care, no treatment, or alternative rehabilitation |
| Outcome      | Language performance                                    |
| Time         | Post-intervention and follow-up                         |

A more specific question could be:

> What is the effect of speech and language therapy on functional language outcomes after stroke?

The exact outcome definition matters because "language recovery" can refer to very different things.

---

## Random-Effects Meta-Analysis
Suppose 38 studies are pooled.

The overall result is:

```text
Hedges' g = 0.36
95% CI [0.25, 0.47]
```

The basic interpretation is:

> Language rehabilitation is associated with better language outcomes than the comparison conditions on average.

But the pooled effect should not be interpreted in isolation.

We still need to examine:

```text
Heterogeneity
Risk of bias
Clinical significance
Outcome domain
Stroke stage
Treatment dose
Control condition
```

---

## Sensitivity Analysis
Suppose the primary analysis gives:

```text
g = 0.36
95% CI [0.25, 0.47]
```

Now remove studies judged to have high risk of bias:

```text
g = 0.31
95% CI [0.20, 0.42]
```

Remove the most influential study:

```text
g = 0.34
95% CI [0.23, 0.45]
```

Use only studies with active comparators:

```text
g = 0.22
95% CI [0.10, 0.34]
```

The overall direction remains positive.

However, the effect becomes smaller under the more demanding comparison.

This would support a cautious conclusion that rehabilitation appears beneficial, while avoiding the stronger claim that it is dramatically superior to all alternative care.

---

## Clinical Interpretation
Suppose the final evidence is:

```text
Pooled effect
g = 0.36

95% CI
[0.25, 0.47]

I²
71%

Prediction interval
[-0.08, 0.80]

Sensitivity analyses
Direction generally stable

Active-control analysis
Smaller effect
```

A calibrated conclusion might be:

> Language rehabilitation is associated with improved language outcomes after stroke, with a small-to-moderate average effect across the available trials. However, effects vary substantially between studies and are smaller when compared with active rehabilitation rather than minimal or no treatment. The evidence therefore supports rehabilitation as beneficial on average, while the magnitude of benefit for an individual patient is likely to depend on factors such as stroke stage, baseline impairment, treatment dose, intervention type, and outcome domain.

This is much stronger scientifically than:

> "Speech therapy works for stroke patients."

---

## What the Meta-Analysis Cannot Tell a Clinician
A pooled effect does not directly answer:

- Which treatment is best for a particular patient?
- How many therapy sessions does one patient need?
- Which therapy is optimal for a specific aphasia subtype?
- Whether a patient will personally improve
- Whether neural changes caused the behavioural improvement
- Whether the treatment is cost-effective
- Whether an intervention is feasible in every healthcare setting

These questions require additional evidence.

A meta-analysis provides population-level synthesis, not a personalised treatment prescription.

---
