# Example: Clinical Neuroscience Research Reproduction

## Scenario

A clinical neuroscience study investigates whether lesion volume predicts language outcome after stroke.

The study includes:

- stroke patients
- lesion volume measurements
- language assessment scores
- MRI data
- follow-up assessment
- regression analysis

The reproduction target is the primary regression reported in the paper.

---

## 1. Reproduction Target

The original paper reports:

```text id="3t8wq1"
Outcome:
Language score at 6 months

Predictor:
Lesion volume

Result:
β = −0.31
95% CI [−0.48, −0.14]
p < .001
```

The reproduction asks:

> Can the reported association between lesion volume and 6-month language outcome be recovered using the original data and analysis procedure?

---

## 2. Original Pipeline

```text id="5c8v2m"
MRI data
   ↓
Lesion segmentation
   ↓
Lesion volume
   ↓
Clinical assessment
   ↓
Participant exclusions
   ↓
Regression model
   ↓
6-month language outcome
```

---

## 3. Participant Validation

Original:

```text id="8q6m2r"
Initial patients: 96
Excluded: 12
Final analysis sample: 84
```

Reproduction:

```text id="1w5c9v"
Initial patients: 96
Excluded: 12
Final analysis sample: 84
```

Participant count is reproduced.

---

## 4. Clinical Outcome Validation

The original study uses a language assessment scored from 0 to 100.

The paper specifies:

```text id="h4n7px"
Higher score = better language performance
```

The reproduction confirms the same scoring direction.

This is important because reversing the score would reverse the interpretation of the regression coefficient.

---

## 5. Imaging Validation

The original lesion volumes are reported in millilitres.

The reproduction confirms:

```text id="5f9x8d"
Unit: mL
Number of participants: 84
Missing lesion volumes: 0
```

Descriptive statistics:

| Variable           | Original | Reproduced |
| ------------------ | -------: | ---------: |
| Mean lesion volume |  32.8 mL |    32.8 mL |
| SD                 |  21.4 mL |    21.4 mL |
| N                  |       84 |         84 |

---

## 6. Regression Specification

The original model is:

```text id="z6x8qs"
Language outcome
~
Lesion volume
+
Age
+
Time since stroke
```

The reproduction uses the same predictors.

This is critical.

A model containing only:

```text id="n1t7pz"
Language outcome ~ lesion volume
```

would not be the same analysis.

---

## 7. Regression Reproduction

Original:

```text id="x8q5c0"
β = −0.31
95% CI [−0.48, −0.14]
p < .001
```

Reproduction:

```text id="m9z3q6"
β = −0.30
95% CI [−0.47, −0.13]
p < .001
```

Comparison:

| Statistic | Original | Reproduced |
| --------- | -------: | ---------: |
| β         |    −0.31 |      −0.30 |
| Lower CI  |    −0.48 |      −0.47 |
| Upper CI  |    −0.14 |      −0.13 |
| p         |   < .001 |     < .001 |

---

## 8. Interpretation

The negative coefficient is preserved:

```text id="4g7r8s"
Larger lesion volume
        ↓
Lower language outcome
```

The reproduction therefore supports the same direction and scientific interpretation.

---

## 9. Clinical Failure Case

Suppose the reproduction accidentally reverses the clinical scale:

```text id="j9w4h1"
Reversed score = 100 − original score
```

The resulting regression might become:

```text id="7b2m5k"
β = +0.30
```

This does not mean the original result failed to reproduce.

It means the reproduction implementation is incorrect.

The error should be identified by validating the outcome definition before interpreting the regression.

---

## 10. Another Failure Case

Suppose 10 patients with missing follow-up data are removed during reproduction, but the original analysis used a documented imputation procedure.

Then:

```text id="k4p6s9"
Original N = 84
Reproduction N = 74
```

The resulting regression cannot be considered a faithful reproduction until the missing-data procedure is corrected.

---

## 11. Result Classification

The correct reproduction is:

```text id="y3m7p2"
Close reproduction
```

because:

- sample size matches
- clinical outcome definition matches
- lesion-volume units match
- predictors match
- coefficient is nearly identical
- confidence interval is nearly identical
- p-value and inference match

---

## 12. Final Reproduction Statement

> The primary association between lesion volume and 6-month language outcome was closely reproduced. The original coefficient was β = −0.31 (95% CI [−0.48, −0.14]), compared with β = −0.30 (95% CI [−0.47, −0.13]) in the reproduction. The direction, magnitude, uncertainty, and statistical conclusion were consistent with the published analysis.

---

## Clinical-Neuroscience Lessons

This example highlights the importance of validating:

- patient N
- diagnosis
- clinical scale
- score direction
- lesion measurements
- units
- missing-data handling
- follow-up timing
- regression specification
- covariates
- confidence intervals

Clinical reproduction requires particular care because seemingly small errors in outcome definitions or scoring direction can reverse the scientific interpretation.
