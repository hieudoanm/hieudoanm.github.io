# Reproduction Validation

## Purpose

Validation determines whether the reproduced analysis actually agrees with the original result.

The central principle is:

> **Validate the entire evidence-to-result pathway, not only the final number.**

A reproduction can accidentally produce a similar final result while using a different analysis.

---

## Uncertainty Validation
Compare uncertainty, not just point estimates.

Examples:

```text
95% CI
SE
Credible interval
Prediction interval
Bootstrap interval
```

For example:

```text
Original:
β = 0.42
95% CI [0.20, 0.64]

Reproduction:
β = 0.41
95% CI [0.19, 0.63]
```

This provides stronger evidence of agreement.

---

## Figure Validation
Compare figures at two levels.

### Structural

Check:

- axes
- labels
- units
- groups
- legend
- scale
- statistical annotations

### Numerical

Check:

- plotted means
- error bars
- individual observations
- confidence intervals
- thresholds
- coordinates

A visually similar figure is not sufficient if its underlying numbers differ substantially.

---

## Table Validation
Compare:

```text
Rows
Columns
Values
Units
Rounding
Missing values
Statistical annotations
```

Prefer programmatic comparison when possible.

For example:

```text
original_table.csv
        ↕
reproduced_table.csv
```

rather than manually comparing screenshots.

---

## Validation Matrix
Use a validation matrix:

| Stage         | Original   | Reproduced | Agreement | Notes           |
| ------------- | ---------- | ---------- | --------- | --------------- |
| Dataset       | v2         | v2         | ✓         | Same            |
| N             | 84         | 84         | ✓         | Same            |
| Preprocessing | Pipeline A | Pipeline A | ✓         | Same            |
| Features      | 128        | 128        | ✓         | Same            |
| Model         | RF         | RF         | ✓         | Same            |
| Accuracy      | .88        | .87        | Close     | Seed difference |
| AUC           | .93        | .92        | Close     | Seed difference |

This makes the reproduction auditable.

---

## Validation Categories
Use:

```text
Exact
Close
Different
Unavailable
Unknown
```

Avoid vague statements such as:

> The results were approximately the same.

Instead:

> The primary coefficient differed by 0.01, with the same sign and overlapping confidence intervals.

---

## Validation Report
A concise validation report should contain:

```text
Target:
...

Original:
...

Reproduced:
...

Difference:
...

Tolerance:
...

Intermediate checkpoints:
...

First divergence:
...

Cause:
...

Scientific interpretation:
...
```

---

## Final Principle
> **Validate from the data forward, not from the conclusion backward. The strongest reproduction identifies where the original and reproduced pipelines agree, where they diverge, and whether those differences matter scientifically.**
