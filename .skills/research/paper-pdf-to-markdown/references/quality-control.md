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

# 1. Validation Priority

Check in this order:

```text
1. Scientific numbers
2. Equations
3. Tables
4. Statistics
5. Figure captions
6. Citations
7. Section order
8. General prose
9. Cosmetic formatting
```

Scientific fidelity is more important than visual perfection.

---

# 2. Critical Errors

## Sign Error

Original:

```text
β = −0.31
```

Extracted:

```text
β = 0.31
```

This can reverse the scientific interpretation.

---

## Decimal Error

Original:

```text
p = .05
```

Extracted:

```text
p = .5
```

This is a major error.

---

## Sample-Size Error

Original:

```text
N = 128
```

Extracted:

```text
N = 18
```

This can affect interpretation of the entire study.

---

# 3. Equation Validation

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

# 4. Table Validation

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

# 5. Figure Validation

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

# 6. Citation Validation

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

# 7. Reference Validation

Check:

```text
Authors
Year
Title
Journal
Volume
Issue
Pages
DOI
```

Do not fabricate missing information.

---

# 8. OCR Validation

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

# 9. Statistical Validation

Search the Markdown for:

```text
p =
p <
p >
t(
F(
χ²
r =
d =
β =
R²
CI
```

Then compare each important value against the PDF.

---

# 10. Unit Validation

Check that units have not disappeared.

Examples:

```text
20 ms
3 mm
100 Hz
2.5 T
```

should remain intact.

---

# 11. Section Validation

Verify:

```text
Abstract
Introduction
Methods
Results
Discussion
Conclusion
References
```

appear in the correct order.

Not every paper has every section, so validate against the actual source structure.

---

# 12. Reading-Order Validation

Read the Markdown as a continuous document.

Ask:

```text
Does every paragraph logically follow the previous paragraph?
```

Unexpected jumps may indicate:

```text
Two-column extraction error
Figure placement error
Footnote insertion error
Sidebar extraction
```

---

# 13. Header/Footer Validation

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

# 14. Hyphenation Validation

Search for suspicious line-break hyphenation:

```text
neuro-
science
```

Correct when appropriate:

```text
neuroscience
```

But preserve genuine compounds:

```text
state-of-the-art
long-term
cross-validation
```

---

# 15. Missing Content

Check for:

```text
Missing paragraph
Missing heading
Missing equation
Missing table
Missing figure caption
Missing reference
Missing footnote
```

A successful extraction should account for the major elements of the original document.

---

# 16. Confidence Levels

Classify extracted content internally.

### High confidence

Content is clearly recoverable.

### Medium confidence

Content is probably correct but needs verification.

### Low confidence

OCR, layout, or PDF quality makes reliable reconstruction difficult.

Low-confidence scientific content should be explicitly flagged.

---

# 17. Extraction Notes

Use explicit notes when needed:

```markdown
> [Extraction note: The superscript in Equation 2 was unclear in the source PDF.]
```

or:

```markdown
> [Extraction note: Table 3 contains a partially unreadable value.]
```

Never silently guess.

---

# 18. Render Validation

Render the Markdown using a compatible Markdown renderer.

Inspect:

```text
Headings
Tables
Equations
Images
Lists
Links
Special characters
```

---

# 19. Broken Markdown

Check for:

```text
Unclosed code fences
Broken tables
Malformed LaTeX
Broken links
Missing image paths
Incorrect heading levels
```

Technical validity is necessary but not sufficient.

---

# 20. Scientific Fidelity

Ask:

```text
Did any number change?
Did any sign change?
Did any decimal change?
Did any unit disappear?
Did any equation change?
Did any citation disappear?
Did any table cell change?
Did any figure caption disappear?
```

---

# 21. Domain-Specific Checks

## Neuroscience

Check:

```text
Brain regions
Coordinates
Frequency bands
Time windows
Electrodes
Sensors
Statistical thresholds
```

## Psychology

Check:

```text
Participant N
Reaction times
Accuracy
Conditions
Scales
ANOVA statistics
```

## Clinical Neuroscience

Check:

```text
Patient N
Clinical scales
Outcome direction
Time points
Units
Imaging measurements
```

## Machine Learning

Check:

```text
Dataset size
Train/test split
Metrics
Hyperparameters
Equations
Feature dimensions
Cross-validation
```

---

# 22. Final Quality Checklist

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

# Final Principle

> **Quality control is complete only when the Markdown has been checked against the source PDF, especially wherever a single character, number, symbol, or structural error could change the scientific meaning.**
