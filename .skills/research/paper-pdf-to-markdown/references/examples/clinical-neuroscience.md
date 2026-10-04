# Example: Clinical Neuroscience Paper

## Scenario

A clinical neuroscience paper contains:

- Patient characteristics
- Clinical outcomes
- MRI measurements
- Lesion information
- Baseline tables
- Regression analyses
- Follow-up measurements
- Missing-data information

The conversion must preserve both the scientific and clinical meaning of the source.

---

## 1. Original PDF Structure

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

## 2. Patient Characteristics

Suppose the paper states:

> The study included 84 participants with post-stroke aphasia. Mean time since stroke was 14.2 months (SD = 8.7).

Preserve the information:

```markdown
The study included 84 participants with post-stroke aphasia.
Mean time since stroke was 14.2 months ($SD=8.7$).
```

Do not reduce this to:

```markdown
Participants had chronic stroke.
```

The latter introduces a classification that may not have been explicitly stated.

---

## 3. Clinical Outcomes

Suppose the primary outcome is a language assessment score.

Preserve:

```markdown
The primary outcome was language performance measured using
the [exact assessment name from the paper].
```

If the scale has a defined range, preserve it:

```markdown
Scores ranged from 0 to 100, with higher scores indicating
better language performance.
```

The direction of a clinical scale is important and must not be guessed.

---

## 4. Imaging Results

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

## 5. Baseline Tables

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

## 6. Follow-Up Measurements

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

## 7. Clinical-Neuroscience Quality Control

Check:

### Participant counts

Distinguish:

```text
84 patients
40 controls
```

from:

```text
84 scans
40 sessions
```

### Diagnosis

Preserve the exact diagnostic terminology used by the paper.

### Inclusion and exclusion criteria

These can be scientifically important and should not disappear during extraction.

### Clinical scales

Verify:

- exact scale name
- score range
- scoring direction
- units
- subscales
- clinically meaningful thresholds

### Time points

Check:

```text
baseline
3 months
6 months
12 months
```

### Lesion measurements

Verify:

- lesion volume
- anatomical region
- units
- laterality
- segmentation method

### MRI measurements

Check:

- sequence
- resolution
- units
- contrast
- acquisition parameters
- preprocessing information

### Missing data

Preserve explicit missing-data notation:

```text
NA
NR
—
```

Do not convert missing values to zero.

---

## 8. Critical Warning: Score Direction

Never assume that a higher clinical score means better performance.

For example:

```text
Higher score = better outcome
```

may be true for one scale but false for another.

If the source specifies the direction, preserve it.

If it does not, do not infer it merely from the name of the scale.

---

## 9. Common Failure

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

## 10. Final Validation

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
