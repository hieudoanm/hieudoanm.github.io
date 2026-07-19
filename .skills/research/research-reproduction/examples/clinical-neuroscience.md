# Example: Clinical Neuroscience Research Reproduction

## Reproduction Target
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

## Participant Validation
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

## Clinical Outcome Validation
The original study uses a language assessment scored from 0 to 100.

The paper specifies:

```text id="h4n7px"
Higher score = better language performance
```

The reproduction confirms the same scoring direction.

This is important because reversing the score would reverse the interpretation of the regression coefficient.

---

## Imaging Validation
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

## Regression Reproduction
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

## Interpretation
The negative coefficient is preserved:

```text id="4g7r8s"
Larger lesion volume
        ↓
Lower language outcome
```

The reproduction therefore supports the same direction and scientific interpretation.

---

## Another Failure Case
Suppose 10 patients with missing follow-up data are removed during reproduction, but the original analysis used a documented imputation procedure.

Then:

```text id="k4p6s9"
Original N = 84
Reproduction N = 74
```

The resulting regression cannot be considered a faithful reproduction until the missing-data procedure is corrected.

---

## Result Classification
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

## Final Reproduction Statement
> The primary association between lesion volume and 6-month language outcome was closely reproduced. The original coefficient was β = −0.31 (95% CI [−0.48, −0.14]), compared with β = −0.30 (95% CI [−0.47, −0.13]) in the reproduction. The direction, magnitude, uncertainty, and statistical conclusion were consistent with the published analysis.

---
