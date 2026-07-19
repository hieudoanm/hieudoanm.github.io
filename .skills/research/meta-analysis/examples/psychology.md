# Psychology Example

## Purpose

This example demonstrates how to conduct and interpret a meta-analysis in psychology.

The example is hypothetical. The numerical results are illustrative rather than results from a real evidence synthesis.

The goal is to show how psychological constructs, intervention differences, measurement choices, heterogeneity, risk of bias, and practical significance interact in a meta-analysis.

---

## Example Question
Suppose the research question is:

> **Does mindfulness-based intervention reduce anxiety symptoms in adults?**

A more structured version might be:

> Among adults, compared with an inactive or active control condition, do mindfulness-based interventions reduce self-reported anxiety symptoms at post-intervention?

This question defines:

- **Population:** adults
- **Intervention:** mindfulness-based interventions
- **Comparator:** inactive or active control
- **Outcome:** anxiety symptoms
- **Time point:** post-intervention

The question should be defined before looking at the results whenever possible.

---

## Choose the Effect Size
Suppose different studies use different anxiety questionnaires.

A raw mean difference may therefore not be directly comparable.

A suitable approach may be the:

> **Standardised Mean Difference (SMD)**

A study-level effect might be expressed as Hedges' g.

Conceptually:

```text
Intervention anxiety
        ↓
     compared with
        ↓
Control anxiety
        ↓
Standardise the difference
        ↓
Hedges' g
```

A negative effect could represent lower anxiety in the mindfulness group.

For example:

```text
g = -0.40
```

might indicate a moderate reduction in anxiety.

The sign convention should be explicitly defined.

---

## Publication Bias and Small-Study Effects
Suppose smaller studies tend to report larger effects.

A funnel plot might show:

```text
Large studies
     ↓
More precise
     ↓
Effects cluster around the pooled estimate

Small studies
     ↓
Less precise
     ↓
Effects spread more widely
```

If small studies are disproportionately positive, several explanations are possible:

- Publication bias
- Selective reporting
- Small-study effects
- Methodological differences
- Genuine heterogeneity

Therefore:

> Funnel-plot asymmetry is not synonymous with publication bias.

Statistical tests for asymmetry should be interpreted alongside the study characteristics and evidence base.

---

## Interpret the Overall Evidence
Suppose the final evidence looks like:

```text
Pooled effect
g = -0.34

95% CI
[-0.42, -0.26]

I²
62%

Prediction interval
[-0.71, 0.03]

Risk of bias
Mostly low-to-some-concerns

Sensitivity analyses
Direction generally stable

Control-condition analysis
Smaller effects with active controls
```

A calibrated conclusion might be:

> The evidence suggests that mindfulness-based interventions are associated with a small-to-moderate reduction in anxiety symptoms in adults. However, the magnitude of the effect varies across studies and appears smaller when mindfulness is compared with active controls rather than inactive controls. The findings therefore support a potential beneficial effect but provide weaker evidence that mindfulness produces effects substantially greater than those of other credible interventions.

This is more informative than simply saying:

> "Mindfulness works."

---

## What the Meta-Analysis Does Not Establish
Even a statistically strong meta-analysis does not automatically establish that:

- Mindfulness works for every person
- The intervention is superior to every alternative
- The effect is clinically important
- The intervention works through a particular psychological mechanism
- Longer intervention causes larger effects
- The result applies to children
- The result applies to clinical populations
- Self-reported anxiety perfectly measures anxiety
- Publication bias is absent

A meta-analysis synthesises evidence; it does not remove the limitations of the underlying studies.

---

## Example Results Table
A final summary might look like:

| Analysis                      |        Effect | Interpretation                        |
| ----------------------------- | ------------: | ------------------------------------- |
| Overall                       |     g = -0.34 | Small-to-moderate reduction           |
| Waitlist controls             |     g = -0.51 | Larger effect                         |
| Active controls               |     g = -0.18 | Smaller effect                        |
| High-risk studies removed     |     g = -0.29 | Direction remains                     |
| One influential study removed |     g = -0.31 | Similar result                        |
| Heterogeneity                 |      I² = 62% | Meaningful variation                  |
| Prediction interval           | [-0.71, 0.03] | Future effects may vary substantially |

The table should be accompanied by interpretation rather than treated as self-explanatory.

---
