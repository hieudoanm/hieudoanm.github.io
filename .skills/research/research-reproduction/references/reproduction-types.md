# Reproduction Types

## Purpose

Research reproduction can mean different things depending on the scientific field and the terminology used by a research community.

Before starting a reproduction project, explicitly define:

- what is being reproduced
- which data are being used
- which analysis is being reconstructed
- what level of agreement is expected
- what counts as successful reproduction

A useful operational definition is:

> **Reproduction uses the original evidence and the original or equivalent analytical procedure to determine whether the published result can be obtained again.**

Terminology is not completely standardized across disciplines, so the exact definition should always be stated.

---

# 1. Computational Reproduction

Computational reproduction uses:

```text
Original data
+
Original or equivalent code
+
Equivalent computational environment
+
Equivalent parameters
→
Reproduced result
```

For example:

```text
Original dataset
    ↓
Published Python analysis
    ↓
Regression model
    ↓
β = 0.42
```

The reproduction attempts:

```text
Same dataset
    ↓
Same/equivalent Python analysis
    ↓
Same regression model
    ↓
β ≈ 0.42
```

This is the primary type of reproduction targeted by this skill.

---

# 2. Exact Reproduction

An exact reproduction attempts to recreate the original computational conditions as closely as possible.

This may include:

- same dataset version
- same source code
- same commit
- same software version
- same package versions
- same operating system
- same random seed
- same parameters
- same workflow

Example:

```text
Python 3.10
NumPy 1.x
scikit-learn 1.x
dataset version 2
Git commit abc123
random seed 42
```

The closer the environment is to the original, the stronger the evidence for exact computational reproduction.

However, exact equality is not always technically possible because of:

- floating-point differences
- hardware differences
- nondeterministic algorithms
- GPU implementations
- operating-system differences

Therefore, "exact" should refer to the reproduction protocol as well as the numerical result.

---

# 3. Close Reproduction

A close reproduction uses the original evidence and equivalent procedures but allows small computational differences.

For example:

```text
Original accuracy:      0.842
Reproduced accuracy:    0.841
```

or:

```text
Original β:              0.421
Reproduced β:            0.419
```

Small differences may be expected because of:

- numerical precision
- software versions
- hardware
- stochastic algorithms
- optimisation differences

The important question is whether the difference is scientifically meaningful.

---

# 4. Partial Reproduction

A study may contain many analyses.

For example:

```text
Figure 1      reproduced
Figure 2      reproduced
Table 2       reproduced
Regression 3  not reproduced
Figure 4      unavailable
```

This should be classified as a **partial reproduction** rather than simply "reproduced" or "failed."

Report which components were reproduced and which were not.

---

# 5. Failed Reproduction

A failed reproduction occurs when the available research artifacts and documented procedure cannot produce the reported result.

For example:

```text
Original:
AUC = 0.91

Reproduction:
AUC = 0.73
```

A failed reproduction does not immediately imply that the original research is incorrect.

Investigate:

- dataset version
- preprocessing
- participant exclusions
- code version
- package versions
- random seed
- hyperparameters
- undocumented decisions
- missing data
- implementation differences

Only after diagnosing these factors should the scientific implications be assessed.

---

# 6. Not Reproducible

Sometimes reproduction cannot be attempted meaningfully.

Examples:

```text
Dataset unavailable
Code unavailable
Necessary supplementary files missing
Analysis procedure insufficiently documented
Access restricted
Required software unavailable
```

This should be distinguished from a failed reproduction.

```text
NOT REPRODUCIBLE
Cannot perform the reproduction.

FAILED REPRODUCTION
Performed the reproduction, but the reported result was not recovered.
```

This distinction is important.

---

# 7. Figure Reproduction

A figure reproduction targets a published figure.

For example:

```text
Original Figure 3
        ↓
Reconstruct data processing
        ↓
Run analysis
        ↓
Generate Figure 3
        ↓
Compare with original
```

Compare:

- axes
- labels
- sample sizes
- means
- error bars
- statistical annotations
- colour/group encoding
- scales
- plotted points
- confidence intervals

The goal is not necessarily to make the figure visually identical.

The underlying scientific content should match.

---

# 8. Table Reproduction

A table reproduction targets numerical or categorical results.

For example:

| Model   | Original AUC | Reproduced AUC |
| ------- | -----------: | -------------: |
| Model A |         0.81 |           0.81 |
| Model B |         0.87 |           0.86 |
| Model C |         0.91 |           0.91 |

Check:

- row definitions
- column definitions
- sample size
- units
- rounding
- missing values
- confidence intervals
- statistical tests

---

# 9. Statistical Reproduction

A statistical reproduction attempts to recover the published statistical result.

Examples:

```text
t-test
ANOVA
Regression
Correlation
Mixed-effects model
Permutation test
Bayesian model
```

Compare appropriate quantities:

```text
Estimate
Standard error
Degrees of freedom
Test statistic
p-value
Confidence interval
Effect size
```

Do not judge reproduction using the p-value alone.

For example:

```text
Original:
β = 0.42
95% CI [0.20, 0.64]

Reproduction:
β = 0.41
95% CI [0.19, 0.63]
```

This can be a strong reproduction even though the numbers are not literally identical.

---

# 10. Model Reproduction

A computational model can also be reproduced.

Examples:

- drift-diffusion model
- reinforcement-learning model
- neural network
- encoding model
- generative model
- computational cognitive model

Preserve:

```text
Model equations
Parameters
Initial conditions
Optimisation method
Objective function
Stopping criteria
Random seed
```

A model with the same name is not necessarily the same model.

---

# 11. Pipeline Reproduction

A complete pipeline reproduction reconstructs the chain:

```text
Raw Data
   ↓
Preprocessing
   ↓
Quality Control
   ↓
Feature Extraction
   ↓
Analysis
   ↓
Statistics
   ↓
Figures/Tables
```

This is stronger than reproducing only one final number.

---

# 12. Reproduction vs Reanalysis

These are fundamentally different.

### Reproduction

```text
Original data
+
Original analysis
→
Original result
```

### Reanalysis

```text
Original data
+
Different analysis
→
New result
```

Examples of reanalysis:

- using a different statistical model
- changing preprocessing
- testing a new hypothesis
- using a different machine-learning algorithm
- applying a new correction method

A reanalysis can be valuable, but it should not be described as reproducing the original analysis.

---

# 13. Reproduction vs Replication

A simple operational distinction is:

|              | Reproduction                      | Replication                          |
| ------------ | --------------------------------- | ------------------------------------ |
| Data         | Original                          | New                                  |
| Participants | Usually original                  | New                                  |
| Analysis     | Same/equivalent                   | Same/related                         |
| Question     | Can original result be recovered? | Does finding hold with new evidence? |

Conceptually:

```text
REPRODUCTION

Original evidence
       ↓
Original analysis
       ↓
Can we recover the result?
```

```text
REPLICATION

New evidence
       ↓
Same/related research question
       ↓
Does the finding hold again?
```

---

# 14. Recommended Classification

Use a structured result:

```text
Reproduction status:
Exact / Close / Partial / Failed / Not reproducible

Target:
Figure 3

Original result:
...

Reproduced result:
...

Difference:
...

Cause:
...

Scientific interpretation:
...
```

This is more informative than a binary "reproduced/not reproduced" label.

---

# Final Principle

> **Classify the reproduction precisely. A result that was partially reproduced, could not be attempted, or differed because of a documented environmental change should not be collapsed into a simple success/failure label.**
