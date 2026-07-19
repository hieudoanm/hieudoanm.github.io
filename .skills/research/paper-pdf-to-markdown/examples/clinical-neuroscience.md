# Example: Clinical Neuroscience Paper

## Original PDF Structure
A typical paper might contain:

```text
Title
Authors
Affiliations

Abstract

1. Introduction

2. Methods
   2.1 Participants
   2.2 Inclusion Criteria
   2.3 Clinical Assessment
   2.4 MRI Acquisition
   2.5 Statistical Analysis

3. Results
   3.1 Participant Characteristics
   3.2 Clinical Outcomes
   3.3 Imaging Results
   3.4 Regression Analysis

4. Discussion

Tables
Figures

References
```

---

## Imaging Results
Suppose the paper reports:

> Lesion volume was associated with language outcome at 6 months (β = −0.31, 95% CI [−0.48, −0.14], p < .001).

Represent it as:

```markdown
Lesion volume was associated with language outcome at 6 months
($\beta=-0.31$, 95% CI [−0.48, −0.14], $p<.001$).
```

Preserve:

- sign
- coefficient
- confidence interval
- p-value
- time point

A missing negative sign would change the interpretation of the association.

---

## Baseline Tables
Suppose the paper contains:

| Variable                   | Stroke Group | Control Group |
| -------------------------- | -----------: | ------------: |
| N                          |           84 |            40 |
| Age (years)                |         61.2 |          60.4 |
| Time since stroke (months) |         14.2 |             — |
| Lesion volume (mL)         |         32.8 |             — |

Represent it faithfully:

```markdown
| Variable                   | Stroke Group | Control Group |
| -------------------------- | -----------: | ------------: |
| N                          |           84 |            40 |
| Age (years)                |         61.2 |          60.4 |
| Time since stroke (months) |         14.2 |             — |
| Lesion volume (mL)         |         32.8 |             — |
```

Do not replace missing or inapplicable values with zero.

---

## Follow-Up Measurements
Clinical studies often have multiple time points:

```text
Baseline
3 months
6 months
12 months
```

Preserve these labels exactly.

For example:

```markdown
Clinical outcomes were assessed at baseline,
3 months, and 6 months after treatment.
```

Do not accidentally reorder the time points.

---

## Critical Warning: Score Direction
Never assume that a higher clinical score means better performance.

For example:

```text
Higher score = better outcome
```

may be true for one scale but false for another.

If the source specifies the direction, preserve it.

If it does not, do not infer it merely from the name of the scale.

---

## Common Failure
An extraction might produce:

```text
β = 0.31, 95% CI [−0.48, −0.14]
```

when the original PDF contains:

```text
β = −0.31, 95% CI [−0.48, −0.14]
```

This is a critical extraction error.

The sign of the regression coefficient must be verified against the PDF.

---

## Final Validation
For clinical neuroscience papers, compare the Markdown against the PDF for:

- patient N
- control N
- diagnosis
- inclusion/exclusion criteria
- clinical scale names
- score direction
- time points
- lesion measurements
- MRI metrics
- units
- regression coefficients
- confidence intervals
- p-values
- missing data
- baseline tables
- follow-up tables
- figure captions
- references

### Final principle

> In clinical neuroscience, preserve every piece of information needed to understand who was studied, what was measured, when it was measured, and how the measurements were analysed.
