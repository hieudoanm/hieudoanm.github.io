# Reproduction Analysis

## Purpose

After running a reproduction, the reproduced output must be compared with the original result systematically.

The central question is:

> **How similar must the reproduced result be before we consider the original result reproduced?**

There is no universal numerical threshold.

The comparison must depend on:

- the type of analysis
- the quantity being compared
- expected computational variation
- statistical uncertainty
- scientific importance
- predefined reproduction criteria

---

# 1. Compare More Than One Number

Do not evaluate reproduction using only:

```text
p-value
```

or:

```text
accuracy
```

Instead compare the relevant result profile.

For a regression:

```text
Coefficient
SE
CI
test statistic
p-value
effect direction
```

For machine learning:

```text
Accuracy
Precision
Recall
F1
AUC
```

For a computational model:

```text
Parameter estimates
Fit
Predictions
Loss
Simulation output
```

---

# 2. Point Estimates

Start with the main estimate.

Example:

```text
Original:
β = 0.42

Reproduced:
β = 0.41
```

Calculate:

```text
Absolute difference
= |0.41 − 0.42|
= 0.01
```

and, where appropriate:

```text
Relative difference
= |0.41 − 0.42| / |0.42|
≈ 2.4%
```

The practical importance depends on the scientific context.

---

# 3. Effect Direction

Check whether the direction agrees.

```text
Original:
β = −0.31

Reproduced:
β = −0.30
```

Agreement.

But:

```text
Original:
β = −0.31

Reproduced:
β = +0.30
```

is a major discrepancy.

Always check direction before interpreting magnitude.

---

# 4. Confidence Intervals

Compare uncertainty.

Example:

```text
Original:
β = 0.42
95% CI [0.20, 0.64]

Reproduction:
β = 0.41
95% CI [0.19, 0.63]
```

These results are highly consistent.

However, overlapping confidence intervals should not be treated as a formal universal test of equality.

---

# 5. P-Values

P-values can be useful but should not be the primary reproduction criterion.

For example:

```text
Original:
p = .003

Reproduction:
p = .004
```

A small difference is unsurprising if the underlying estimate is nearly identical.

Conversely:

```text
Original:
p = .003

Reproduction:
p = .41
```

requires investigation.

The difference may result from:

- sample differences
- preprocessing
- model specification
- degrees of freedom
- variance estimation
- missing data

---

# 6. Statistical Test Statistics

Compare the test statistic where appropriate.

Examples:

```text
t
F
χ²
z
W
U
```

For example:

```text
Original:
t(59) = 3.12

Reproduction:
t(59) = 3.09
```

This provides more information than comparing p-values alone.

---

# 7. Effect Sizes

Effect sizes are often more informative than statistical significance.

Examples:

```text
Cohen's d
Hedges' g
η²
η²p
r
β
Odds ratio
Risk ratio
```

Example:

```text
Original:
d = 0.54

Reproduction:
d = 0.52
```

The difference may be small enough to be practically negligible.

---

# 8. Practical Significance

A numerically different result may still be scientifically equivalent.

For example:

```text
Original:
Accuracy = 0.882

Reproduction:
Accuracy = 0.879
```

Difference:

```text
0.003
```

Whether this matters depends on:

- measurement noise
- expected stochastic variation
- domain requirements
- sample size
- scientific claim

Do not treat every numerical difference as a scientific disagreement.

---

# 9. Equivalence Thinking

For some reproduction questions, define a smallest effect difference that would matter.

For example:

```text
SESOI = ±0.02
```

If:

```text
|reproduced − original| < 0.02
```

the difference may be practically negligible.

The threshold must be scientifically justified rather than selected after seeing the result.

---

# 10. Bayesian Reproduction

Bayesian analyses may compare:

```text
Posterior distributions
Credible intervals
Posterior means
Bayes factors
Posterior predictions
```

For example:

```text
Original posterior:
β ≈ 0.40

Reproduced posterior:
β ≈ 0.39
```

Compare the distributions rather than reducing everything to a p-value.

---

# 11. Prediction-Based Reproduction

For machine learning or predictive models, compare predictions as well as summary metrics.

Possible comparisons:

```text
Accuracy
AUC
F1
Calibration
Prediction correlation
Error distribution
Confusion matrix
```

Two models can have the same accuracy but very different predictions.

---

# 12. Heterogeneous or Stochastic Results

Some analyses naturally vary between runs.

Examples:

- neural networks
- bootstrap
- permutation tests
- Monte Carlo simulations
- random initialisation
- stochastic optimisation

Instead of asking:

```text
Did I obtain exactly the same number?
```

ask:

```text
Does the reproduced result fall within the
expected distribution of computational variation?
```

Run multiple seeds when appropriate.

---

# 13. Neuroimaging Reproduction Analysis

For neuroimaging, compare more than statistical significance.

### Activation location

Check:

```text
MNI coordinates
Talairach coordinates
ROI
Cluster extent
```

### Effect magnitude

Check:

```text
β
t
z
effect size
```

### Spatial agreement

Assess whether the reproduced activation overlaps the original region.

### Statistical threshold

Verify:

```text
Voxel threshold
Cluster threshold
FDR
FWE
Permutation threshold
```

A difference in statistical threshold can create apparently different brain maps even when the underlying data are identical.

---

# 14. EEG/MEG Reproduction Analysis

Compare:

```text
Sensor
Time window
Frequency band
Amplitude/power
Condition contrast
Statistical threshold
Cluster definition
```

For example:

```text
Original:
Alpha power difference, 300–500 ms

Reproduction:
Alpha power difference, 300–500 ms
```

Then compare effect magnitude and statistical evidence.

---

# 15. Machine-Learning Reproduction Analysis

Compare:

```text
Dataset
Split
Features
Model
Hyperparameters
Predictions
Metrics
```

Example:

| Metric   | Original | Reproduced |
| -------- | -------: | ---------: |
| Accuracy |     0.88 |       0.87 |
| F1       |     0.87 |       0.86 |
| AUC      |     0.93 |       0.92 |

If the model is stochastic, report variation across multiple runs:

```text
Accuracy:
Mean = 0.87
SD = 0.01
n = 10 seeds
```

---

# 16. Multiple Results

A paper may contain many results.

Do not select only the result that reproduces best.

Create a result matrix:

| Result   | Original    | Reproduced | Status           |
| -------- | ----------- | ---------- | ---------------- |
| Figure 2 | reproduced  | reproduced | Exact            |
| Figure 3 | reproduced  | close      | Close            |
| Table 2  | reproduced  | reproduced | Exact            |
| Table 3  | reproduced  | different  | Failed           |
| Figure 4 | unavailable | —          | Not reproducible |

This prevents selective reporting.

---

# 17. Result Categories

Use explicit categories:

### Exact

Numerical output is effectively identical under the reproduction conditions.

### Close

Small differences exist but are within predefined or scientifically reasonable expectations.

### Partial

Some components reproduce and others do not.

### Different

The reproduced result differs materially.

### Unavailable

The result cannot be evaluated because required evidence is missing.

---

# 18. Difference Attribution

When a difference appears, classify the likely source.

```text
DATA
Different dataset/version

PREPROCESSING
Different cleaning or transformation

MODEL
Different specification

ENVIRONMENT
Different software/dependencies

RANDOMNESS
Different stochastic realisation

NUMERICAL
Floating-point/hardware differences

DOCUMENTATION
Original procedure unclear

UNKNOWN
Cause cannot be established
```

Do not claim a cause without evidence.

---

# 19. Sensitivity Analysis

If a reproduction depends on an uncertain choice, test the sensitivity.

For example:

```text
Filter:
0.1–30 Hz
0.5–30 Hz
1–30 Hz
```

or:

```text
Random seed:
1
2
3
...
10
```

Then determine whether the conclusion is stable.

This is different from changing the original analysis to obtain a desired result.

---

# 20. Reproduction vs Statistical Replication

A reproduced p-value is not evidence that the scientific finding has been replicated.

The data are still the same.

Conceptually:

```text
Same data
+
Same analysis
→
Reproduction
```

whereas:

```text
New data
+
Same/related analysis
→
Replication
```

---

# 21. Scientific Interpretation

After the numerical comparison, ask:

### Was the original result recovered?

```text
YES / PARTIALLY / NO / UNKNOWN
```

### Was the effect direction preserved?

```text
YES / NO
```

### Was the magnitude similar?

```text
YES / NO / UNCERTAIN
```

### Was uncertainty similar?

```text
YES / NO / UNCERTAIN
```

### Was the statistical conclusion preserved?

```text
YES / NO
```

### Was the scientific conclusion preserved?

```text
YES / NO / UNCERTAIN
```

These questions should be answered separately.

---

# 22. Example Analysis

Suppose:

```text
Original:
β = −0.31
95% CI [−0.48, −0.14]
p < .001

Reproduction:
β = −0.30
95% CI [−0.47, −0.13]
p < .001
```

Interpretation:

```text
Direction:
Same

Magnitude:
Very similar

Uncertainty:
Very similar

Statistical inference:
Same

Scientific conclusion:
Same
```

This would generally support a close reproduction.

---

# 23. Example of a Material Difference

Suppose:

```text
Original:
β = −0.31
95% CI [−0.48, −0.14]
p < .001

Reproduction:
β = −0.08
95% CI [−0.29, 0.13]
p = .45
```

Interpretation:

```text
Direction:
Same

Magnitude:
Substantially different

Uncertainty:
Different

Statistical inference:
Different

Scientific conclusion:
Potentially different
```

The next step is to identify where the pipelines diverged.

---

# 24. Final Reproduction Statement

A good final statement should be precise.

Weak:

> The study was successfully reproduced.

Better:

> The primary regression was closely reproduced. The coefficient changed from β = −0.31 to β = −0.30, with similar confidence intervals and the same statistical conclusion. The small difference was attributed to the updated numerical library.

Or:

> The primary classification result could not be reproduced. The original reported AUC was 0.93, whereas the reproduction produced 0.76. The discrepancy arose after feature preprocessing, where the published procedure did not specify the transformation applied to three variables.

---

# Final Principle

> **Analyse reproduction results as evidence about agreement between two analytical pipelines. Compare estimates, uncertainty, effect direction, computational variation, and scientific interpretation—not merely whether a single p-value or headline number matches.**
