# Heterogeneity

A practical guide to understanding, measuring, explaining, and interpreting differences between study effects in meta-analysis.

The central principle is:

> **Heterogeneity asks whether the effects observed across studies differ more than would reasonably be expected from sampling error alone—and, if they do, why.**

---

## Heterogeneity and Random Effects
A random-effects model assumes that:

```text
Study 1 → θ₁
Study 2 → θ₂
Study 3 → θ₃
...
```

and that these true effects come from a distribution:

```text
θᵢ ~ distribution(mean = μ, variance = τ²)
```

The pooled estimate:

```text
μ
```

represents the mean of the distribution of underlying effects.

---

## Fixed-Effect vs Random-Effects Interpretation
#### Fixed-effect

Conceptually:

```text
One true effect
        ↓
Study estimates differ because of sampling error
```

#### Random-effects

Conceptually:

```text
Different true effects
        ↓
Studies estimate different underlying effects
```

The choice should be driven by the scientific question and assumptions, not simply by which model produces the preferred result.

---

## Random-Effects Does Not "Solve" Heterogeneity
A common misconception is:

> "Use random-effects and heterogeneity is handled."

Not exactly.

A random-effects model accounts for between-study variance in the statistical model.

It does not explain:

```text
Why studies differ
```

nor does it make incompatible studies scientifically comparable.

---

## Low Heterogeneity Does Not Guarantee Good Evidence
The opposite mistake is also possible.

Suppose:

```text
I² = 5%
```

The effects are statistically consistent.

But all studies may have:

```text
High risk of bias
Small samples
Poor measurement
Same narrow population
```

Low heterogeneity does not imply high-quality evidence.

---

## Heterogeneity and Publication Bias
Publication bias can distort the apparent distribution of study effects.

For example:

```text
Small positive studies
       ↓
Published

Small null studies
       ↓
Missing
```

The observed literature may appear more consistent or more positive than the underlying evidence.

Therefore heterogeneity should be interpreted alongside reporting bias.

---

## A Practical Heterogeneity Workflow
Use:

```text
1. Inspect study characteristics
        ↓
2. Inspect forest plot
        ↓
3. Estimate heterogeneity
        ↓
4. Examine τ² / τ
        ↓
5. Consider prediction interval
        ↓
6. Identify plausible moderators
        ↓
7. Conduct predefined subgroup analysis
        ↓
8. Consider meta-regression
        ↓
9. Conduct sensitivity analysis
        ↓
10. Interpret scientifically
```

---

## Heterogeneity Checklist
```text
□ Are populations comparable?
□ Are interventions/exposures comparable?
□ Are comparators comparable?
□ Are outcomes measuring the same construct?
□ Are measurement instruments comparable?
□ Are study designs compatible?
□ Is follow-up comparable?
□ Is there clinical heterogeneity?
□ Is there methodological heterogeneity?
□ What does the forest plot show?
□ What is Q?
□ What is I²?
□ What is τ²?
□ What is τ?
□ What does the prediction interval show?
□ Are there influential studies?
□ Are there plausible moderators?
□ Were subgroup analyses predefined?
□ Is meta-regression scientifically justified?
□ Could publication bias affect the pattern?
□ Does heterogeneity change the interpretation?
```

---
