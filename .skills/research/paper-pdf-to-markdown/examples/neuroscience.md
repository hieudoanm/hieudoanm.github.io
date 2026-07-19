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

## Original PDF Structure
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

## Statistical Notation
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

## Equations
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

## Figure Captions
Preserve figure captions as semantic content:

```markdown
### Figure 2

_Figure 2. Time-frequency representations of EEG activity
following stimulus presentation. Significant clusters are
outlined in black._
```

The caption should remain attached to the correct figure.

If the actual image is not available, do not invent one.

---

## Common Failure
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

## Final Validation
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
