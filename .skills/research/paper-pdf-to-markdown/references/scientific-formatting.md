# Scientific Formatting

## Purpose

Preserve scientific notation when converting papers from PDF to Markdown.

The highest priority is:

```text
Scientific meaning
    >
Visual similarity
    >
Formatting convenience
```

---

## Mathematical Expressions
Use LaTeX for mathematical content.

Inline:

```markdown
The model assumes $y = X\beta + \epsilon$.
```

Display:

```markdown
$$
y = X\beta + \epsilon
$$
```

---

## Minus Sign versus Hyphen
These are not necessarily the same character:

```text
-
−
```

Use the mathematically appropriate representation.

For example:

```markdown
$-0.42$
```

for mathematical notation.

---

## Scientific Abbreviations
If the paper defines:

```text
functional magnetic resonance imaging (fMRI)
```

preserve the definition.

Later occurrences can remain:

```text
fMRI
```

Do not introduce a new abbreviation.

---

## Neuroimaging Coordinates
Preserve:

```text
x = −42, y = 18, z = 24
```

including:

- Coordinate system
- Sign
- Units
- Region label

Do not change coordinate order.

---

## Tables
Preserve:

```text
Column order
Row order
Headers
Units
Decimal precision
Significance markers
```

Example:

```markdown
| Condition |    M |  SD |    p |
| --------- | ---: | --: | ---: |
| Control   | 82.4 | 9.1 | .032 |
| Treatment | 87.2 | 8.7 | .011 |
```

Do not round values unless the source does.

---

## Figure Captions
Preserve all scientific notation in captions.

Captions may contain:

```text
p-values
Coordinates
Time windows
Sample sizes
Thresholds
Abbreviations
```

---

## Scientific Identifiers
Be especially careful with case-sensitive identifiers:

```text
Gene names
Protein names
Model names
Dataset identifiers
DOIs
Algorithm names
```

Do not normalise capitalization without evidence.

---

## Scientific Formatting Checklist
```text
[ ] Equations
[ ] Greek letters
[ ] Superscripts
[ ] Subscripts
[ ] Negative signs
[ ] P-values
[ ] Confidence intervals
[ ] Effect sizes
[ ] Percentages
[ ] Units
[ ] Coordinates
[ ] Frequency ranges
[ ] Statistical symbols
[ ] Tables
[ ] Scientific identifiers
```

---

## Final Principle
> **When converting scientific notation, preserve meaning before appearance and verify every high-risk symbol against the source PDF.**
