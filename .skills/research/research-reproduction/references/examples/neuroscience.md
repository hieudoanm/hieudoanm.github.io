# Example: Neuroscience Research Reproduction

## Scenario

A published EEG study reports that speech-related stimuli produce increased theta-band power over frontotemporal electrodes.

The paper provides:

- EEG data
- preprocessing scripts
- statistical analysis code
- participant exclusions
- frequency-band definitions
- a published figure showing the main effect

The reproduction target is the primary EEG result.

---

## 1. Reproduction Target

### Original claim

The authors report increased theta-band power during the experimental condition compared with the control condition.

### Target

```text id="w0t8g6"
Figure 3B
Primary theta-band condition contrast
300–600 ms
4–8 Hz
Frontotemporal electrodes
```

### Reported result

```text id="a7l3q9"
t(31) = 3.42
p = .002
d = 0.61
```

---

## 2. Original Pipeline

The published analysis can be reconstructed as:

```text id="7x8jbm"
Raw EEG
   ↓
Band-pass filtering
   ↓
Bad-channel detection
   ↓
Artifact rejection
   ↓
Epoching
   ↓
Baseline correction
   ↓
Time-frequency decomposition
   ↓
4–8 Hz theta power
   ↓
300–600 ms window
   ↓
Condition contrast
   ↓
Statistical test
   ↓
Figure 3B
```

---

## 3. Data Validation

The original study reports:

```text id="d3c8ta"
Initial participants: 36
Excluded participants: 4
Final participants: 32
```

The reproduction obtains:

```text id="q3c7wr"
Initial participants: 36
Excluded participants: 4
Final participants: 32
```

### Status

```text
Participant count: reproduced
Exclusion count: reproduced
Final N: reproduced
```

---

## 4. Preprocessing Validation

The original analysis specifies:

```text id="l0k5nz"
Sampling rate: 1000 Hz
Band-pass filter: 0.1–40 Hz
Epoch: −500 to 1000 ms
Baseline: −200 to 0 ms
```

The reproduction uses the same parameters.

Intermediate checks show:

| Stage           | Original | Reproduced |
| --------------- | -------: | ---------: |
| Participants    |       32 |         32 |
| Epochs          |    6,144 |      6,144 |
| Retained epochs |    5,876 |      5,876 |
| Channels        |       64 |         64 |

The preprocessing stage therefore appears to be successfully reproduced.

---

## 5. Time-Frequency Analysis

The paper defines theta as:

```text id="7qj6d9"
4–8 Hz
```

and the primary analysis window as:

```text id="4jz5ms"
300–600 ms
```

The reproduction uses the same definitions.

The mean condition difference is:

```text id="0x9m3k"
Original:
Δ theta power = 0.184

Reproduction:
Δ theta power = 0.181
```

The difference is small.

---

## 6. Statistical Reproduction

Original:

```text id="9r9u2k"
t(31) = 3.42
p = .002
d = 0.61
```

Reproduction:

```text id="7u4p3c"
t(31) = 3.38
p = .002
d = 0.60
```

Comparison:

| Statistic | Original | Reproduced |
| --------- | -------: | ---------: |
| t         |     3.42 |       3.38 |
| df        |       31 |         31 |
| p         |     .002 |       .002 |
| Cohen's d |      .61 |        .60 |

---

## 7. Figure Reproduction

The original Figure 3B shows:

- theta-band increase
- 300–600 ms effect
- frontotemporal electrodes
- significant condition contrast

The reproduced figure shows the same:

```text id="9i7a7m"
Direction: same
Time window: same
Frequency band: same
Electrode region: same
Statistical conclusion: same
```

Small numerical differences occur in the plotted values.

---

## 8. Result Classification

```text id="j7j5ba"
Reproduction status:
Close reproduction
```

The result is not claimed to be mathematically identical because the numerical values differ slightly.

However:

- participant count matches
- preprocessing matches
- analysis window matches
- frequency band matches
- effect direction matches
- effect size is nearly identical
- statistical conclusion matches

---

## 9. Difference Investigation

The small difference is traced to a difference in the numerical implementation of the time-frequency transform between the original and current software versions.

The analysis pipeline itself is unchanged.

---

## 10. Final Reproduction Statement

> The primary EEG theta-band result was closely reproduced. The reproduced test statistic was _t_(31) = 3.38 compared with the published _t_(31) = 3.42, with the same statistical conclusion and a nearly identical effect size. The small numerical difference is consistent with differences in the time-frequency implementation between software versions.

---

## Neuroscience Lessons

This example demonstrates why neuroscience reproduction requires checking:

- participant N
- epoch counts
- sampling rate
- filter parameters
- baseline
- electrode configuration
- frequency bands
- time windows
- statistical thresholds
- effect sizes
- figure structure

A result should not be considered reproduced simply because the final p-value is similar.
