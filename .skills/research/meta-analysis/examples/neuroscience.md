# Example: Neuroscience Meta-Analysis

A worked example showing how to apply the meta-analysis skill to a neuroscience research question.

This example is hypothetical. The numerical values are illustrative rather than results from a real published meta-analysis.

---

## Research Question
Suppose researchers want to investigate:

> Does cognitive training improve working-memory performance in healthy adults?

A quantitative synthesis could ask:

```text
Population:
Healthy adults

Intervention:
Working-memory or cognitive training

Comparator:
Active or passive control

Outcome:
Working-memory performance

Target effect:
Difference between training and control groups
```

The question is specific enough to support quantitative synthesis.

---

## Choose the Effect Size
Suppose the studies use different working-memory tests.

For example:

```text
Study A → N-back accuracy
Study B → Digit span
Study C → Operation span
Study D → Spatial memory score
```

A Standardised Mean Difference may be appropriate if these measures are considered sufficiently comparable indicators of working-memory performance.

A common choice is:

```text
Hedges' g
```

---

## Example Study Effects
Suppose the extracted effects are:

```text
Study A → g = 0.20
Study B → g = 0.45
Study C → g = 0.05
Study D → g = 0.35
Study E → g = 0.60
Study F → g = -0.10
```

There is clearly some variation.

The meta-analysis should not simply average these numbers.

Each estimate has different precision.

---

## Hypothetical Pooled Result
Suppose the analysis produces:

```text
Hedges' g = 0.31
95% CI = [0.20, 0.42]
```

A basic interpretation would be:

> Across the included studies, cognitive training was associated with a small-to-moderate improvement in working-memory performance.

But this is not the end of the analysis.

---

## Neuroimaging Meta-Analysis Is Not Just "Pool the Coordinates"
Coordinate-based neuroimaging meta-analysis may work with:

```text
Activation peaks
```

rather than conventional effect sizes.

Different methods include approaches such as:

```text
ALE
Activation likelihood methods
Multilevel coordinate approaches
Image-based meta-analysis
```

The appropriate method depends on the available data and research question.

This example focuses primarily on conventional effect-size meta-analysis.

---

## Sensitivity Analysis
Suppose the primary result is:

```text
g = 0.31
95% CI = [0.20, 0.42]
```

Now exclude high-risk studies:

```text
g = 0.22
95% CI = [0.10, 0.34]
```

The effect remains positive but is smaller.

Interpretation:

> The evidence supports a positive effect, but studies with greater methodological concerns may contribute to an overestimate of its magnitude.

---

## Example Evidence Table
| Domain           | Finding                         | Interpretation                     |
| ---------------- | ------------------------------- | ---------------------------------- |
| Average effect   | g = 0.31                        | Positive average effect            |
| Precision        | CI excludes 0                   | Relatively precise pooled estimate |
| Heterogeneity    | I² = 68%                        | Meaningful variation               |
| Prediction       | Includes near-zero values       | Future effects uncertain           |
| Risk of bias     | Higher-risk studies larger      | Possible inflation                 |
| Moderator        | Duration associated with effect | Hypothesis-generating              |
| Publication bias | Uncertain                       | Cannot rule out reporting bias     |

---

## Neuroscience-Specific Critical Questions
Before trusting the result, ask:

```text
□ Are the cognitive constructs comparable?
□ Are tasks measuring the same construct?
□ Are training and transfer outcomes distinguished?
□ Are active and passive controls separated?
□ Are populations comparable?
□ Are behavioural and neural outcomes analysed separately?
□ Are imaging modalities being mixed appropriately?
□ Are preprocessing differences important?
□ Are multiple contrasts creating dependence?
□ Are small neuroimaging samples driving effects?
□ Are coordinate-based and image-based analyses distinguished?
□ Is reverse inference being avoided?
□ Are moderators biologically plausible?
□ Is the prediction interval informative?
```

---
