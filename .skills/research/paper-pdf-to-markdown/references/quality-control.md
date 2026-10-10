# Quality Control

## Purpose

Quality control determines whether a PDF-to-Markdown conversion is scientifically trustworthy.

A Markdown document can:

```text
Render correctly
+
Look clean
+
Still contain serious scientific errors
```

Therefore validation must compare the Markdown against the original PDF.

---

## Equation Validation
For every important equation, check:

```text
Variables
Operators
Signs
Superscripts
Subscripts
Parentheses
Fractions
Indices
Summations
```

Example:

```text
Original:
β̂ = (XᵀX)⁻¹Xᵀy
```

Verify:

```markdown
$$
\hat{\beta} = (X^T X)^{-1} X^T y
$$
```

---

## Table Validation
For every important table, check:

```text
Table number
Title
Row count
Column count
Headers
Values
Units
Footnotes
Significance markers
```

---

## Figure Validation
Check:

```text
Figure number
Caption
Panel labels
Variables
Conditions
Statistical annotations
```

If the image is unavailable, ensure the caption remains.

---

## Citation Validation
Check that:

```text
In-text citation
       ↓
Reference-list entry
```

remains connected.

For numeric citations:

```text
[12]
```

should still correspond to reference 12.

---

## OCR Validation
Search for common OCR errors:

```text
0 ↔ O
1 ↔ l ↔ I
rn ↔ m
− ↔ -
μ ↔ u
α ↔ a
β ↔ B
```

Also inspect:

```text
Superscripts
Subscripts
Greek letters
P-values
Coordinates
Units
```

---

## Header/Footer Validation
Search for repeated content.

If the same string appears at the top or bottom of every page:

```text
Journal name
Article title
Page number
```

it is probably layout metadata.

Remove it unless it carries scientific meaning.

---

## Final Quality Checklist
```text
[ ] Correct PDF/version
[ ] Correct title
[ ] Correct authors
[ ] Correct abstract
[ ] Correct section order
[ ] Correct reading order
[ ] Correct equations
[ ] Correct tables
[ ] Correct figures/captions
[ ] Correct statistics
[ ] Correct units
[ ] Correct citations
[ ] Correct references
[ ] OCR reviewed
[ ] Hyphenation reviewed
[ ] Special characters reviewed
[ ] Uncertainty flagged
[ ] Markdown renders correctly
[ ] Final comparison against PDF completed
```

---

## Final Principle
> **Quality control is complete only when the Markdown has been checked against the source PDF, especially wherever a single character, number, symbol, or structural error could change the scientific meaning.**
