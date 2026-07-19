# PDF Extraction Workflow

## Purpose

Define a reliable workflow for converting scientific PDFs into structured Markdown.

The objective is:

```text
PDF
 ↓
Inspect
 ↓
Extract
 ↓
Reconstruct
 ↓
Validate
 ↓
Markdown
```

The workflow prioritises scientific fidelity over superficial formatting.

---

## Extract Equations
Identify:

```text
Inline equations
Display equations
Numbered equations
Matrices
Statistical expressions
```

Convert them to LaTeX where possible.

Example:

```markdown
$$
y = X\beta + \epsilon
$$
```

Equation reconstruction should be validated separately because a single symbol can change scientific meaning.

---

## Extract Tables
Identify:

```text
Table number
Title
Column headers
Rows
Values
Units
Footnotes
Statistical markers
```

Then reconstruct as Markdown where practical.

Example:

```markdown
| Group     |   N | Mean |  SD |
| --------- | --: | ---: | --: |
| Control   |  30 | 82.4 | 9.1 |
| Treatment |  32 | 87.2 | 8.7 |
```

---

## Extract Figures
Identify:

```text
Figure number
Figure image
Caption
Panel labels
Annotations
Referenced variables
```

If the image can be preserved:

```markdown
![Figure 1: Original caption](figure-1.png)
```

If the image cannot be preserved, retain the caption.

---

## Preserve Figure Captions
Captions often contain important scientific information.

They may specify:

```text
Experimental conditions
Sample sizes
Statistical thresholds
Brain regions
Time windows
Model parameters
Error bars
```

Therefore:

> A figure caption is scientific content, not decoration.

---

## Extract References
Create:

```markdown
### References
```

and preserve the reference list.

Do not invent:

```text
DOI
Authors
Pages
Year
Journal
```

If information is missing, indicate that rather than guessing.

---

## Compare Against the PDF
Perform a final source comparison.

Ask:

```text
Is the section order correct?
Are paragraphs in the correct order?
Are equations correct?
Are tables correct?
Are captions present?
Are citations preserved?
Are statistics unchanged?
```

---

## Flag Uncertainty
If content cannot be recovered reliably:

```markdown
> [Extraction note: Equation 4 could not be reconstructed reliably from the PDF.]
```

Never silently invent missing information.

---

## Final Principle
> **Extract first, reconstruct second, validate third. Never let formatting convenience override scientific fidelity.**
