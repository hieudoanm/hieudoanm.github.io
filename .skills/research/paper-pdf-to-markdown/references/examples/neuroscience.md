# Example: Neuroscience Paper

## Scenario

A neuroscience paper contains:

- A two-column PDF layout
- EEG recordings
- Time-frequency analysis
- Brain figures
- Statistical tables
- Mathematical equations
- Approximately 40 references

The goal is to convert the paper into Markdown while preserving the scientific meaning and document structure.

---

## 1. Original PDF Structure

A typical structure might be:

```text
Title
Authors
Affiliations

Abstract

1. Introduction
2. Methods
   2.1 Participants
   2.2 EEG Recording
   2.3 Preprocessing
   2.4 Time-Frequency Analysis
   2.5 Statistical Analysis
3. Results
   3.1 Behavioural Results
   3.2 EEG Results
4. Discussion

Figure 1
Figure 2
Table 1

References
```

The PDF may visually place figures, tables, and text in different columns.

---

## 2. Markdown Structure

A faithful Markdown conversion should reconstruct the semantic structure:

```markdown
# Title

**Authors:** Author A, Author B, Author C

## Abstract

...

## 1. Introduction

...

## 2. Methods

### 2.1 Participants

...

### 2.2 EEG Recording

...

### 2.3 Preprocessing

...

### 2.4 Time-Frequency Analysis

...

### 2.5 Statistical Analysis

...

## 3. Results

### 3.1 Behavioural Results

...

### 3.2 EEG Results

...

## 4. Discussion

...

## Figure 1

_Figure 1. Experimental design and EEG recording setup._

...

## Table 1

| Condition   | Mean |  SD |
| ----------- | ---: | --: |
| Condition A |  512 |  71 |
| Condition B |  547 |  76 |

## References

1. Author A. ...
2. Author B. ...
```

The Markdown should represent the **logical structure**, not the physical coordinates of the PDF.

---

## 3. Statistical Notation

Suppose the PDF contains:

> t(28) = 2.84, p = .008, d = .54

Preserve the notation:

```markdown
The effect was statistically significant,
$t(28)=2.84$, $p=.008$, $d=.54$.
```

Do not convert this into prose such as:

> The test was significant with a medium effect.

That would introduce interpretation that was not present in the source.

---

## 4. Equations

Suppose the paper contains:

> Power(f,t) = |X(f,t)|²

Represent it using LaTeX:

```markdown
$$
Power(f,t)=|X(f,t)|^2
$$
```

Do not replace the equation with an approximate textual description.

---

## 5. Figure Captions

Preserve figure captions as semantic content:

```markdown
## Figure 2

_Figure 2. Time-frequency representations of EEG activity
following stimulus presentation. Significant clusters are
outlined in black._
```

The caption should remain attached to the correct figure.

If the actual image is not available, do not invent one.

---

## 6. Neuroscience-Specific Quality Control

Pay particular attention to:

### Electrode names

Verify labels such as:

```text
Fz
Cz
Pz
F3
F4
C3
C4
```

A single character error can change the anatomical meaning.

### Frequency bands

Preserve ranges exactly:

```text
theta: 4–8 Hz
alpha: 8–13 Hz
beta: 13–30 Hz
gamma: 30–100 Hz
```

Do not silently change boundaries.

### Time windows

Verify values such as:

```text
−200 to 0 ms
0 to 500 ms
300–600 ms
```

### Brain regions

Preserve anatomical terminology exactly:

```text
inferior frontal gyrus
superior temporal gyrus
motor cortex
hippocampus
```

### Neuroimaging coordinates

Preserve coordinate systems and signs:

```text
MNI: x = −42, y = 18, z = 24
```

A sign error can change the anatomical location.

### Statistical thresholds

Verify:

- p-values
- corrected thresholds
- cluster thresholds
- FDR thresholds
- family-wise error correction
- permutation thresholds
- confidence intervals

### Participant numbers

Check:

```text
N = 32
n = 16 per condition
```

Do not confuse participant counts with trials, electrodes, or observations.

---

## 7. Common Failure

A PDF extraction may produce:

```text
alpha power increased in the left tempor al
cortex during speech perception.
```

The conversion should reconstruct:

```text
Alpha power increased in the left temporal cortex
during speech perception.
```

However, it should not change the sentence to:

```text
Alpha power increased in auditory cortex.
```

That would be interpretation rather than extraction.

---

## 8. Final Validation

For neuroscience papers, compare the Markdown against the PDF for:

- participant N
- electrode labels
- frequency ranges
- time windows
- anatomical regions
- coordinates
- statistical values
- correction methods
- equations
- figure captions
- table values
- references
- Greek symbols
- superscripts and subscripts

### Final principle

> Preserve the scientific structure and numerical meaning of the neuroscience paper. Never let a formatting correction silently become a scientific interpretation.
