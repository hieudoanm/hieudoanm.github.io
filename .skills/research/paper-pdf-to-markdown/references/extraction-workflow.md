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

# 1. Identify the Source

Before extraction, record:

```text
Title
Authors
Year
Journal / conference
DOI
PDF version
Source
```

Prefer the authoritative publisher or author version when available.

Do not silently substitute:

```text
Preprint
Accepted manuscript
Publisher PDF
Conference version
```

for one another.

If the version matters, record it.

---

# 2. Inspect the PDF

Before extracting the complete document, inspect representative pages:

```text
First page
Normal body page
Two-column page
Equation page
Table page
Figure page
References page
```

This reveals:

- Document structure
- Column layout
- Headers and footers
- Equation formatting
- Table complexity
- Figure placement
- OCR quality
- Reference formatting

---

# 3. Determine the PDF Type

## Text-Based PDF

Text can usually be extracted directly.

Still check:

```text
Reading order
Special characters
Equations
Tables
Columns
```

---

## Scanned PDF

The PDF primarily contains page images.

Workflow:

```text
PDF
 ↓
OCR
 ↓
Text
 ↓
Structure reconstruction
 ↓
Quality control
```

OCR should never be assumed to be perfect.

---

## Hybrid PDF

Some pages may contain:

```text
Selectable text
```

while others contain:

```text
Images
Scanned pages
Embedded figures
```

Use the appropriate extraction method for each section.

---

# 4. Establish Reading Order

Determine whether the paper uses:

```text
Single column
Two columns
Three columns
Sidebars
Footnotes
Appendices
```

For a two-column paper:

```text
Column 1
 ↓
Column 2
```

should normally become the reading order.

Avoid extraction such as:

```text
Line 1 column 1
Line 1 column 2
Line 2 column 1
Line 2 column 2
```

because this can destroy the scientific argument.

---

# 5. Separate Content from Layout

Extract semantic content:

```text
Heading
Paragraph
List
Equation
Table
Figure
Caption
Footnote
Reference
```

from purely visual elements:

```text
Page number
Running header
Decorative line
Publisher watermark
```

Do not remove something merely because it is visually small.

---

# 6. Extract Text

Extract the complete textual content before rewriting it into Markdown.

Preserve:

```text
Paragraphs
Sentences
Numbers
Symbols
Abbreviations
Citations
```

Do not summarise during extraction.

The extraction phase should be as close to:

```text
source → representation
```

as possible.

---

# 7. Reconstruct Paragraphs

PDF extraction may split a paragraph:

```text
The experiment was
conducted with
thirty participants.
```

Reconstruct it as:

```text
The experiment was conducted with thirty participants.
```

Do not remove legitimate paragraph boundaries.

---

# 8. Handle Line-Break Hyphenation

A PDF may contain:

```text
neuro-
science
```

because the word was split at the end of a line.

Usually reconstruct:

```text
neuroscience
```

But preserve genuine compounds:

```text
state-of-the-art
long-term
cross-validation
```

Use linguistic context.

---

# 9. Reconstruct Headings

Convert visual hierarchy into Markdown:

```markdown
# Methods

## Participants

## Procedure

### Stimuli
```

Use the original hierarchy whenever it is recoverable.

Do not invent additional sections simply to make the document more readable.

---

# 10. Extract Equations

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

# 11. Extract Tables

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

# 12. Extract Figures

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

# 13. Preserve Figure Captions

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

# 14. Preserve Citations

Keep the original citation system.

Author-year:

```markdown
(Smith et al., 2024)
```

Numeric:

```markdown
[12, 13]
```

Do not renumber citations unless the conversion explicitly requires it.

---

# 15. Extract References

Create:

```markdown
# References
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

# 16. Preserve Footnotes

Footnotes may contain:

- Methodological details
- Definitions
- Statistical qualifications
- Funding information
- Additional references

Do not automatically discard them.

---

# 17. Preserve Appendices

If the PDF contains:

```text
Appendix A
Appendix B
Supplementary Methods
Supplementary Results
```

preserve the hierarchy.

---

# 18. Handle OCR

OCR should be treated as uncertain until validated.

Common errors:

```text
0 ↔ O
1 ↔ l ↔ I
rn ↔ m
− ↔ -
μ ↔ u
α ↔ a
β ↔ B
```

High-risk areas:

```text
Equations
Statistics
Tables
Units
Scientific names
References
```

---

# 19. Validate High-Risk Content

Prioritise:

```text
Equations
Numbers
Statistics
Tables
Figure captions
Sample sizes
Units
References
```

A typo in ordinary prose may be harmless.

A typo in:

```text
p = .001
```

may materially change interpretation.

---

# 20. Render the Markdown

After conversion, render the Markdown.

Check:

```text
Headings
Tables
Equations
Images
Lists
Links
Special characters
```

A Markdown file can be syntactically valid while still containing extraction errors.

---

# 21. Compare Against the PDF

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

# 22. Flag Uncertainty

If content cannot be recovered reliably:

```markdown
> [Extraction note: Equation 4 could not be reconstructed reliably from the PDF.]
```

Never silently invent missing information.

---

# 23. Recommended Pipeline

```text
SOURCE PDF
    ↓
IDENTIFY VERSION
    ↓
INSPECT LAYOUT
    ↓
DETERMINE PDF TYPE
    ↓
EXTRACT CONTENT
    ↓
RECONSTRUCT READING ORDER
    ↓
RECONSTRUCT DOCUMENT HIERARCHY
    ↓
FORMAT SCIENTIFIC ELEMENTS
    ↓
QUALITY CONTROL
    ↓
RENDER
    ↓
SOURCE COMPARISON
    ↓
FINAL MARKDOWN
```

---

# Final Principle

> **Extract first, reconstruct second, validate third. Never let formatting convenience override scientific fidelity.**
