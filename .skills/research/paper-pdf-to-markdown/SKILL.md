---
name: paper-pdf-to-markdown
description: Convert scientific papers from PDF into structured, faithful Markdown by extracting document structure, preserving equations, tables, figures, citations, references, and formatting, while detecting and correcting common PDF extraction and OCR errors.
---

# Paper PDF to Markdown

## Purpose

Convert a scientific paper from PDF into high-quality Markdown that preserves the structure and scientific meaning of the original document.

The goal is **not** simply:

```text
PDF
↓
Extract text
↓
Markdown
```

The goal is:

```text
PDF
↓
Understand document structure
↓
Extract text and scientific elements
↓
Reconstruct sections
↓
Preserve equations, tables, figures, captions and citations
↓
Detect extraction errors
↓
Validate against the original PDF
↓
Structured Markdown
```

---

# Core Principle

> **A good PDF-to-Markdown conversion preserves the scientific meaning and structure of the paper, not merely its visible text.**

PDFs are designed primarily for visual presentation.

Markdown is designed primarily for structured text.

Therefore conversion requires reconstruction.

---

# 1. Identify the Source

Before extraction, determine:

```text
PDF type
    ↓
Text-based PDF?
Scanned PDF?
Hybrid PDF?
    ↓
Available text extraction
    +
Available visual information
```

Prefer the original publisher or author PDF when possible.

Record:

- Title
- Authors
- Year
- Journal/conference
- DOI
- Version
- Supplementary material availability

Do not silently substitute a different version.

---

# 2. Inspect the PDF

Before converting the entire document, inspect:

```text
First page
Table of contents if present
Several body pages
Pages containing equations
Pages containing tables
Pages containing figures
References
Supplementary sections
```

Look for:

- Two-column layouts
- Headers and footers
- Page numbers
- Footnotes
- Superscripts
- Subscripts
- Mathematical notation
- Greek letters
- Tables
- Figure captions
- References
- Hyphenated words
- Ligatures
- OCR errors

---

# 3. Determine the Reading Order

PDF content is often stored according to layout coordinates rather than logical reading order.

For a two-column paper:

```text
Column 1
↓
Column 2
```

must usually become:

```text
Column 1 text
↓
Column 2 text
```

rather than:

```text
Line 1 column 1
Line 1 column 2
Line 2 column 1
Line 2 column 2
```

Reading order errors can completely change scientific meaning.

---

# 4. Remove Layout Noise

Usually remove:

- Repeated page headers
- Repeated page footers
- Page numbers
- Running titles
- Publisher watermarks
- Decorative elements

But preserve meaningful:

- Footnotes
- Section labels
- Figure labels
- Table labels
- Supplementary references

Never remove content merely because it appears visually small.

---

# 5. Reconstruct the Document Hierarchy

Convert visual hierarchy into Markdown hierarchy.

For example:

```text
Introduction
Methods
    Participants
    Procedure
    Analysis
Results
    Behavioural results
    Neuroimaging results
Discussion
```

becomes:

```markdown
# Introduction

# Methods

## Participants

## Procedure

## Analysis

# Results

## Behavioural Results

## Neuroimaging Results

# Discussion
```

Preserve the original hierarchy where it is clear.

Do not invent headings merely to make the document look organized.

---

# 6. Preserve Scientific Content

Preserve:

```text
Numbers
Units
Statistical values
P-values
Confidence intervals
Effect sizes
Sample sizes
Equations
Variable names
Abbreviations
Citations
References
```

Do not silently simplify:

```text
p < .001
```

into:

```text
significant
```

Do not change:

```text
r = −0.42
```

into:

```text
r = -0.42
```

unless the Markdown representation requires it and the meaning remains identical.

---

# 7. Equations

Convert mathematical expressions into LaTeX where possible.

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

Preserve:

- Superscripts
- Subscripts
- Greek letters
- Fractions
- Matrices
- Operators
- Statistical notation

Never replace a complex equation with an approximate prose description unless the equation cannot be recovered.

If uncertain, flag it.

Example:

```markdown
> [Extraction note: equation partially unreadable in the PDF.]
```

---

# 8. Tables

Reconstruct tables as Markdown tables when practical.

Example:

```markdown
| Group     |   N | Mean |  SD |
| --------- | --: | ---: | --: |
| Control   |  30 | 82.4 | 9.1 |
| Treatment |  32 | 87.2 | 8.7 |
```

Preserve:

- Column names
- Row names
- Units
- Footnotes
- Statistical annotations
- Significance markers

If a table is too complex for reliable Markdown reconstruction, preserve it as a structured representation and explicitly note the limitation.

---

# 9. Figures

Do not pretend that a figure is text.

Represent figures using:

```markdown
![Figure 1: Description](...)
```

when an image asset is available.

Otherwise preserve the caption:

```markdown
### Figure 1

_Figure 1. Caption reproduced from the paper._
```

Preserve:

- Figure number
- Caption
- Panel labels
- Referenced variables
- Important annotations

Do not infer quantitative values from a graph unless the paper explicitly provides them.

---

# 10. Figure Captions

Figure captions are part of the scientific content.

Preserve them even when:

```text
Figure image unavailable
```

because captions often contain:

- Experimental conditions
- Statistical tests
- Sample sizes
- Brain regions
- Time windows
- Model parameters

---

# 11. Citations

Preserve in-text citations.

For example:

```markdown
Previous studies have reported similar effects (Smith et al., 2022).
```

or:

```markdown
Previous studies have reported similar effects [12, 13].
```

Do not renumber references unless necessary.

If numeric citations are used, preserve their original numbering.

---

# 12. References

Create a dedicated section:

```markdown
# References
```

Preserve each reference as faithfully as possible.

Example:

```markdown
1. Smith, J., et al. (2022). Title of article. _Journal Name_, 12(3), 100–115. https://doi.org/...
```

Do not invent:

- DOI
- Page numbers
- Authors
- Publication year

If information is missing:

```text
[DOI unavailable in source]
```

---

# 13. Abstract

Preserve the abstract near the beginning.

If the paper contains structured headings:

```markdown
## Background

## Methods

## Results

## Conclusions
```

preserve them.

Do not rewrite the abstract as a summary.

---

# 14. Metadata

A Markdown document may begin with metadata:

```yaml
---
title: 'Paper Title'
authors:
  - First Author
  - Second Author
year: 2026
doi: '10.xxxx/example'
source: 'publisher PDF'
---
```

Only include metadata that is known.

---

# 15. OCR

For scanned PDFs:

```text
PDF
↓
OCR
↓
Text extraction
↓
Structure reconstruction
↓
Quality control
```

OCR output must be treated as potentially unreliable.

Common errors include:

```text
0 ↔ O
1 ↔ l ↔ I
− ↔ -
μ ↔ u
α ↔ a
β ↔ B
rn ↔ m
```

Scientific notation requires particular care.

---

# 16. Hyphenation

PDF line wrapping may produce:

```text
neuro-
science
```

which should usually become:

```text
neuroscience
```

But do not automatically remove every hyphen.

Preserve legitimate compounds:

```text
state-of-the-art
long-term
cross-validation
```

Use linguistic context to distinguish line-break hyphenation from real hyphens.

---

# 17. Statistical Notation

Preserve exact statistical notation.

Examples:

```text
p = .032
p < .001
t(48) = 2.31
F(2, 87) = 5.42
χ²(1) = 6.82
r = .41
d = 0.52
95% CI [0.18, 0.86]
R² = .34
```

Do not convert statistics into prose.

---

# 18. Abbreviations

Preserve the original abbreviation.

If the paper defines:

```text
functional magnetic resonance imaging (fMRI)
```

retain:

```text
functional magnetic resonance imaging (fMRI)
```

Later references can remain:

```text
fMRI
```

Do not introduce new abbreviations during conversion.

---

# 19. Scientific Units

Preserve units exactly.

Examples:

```text
20 ms
3 mm
2.5 T
100 Hz
5 μV
```

Do not silently convert units.

---

# 20. Cross-References

Preserve references such as:

```text
see Figure 2
Table 3
Section 4.1
Appendix A
Supplementary Figure S2
```

Where possible, convert them into Markdown links.

Do not create links that point to nonexistent sections.

---

# 21. Extraction Notes

When information cannot be confidently recovered, explicitly mark it.

Example:

```markdown
> [Extraction note: text partially obscured by the PDF layout.]
```

or:

```markdown
> [Extraction note: Equation 3 could not be reconstructed reliably.]
```

Never silently guess.

---

# 22. Preserve Uncertainty

Use confidence levels internally during conversion:

```text
High confidence
Medium confidence
Low confidence
```

Low-confidence content should be manually checked against the PDF.

High-risk areas include:

- Equations
- Tables
- Statistical values
- Figure captions
- Superscripts
- Subscripts
- Greek letters
- OCR text

---

# 23. Quality Control

After conversion, verify:

```text
Title
Authors
Abstract
Section order
Paragraph order
Equations
Tables
Figures
Captions
Citations
References
Statistics
Units
Special characters
```

Compare the Markdown against the original PDF.

---

# 24. Scientific Fidelity Check

Ask:

```text
Did any number change?
Did any sign change?
Did any statistical value change?
Did any equation change?
Did any citation disappear?
Did any paragraph move?
Did any table cell change?
Did any figure caption disappear?
```

A single symbol can change scientific meaning.

---

# 25. Common Failure Modes

### Failure: treating PDF extraction as plain text extraction

Why it fails:

```text
Layout ≠ reading order
```

### Failure: losing equations

Why it fails:

```text
Scientific meaning may depend on mathematical notation.
```

### Failure: flattening tables

Why it fails:

```text
Rows and columns encode relationships.
```

### Failure: removing captions

Why it fails:

```text
Captions often contain experimental details.
```

### Failure: trusting OCR

Why it fails:

```text
OCR errors can alter scientific values.
```

### Failure: inventing missing information

Why it fails:

```text
Conversion must preserve evidence, not manufacture it.
```

---

# 26. Recommended Output Structure

```markdown
---
title: '...'
authors:
  - ...
year: ...
doi: '...'
---

# Abstract

...

# Introduction

...

# Methods

## Participants

...

## Procedure

...

## Analysis

...

# Results

...

## Figure 1

_Caption._

## Table 1

| ... |

# Discussion

...

# Conclusion

...

# References

1. ...
2. ...
```

Adapt the structure to the actual paper.

---

# 27. Final Validation

Before considering the conversion complete:

```text
[ ] Source PDF identified
[ ] Reading order verified
[ ] Metadata checked
[ ] Section hierarchy reconstructed
[ ] Headers/footers handled
[ ] Equations checked
[ ] Tables checked
[ ] Figures/captions preserved
[ ] Citations preserved
[ ] References preserved
[ ] Statistical values checked
[ ] Units checked
[ ] OCR errors checked
[ ] Hyphenation checked
[ ] Special characters checked
[ ] Extraction uncertainties flagged
[ ] Markdown rendered successfully
```

---

# Final Principle

> **PDF-to-Markdown conversion is a document reconstruction task, not a copy-and-paste task. Preserve the paper's scientific structure, numerical precision, mathematical notation, evidence, and uncertainty—and explicitly flag anything that cannot be recovered reliably.**
