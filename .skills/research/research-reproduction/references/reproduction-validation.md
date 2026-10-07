# Reproduction Validation

## Purpose

Validation determines whether the reproduced analysis actually agrees with the original result.

The central principle is:

> **Validate the entire evidence-to-result pathway, not only the final number.**

A reproduction can accidentally produce a similar final result while using a different analysis.

---

# 1. Validation Levels

Use multiple levels of validation.

```text
Level 1
Data

Level 2
Preprocessing

Level 3
Intermediate outputs

Level 4
Analysis

Level 5
Statistical results

Level 6
Figures and tables

Level 7
Scientific interpretation
```

Agreement at higher levels is stronger when lower levels have also been validated.

---

# 2. Data Validation

Check:

- dataset identity
- dataset version
- file identity
- participant count
- observation count
- variable names
- variable types
- missing values
- labels
- units

Example:

```text
Original:
N = 84

Reproduction:
N = 84
```

If the numbers differ, stop and investigate before continuing.

---

# 3. Participant Validation

For human research, compare the participant/sample composition.

Check:

```text
Total N
Group N
Age
Sex/gender where reported
Inclusion criteria
Exclusion criteria
Missing participants
```

For example:

```text
Original:
84 stroke participants

Reproduction:
82 stroke participants
```

The difference may explain later discrepancies.

---

# 4. Trial-Level Validation

For experimental research, validate:

```text
Trials per participant
Excluded trials
Condition counts
Correct/incorrect trials
Reaction-time exclusions
Missing trials
```

Example:

```text
Original:
3,840 trials
3,612 retained

Reproduction:
3,840 trials
3,612 retained
```

This is a useful intermediate checkpoint.

---

# 5. Preprocessing Validation

Compare the processing pipeline step by step.

Example:

```text
Raw EEG
 ↓
Filtering
 ↓
Artifact rejection
 ↓
Epoching
 ↓
Baseline correction
```

Check:

- parameters
- thresholds
- order of operations
- software implementation
- output dimensions

A preprocessing difference can propagate through the entire analysis.

---

# 6. Intermediate Output Validation

Save intermediate outputs.

Examples:

```text
clean_data.csv
epochs.fif
preprocessed.nii.gz
features.npy
model_input.csv
```

Compare:

```text
Shape
N
Mean
SD
Range
Missing values
Distribution
```

For images:

```text
Dimensions
Voxel size
Orientation
Registration
Intensity distribution
```

---

# 7. Statistical Validation

For statistical analyses, compare:

```text
Estimate
Standard error
Degrees of freedom
Test statistic
p-value
Confidence interval
Effect size
```

Example:

| Statistic |       Original |     Reproduced |
| --------- | -------------: | -------------: |
| β         |          −0.31 |          −0.30 |
| SE        |           0.08 |           0.08 |
| 95% CI    | [−0.48, −0.14] | [−0.47, −0.13] |
| p         |         < .001 |         < .001 |

This is stronger evidence than comparing p-values alone.

---

# 8. Effect Direction

Always check the direction of the effect.

Example:

```text
Original:
β = −0.31

Reproduction:
β = −0.30
```

Good agreement.

But:

```text
Original:
β = −0.31

Reproduction:
β = +0.30
```

is a major discrepancy even if both are statistically significant.

---

# 9. Effect Magnitude

A result can have the same direction but a substantially different magnitude.

Compare:

```text
Original:
d = 0.52

Reproduction:
d = 0.18
```

The direction agrees, but the magnitude may not.

Do not automatically classify this as successful reproduction.

Consider the scientific context and predefined tolerance.

---

# 10. Uncertainty Validation

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

# 11. P-Value Validation

Do not require identical p-values.

For example:

```text
Original:
p = .003

Reproduction:
p = .004
```

This may be an acceptable reproduction if the underlying estimate, uncertainty, and inference agree.

Conversely:

```text
Original:
p = .003

Reproduction:
p = .42
```

is a major discrepancy.

Investigate the underlying analysis rather than only the p-value.

---

# 12. Machine-Learning Validation

Compare:

```text
Dataset size
Train/test split
Cross-validation folds
Feature dimensions
Model architecture
Hyperparameters
Random seed
Predictions
Accuracy
Precision
Recall
F1
AUC
```

Example:

| Metric    | Original | Reproduced |
| --------- | -------: | ---------: |
| Accuracy  |     0.88 |       0.87 |
| Precision |     0.86 |       0.85 |
| Recall    |     0.89 |       0.88 |
| F1        |     0.87 |       0.86 |
| AUC       |     0.93 |       0.92 |

Look at the entire performance profile.

---

# 13. Figure Validation

Compare figures at two levels.

## Structural

Check:

- axes
- labels
- units
- groups
- legend
- scale
- statistical annotations

## Numerical

Check:

- plotted means
- error bars
- individual observations
- confidence intervals
- thresholds
- coordinates

A visually similar figure is not sufficient if its underlying numbers differ substantially.

---

# 14. Table Validation

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

# 15. Neuroimaging Validation

For MRI/fMRI/MEG/EEG reproduction, additional checks may be required.

### MRI/fMRI

Compare:

```text
Image dimensions
Voxel size
Orientation
Registration
Preprocessing
ROI
Coordinates
Contrast
Statistical threshold
```

### EEG/MEG

Compare:

```text
Sampling rate
Sensor count
Bad channels
Filtering
Epoch count
Time windows
Frequency bands
Source reconstruction
```

Small processing differences can substantially affect downstream results.

---

# 16. Validation of Random Processes

If the original analysis is stochastic, validate:

```text
Random seed
Random-number generator
Number of iterations
Initialisation
Sampling procedure
Cross-validation split
```

If exact replication is impossible, run multiple seeds.

Report:

```text
Original:
Accuracy = 0.88

Reproduction:
Mean = 0.87
SD = 0.01
Across 10 seeds
```

This can be more informative than a single stochastic run.

---

# 17. Tolerance

Do not use one universal numerical tolerance.

Different quantities require different standards.

Examples:

```text
Floating-point computation
→ Very small tolerance

Reaction time
→ Domain-appropriate tolerance

Model performance
→ Performance uncertainty

Regression coefficient
→ Statistical uncertainty

Neuroimaging coordinates
→ Spatial tolerance
```

Define the tolerance before interpreting the result when possible.

---

# 18. Divergence Analysis

If the result differs, find the first divergence.

Example:

```text
Data
✓

Participant exclusions
✓

Preprocessing
✓

Feature extraction
✗

Model input
✗

Final result
✗
```

The first failed checkpoint is often the most informative.

---

# 19. Validation Matrix

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

# 20. Validation Categories

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

# 21. Scientific Validation

After numerical validation, ask:

```text
Does the reproduced result support
the same scientific interpretation?
```

Separate:

```text
Numerical agreement
```

from:

```text
Inferential agreement
```

and:

```text
Scientific agreement
```

For example:

```text
Numerical:
Slightly different

Statistical:
Same inference

Scientific:
Same conclusion
```

This may still represent a successful reproduction.

---

# 22. Validation Report

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

# Final Principle

> **Validate from the data forward, not from the conclusion backward. The strongest reproduction identifies where the original and reproduced pipelines agree, where they diverge, and whether those differences matter scientifically.**
