# Example: Psychology Research Reproduction

## Reproduction Target
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

## Original Analysis Pipeline
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

## Participant Validation
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

## Trial Validation
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

## Statistical Reproduction
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

## Result Interpretation
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

## Result Classification
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

## Final Reproduction Statement
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
