# Replication Analysis

## Purpose

Replication analysis defines how to statistically evaluate new evidence against an original scientific finding.

The central principle is:

> **Analyse the replication according to the scientific claim, not according to whether the result produces the same p-value as the original study.**

A replication analysis should answer:

```text
What was the original effect?
        ↓
What is the new effect?
        ↓
How uncertain are both estimates?
        ↓
Are they compatible?
        ↓
If they differ, how much?
        ↓
Could methodological differences explain the difference?
        ↓
What does the new evidence imply about the original claim?
```

---

## Effect sizes
Report an interpretable effect estimate.

Examples:

```text
Mean difference
Standardised mean difference
Correlation
Odds ratio
Risk ratio
Hazard ratio
AUC
R²
MAE
RMSE
```

The choice depends on the scientific question.

---

## Compare estimates, not p-values

The original and replication p-values each depend on both the estimated effect and its precision. One result being significant and the other not significant does not, by itself, show that the effects differ.

Compare effect direction and magnitude, report uncertainty for both estimates, and estimate their difference when the design supports it. A non-significant result is not proof of no effect; use a prespecified smallest effect of interest or an appropriate equivalence analysis when the question concerns a negligible effect.

---

## Confidence intervals are not proof intervals
A 95% confidence interval should not be described as:

> There is a 95% probability that the true value lies inside this interval.

Under the usual frequentist interpretation, the procedure has 95% long-run coverage under its assumptions.

For practical communication, it is usually sufficient to say:

> The estimate is 0.28, with a 95% confidence interval from 0.08 to 0.48.

---

## Bayesian replication analysis
Bayesian analysis can directly quantify evidence for competing hypotheses.

For example:

```text
H₀:
Effect is negligible

H₁:
Effect is meaningfully positive
```

The analysis can produce:

```text
Posterior distribution
Bayes factor
Credible interval
Posterior probability
```

This can be particularly useful when interpreting null or ambiguous replication results.

---

## Sensitivity analysis
Ask:

> Would the conclusion change under reasonable alternative assumptions?

Examples:

```text
With vs without influential observations
Alternative preprocessing
Alternative covariates
Alternative exclusion criteria
Alternative model specification
```

If conclusions remain stable, confidence increases.

If conclusions change dramatically, report that uncertainty.

---

## Recommended replication analysis workflow
```text
ORIGINAL CLAIM
      ↓
DEFINE ESTIMAND
      ↓
DEFINE PRIMARY OUTCOME
      ↓
DEFINE SESOI
      ↓
PRE-SPECIFY MODEL
      ↓
COLLECT NEW DATA
      ↓
QUALITY CONTROL
      ↓
RUN PRIMARY ANALYSIS
      ↓
ESTIMATE EFFECT
      ↓
ESTIMATE UNCERTAINTY
      ↓
COMPARE WITH ORIGINAL
      ↓
ASSESS STATISTICAL COMPATIBILITY
      ↓
ASSESS PRACTICAL SIGNIFICANCE
      ↓
RUN PRESPECIFIED SENSITIVITY ANALYSES
      ↓
INVESTIGATE MODERATORS
      ↓
CLASSIFY REPLICATION EVIDENCE
      ↓
UPDATE SCIENTIFIC CONFIDENCE
```

---

## Reporting the final result
A strong replication result should report:

```text
Original effect
Replication effect
Uncertainty for both
Sample sizes
Primary outcome
Primary analysis
Design fidelity
Important deviations
SESOI
Statistical comparison where appropriate
Sensitivity analyses
Potential moderators
Practical significance
Overall interpretation
```

Avoid reducing the result to:

```text
Replicated: Yes/No
```

---
