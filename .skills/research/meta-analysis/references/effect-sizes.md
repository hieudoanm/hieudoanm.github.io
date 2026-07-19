# Effect Sizes

A practical guide to choosing, interpreting, transforming, and combining effect sizes in meta-analysis.

The central principle is:

> **A meta-analysis does not pool raw study results. It pools comparable estimates of an effect, together with their uncertainty.**

---

## What Is an Effect Size?
An effect size is a quantitative description of the relationship or difference that a study found.

For example:

```text
Treatment group mean = 82
Control group mean   = 75

Mean difference = 7 points
```

The effect size tells us:

```text
What happened?
How large was the effect?
In which direction?
How uncertain is the estimate?
```

A meta-analysis converts study findings into a common quantitative language.

---

## Pooling Effect Sizes
Suppose:

```text
Study A → 0.20
Study B → 0.50
Study C → 0.40
```

with different uncertainties.

The pooled effect is conceptually:

```text
Study effects
     +
Study precision
     ↓
Weighted synthesis
     ↓
Pooled effect
```

The exact weighting depends on the meta-analytic model.

---

## Dependent Effect Sizes
Effect sizes may be dependent because they share:

```text
Participants
Control groups
Outcomes
Time points
Datasets
```

Dependency violates the assumption that every effect is independent.

This matters because standard meta-analysis methods may:

```text
Underestimate standard errors
Overweight studies
Produce overly narrow confidence intervals
```

Always check the independence structure.

---

## Measurement Direction and Reliability
Measurement quality can affect effect estimates.

Consider:

```text
Reliable measure
      ↓
Less measurement noise
      ↓
More precise estimate
```

Poor reliability can increase noise and potentially attenuate observed associations.

Therefore, measurement properties should be considered when interpreting heterogeneity.

---

## Effect Size vs Raw Data
Raw data:

```text
Treatment mean = 84
Control mean = 78
```

Effect size:

```text
MD = 6
```

Standardised effect:

```text
SMD ≈ 0.45
```

Each representation answers a different question.

Raw data preserve original units.

Effect sizes enable comparison across studies.

---

## Practical Interpretation
When interpreting a pooled effect, ask:

```text
1. What does the number measure?
2. What direction is positive?
3. What are the original units?
4. How large is the effect?
5. How precise is it?
6. Is the effect clinically/scientifically meaningful?
7. Are studies measuring the same construct?
8. Could bias explain the estimate?
```

---

## Effect-Size Extraction Checklist
```text
□ What is the outcome?
□ Is it continuous, binary, time-to-event, or correlational?
□ What effect size is appropriate?
□ Are all studies measuring the same construct?
□ Is the measurement scale the same?
□ Is effect direction consistent?
□ Are means/SDs available?
□ Are event counts available?
□ Is the effect already reported?
□ Can the effect be derived?
□ Is the standard error available?
□ Is the confidence interval available?
□ Is a transformation required?
□ Are multiple outcomes reported?
□ Are multiple time points reported?
□ Are effect sizes independent?
□ Are assumptions documented?
□ Are sensitivity analyses needed?
```

---
