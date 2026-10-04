# Example: Psychology Research Reproduction

## Scenario

A psychology paper investigates whether incongruent visual stimuli increase reaction times.

The study reports:

- 60 participants
- congruent and incongruent conditions
- reaction-time data
- accuracy data
- paired statistical analysis

The reproduction target is the primary behavioural result.

---

## 1. Reproduction Target

### Research question

> Do participants respond more slowly to incongruent stimuli than to congruent stimuli?

### Primary result

The paper reports:

```text id="m7kq2x"
Congruent:
M = 512 ms
SD = 71 ms

Incongruent:
M = 547 ms
SD = 76 ms

t(59) = 3.12
p = .003
d = 0.40
```

---

## 2. Original Analysis Pipeline

```text id="0e7bq4"
Raw trials
   ↓
Remove incorrect responses
   ↓
Remove RT < 150 ms
   ↓
Remove RT > 1500 ms
   ↓
Participant-level means
   ↓
Congruent vs incongruent comparison
   ↓
Paired t-test
```

---

## 3. Participant Validation

Original:

```text id="r4t9d2"
N = 60
```

Reproduction:

```text id="z3x5p7"
N = 60
```

No participant-level discrepancy is found.

---

## 4. Trial Validation

Original:

```text id="z0y8pq"
Total trials: 7,200
Incorrect trials removed: 312
RT exclusions: 148
Final trials: 6,740
```

Reproduction:

```text id="j1q5s8"
Total trials: 7,200
Incorrect trials removed: 312
RT exclusions: 148
Final trials: 6,740
```

The preprocessing stage is reproduced exactly.

---

## 5. Descriptive Statistics

Original:

| Condition   | Mean RT |    SD |
| ----------- | ------: | ----: |
| Congruent   |  512 ms | 71 ms |
| Incongruent |  547 ms | 76 ms |

Reproduction:

| Condition   | Mean RT |    SD |
| ----------- | ------: | ----: |
| Congruent   |  512 ms | 71 ms |
| Incongruent |  547 ms | 76 ms |

The descriptive statistics match after rounding.

---

## 6. Statistical Reproduction

Original:

```text id="h6g0b3"
t(59) = 3.12
p = .003
d = 0.40
```

Reproduction:

```text id="8z9m3v"
t(59) = 3.11
p = .003
d = 0.40
```

Comparison:

| Statistic | Original | Reproduced |
| --------- | -------: | ---------: |
| t         |     3.12 |       3.11 |
| df        |       59 |         59 |
| p         |     .003 |       .003 |
| d         |      .40 |        .40 |

---

## 7. Result Interpretation

The original conclusion was:

> Participants responded more slowly in the incongruent condition.

The reproduction supports the same conclusion.

The direction is:

```text id="x4pkq9"
Congruent < Incongruent
```

and therefore:

```text id="j8m4tw"
512 ms < 547 ms
```

---

## 8. Potential Failure

Suppose a researcher accidentally uses:

```text id="4q2s9n"
RT < 100 ms
RT > 2000 ms
```

instead of:

```text id="9m5c7w"
RT < 150 ms
RT > 1500 ms
```

The analysis may still produce a statistically significant effect.

However, it would not be a faithful reproduction.

This illustrates why matching the final conclusion is insufficient.

---

## 9. Alternative Failure

Suppose the researcher analyses trial-level data directly with an independent-samples t-test rather than calculating participant-level means and performing the original paired test.

The resulting p-value might be highly significant.

Nevertheless:

```text id="j0f1a4"
Original:
Paired participant-level analysis

Reproduction:
Independent trial-level analysis
```

These are different analyses.

The second result is a reanalysis, not a reproduction.

---

## 10. Result Classification

The correct reproduction:

```text id="3t6m1q"
Close reproduction
```

The statistical values differ only minimally while:

- N matches
- trial exclusions match
- descriptive statistics match
- statistical model matches
- effect direction matches
- effect size matches
- inference matches

---

## 11. Final Reproduction Statement

> The primary reaction-time effect was closely reproduced. The original analysis reported _t_(59) = 3.12, _p_ = .003, _d_ = .40, while the reproduction produced _t_(59) = 3.11, _p_ = .003, _d_ = .40. Participant counts, trial exclusions, descriptive statistics, and the statistical procedure were consistent with the original analysis.

---

## Psychology Lessons

This example demonstrates the importance of checking:

- participant N
- trial N
- exclusion thresholds
- reaction-time units
- participant-level aggregation
- statistical-test choice
- effect size
- condition labels

A matching conclusion does not compensate for a different analysis pipeline.
