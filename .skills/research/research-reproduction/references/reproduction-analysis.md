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

## EEG/MEG Reproduction Analysis
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

## Machine-Learning Reproduction Analysis
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

## Multiple Results
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

## Sensitivity Analysis
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

## Reproduction vs Statistical Replication
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

## Final Reproduction Statement
A good final statement should be precise.

Weak:

> The study was successfully reproduced.

Better:

> The primary regression was closely reproduced. The coefficient changed from β = −0.31 to β = −0.30, with similar confidence intervals and the same statistical conclusion. The small difference was attributed to the updated numerical library.

Or:

> The primary classification result could not be reproduced. The original reported AUC was 0.93, whereas the reproduction produced 0.76. The discrepancy arose after feature preprocessing, where the published procedure did not specify the transformation applied to three variables.

---

## Final Principle
> **Analyse reproduction results as evidence about agreement between two analytical pipelines. Compare estimates, uncertainty, effect direction, computational variation, and scientific interpretation—not merely whether a single p-value or headline number matches.**
