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

## Figure Reproduction
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

## Table Reproduction
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

## Pipeline Reproduction
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

## Reproduction vs Reanalysis
These are fundamentally different.

#### Reproduction

```text
Original data
+
Original analysis
→
Original result
```

#### Reanalysis

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

## Reproduction vs Replication
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

## Final Principle
> **Classify the reproduction precisely. A result that was partially reproduced, could not be attempted, or differed because of a documented environmental change should not be collapsed into a simple success/failure label.**
