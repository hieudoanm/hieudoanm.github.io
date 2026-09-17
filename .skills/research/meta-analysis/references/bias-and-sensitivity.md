# Bias and Sensitivity Analysis

A practical guide to identifying bias in meta-analysis and testing whether conclusions depend on particular studies, assumptions, or analytical decisions.

The central principle is:

> **A pooled estimate is only as credible as the evidence and analytical decisions that produce it. Bias assessment asks whether the evidence systematically points away from the truth; sensitivity analysis asks whether the conclusion survives reasonable alternative assumptions.**

---

## Main Sources of Bias in Meta-Analysis
Important sources include:

```text
Study-level bias
Publication bias
Selective reporting
Selective analysis
Outcome measurement bias
Selection bias
Confounding
Small-study effects
Duplicate publication
Dependent samples
Researcher degrees of freedom
```

The exact risks depend on the research design.

---

## Risk of Bias vs Reporting Bias
These concepts should be distinguished.

#### Risk of bias

Concerns whether a study's design or conduct could systematically distort its result.

#### Reporting bias

Concerns whether the evidence that becomes visible in the literature is systematically different from the evidence that exists.

For example:

```text
Study conducted
      ↓
Null result
      ↓
Not published
```

can create reporting bias even if the original study was methodologically sound.

---

## Selective Analysis Reporting
Researchers may try several reasonable analyses and report only the most favourable one.

For example:

```text
Analysis A → p = .20
Analysis B → p = .08
Analysis C → p = .03
Analysis D → p = .15
```

If only C is reported, the published result can give a misleading impression of evidential strength.

Meta-analysis inherits this problem.

---

## Sensitivity Analysis Matrix
A useful reporting table is:

| Analysis            | Studies | Effect | CI        | Interpretation |
| ------------------- | ------: | -----: | --------- | -------------- |
| Primary             |      24 |   0.48 | 0.32–0.64 | Positive       |
| Exclude high-risk   |      15 |   0.31 | 0.12–0.50 | Smaller        |
| Exclude influential |      23 |   0.44 | 0.29–0.59 | Similar        |
| Long-term only      |      11 |   0.18 | 0.02–0.34 | Small          |
| Alternative model   |      24 |   0.45 | 0.28–0.62 | Similar        |

The point is not to select the "best-looking" row.

The point is to show how conclusions respond to assumptions.

---

## Bias in Neuroimaging Meta-Analysis
Neuroimaging studies may be affected by:

```text
Small samples
Selective reporting
Multiple comparisons
Flexible preprocessing
Thresholding choices
Peak reporting
Publication bias
Non-independent contrasts
```

A statistically significant reported brain region is therefore not automatically an unbiased estimate of the underlying effect.

---

## Bias and Certainty of Evidence
Bias assessment ultimately feeds into the certainty of the evidence.

Conceptually:

```text
Study quality
     ↓
Risk of bias
     ↓
Confidence in pooled effect
     ↓
Certainty of evidence
```

A narrow confidence interval does not guarantee high certainty.

---

## Bias and Sensitivity Reporting
A strong report should explain:

```text
Which biases were considered
How risk of bias was assessed
Which studies had important concerns
Which sensitivity analyses were performed
Why those analyses were chosen
How estimates changed
How this affected interpretation
```

Avoid simply writing:

> Sensitivity analyses were performed.

The reader needs to know what changed and why.

---

## Bias and Sensitivity Checklist
```text
□ Was risk of bias assessed systematically?
□ Were design-appropriate bias domains used?
□ Were duplicate datasets identified?
□ Was selective outcome reporting considered?
□ Was publication bias considered?
□ Was the search broad enough to reduce selection bias?
□ Were unpublished or grey-literature sources considered where appropriate?
□ Was funnel asymmetry examined when appropriate?
□ Were small-study effects considered?
□ Were influential studies identified?
□ Was leave-one-out analysis considered?
□ Were high-risk studies examined separately?
□ Were alternative effect-size choices tested where justified?
□ Were alternative time points examined where relevant?
□ Were alternative models examined?
□ Were sensitivity analyses predefined?
□ Were all reasonable analyses reported?
□ Did conclusions change materially?
□ Is the final interpretation calibrated to robustness?
```

---
