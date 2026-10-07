# PDF Structure

## Purpose

Understand how scientific content is represented in PDF documents and how that structure should be reconstructed in Markdown.

---

# 1. PDF Is a Visual Format

A PDF primarily describes:

```text
Where something appears
How it looks
What font it uses
What size it is
```

It does not necessarily explicitly encode:

```text
This is a heading
This is paragraph 4
This is a table
This is a figure caption
```

Therefore:

```text
PDF layout
    ≠
Document semantics
```

---

# 2. Text Coordinates

A PDF may store text fragments using coordinates:

```text
x
y
font
size
text
```

An extraction system must reconstruct:

```text
Reading order
```

from those fragments.

---

# 3. Single-Column Papers

Typical structure:

```text
Heading
Paragraph
Paragraph

Heading
Paragraph
Paragraph
```

These are usually easier to reconstruct.

Still check:

```text
Headers
Footers
Footnotes
Figures
Tables
```

---

# 4. Two-Column Papers

Common scientific-paper layout:

```text
┌───────────────┬───────────────┐
│ Column 1      │ Column 2      │
│               │               │
│ Text          │ Text          │
│ Text          │ Text          │
└───────────────┴───────────────┘
```

Correct reading order is generally:

```text
Column 1
    ↓
Column 2
```

not:

```text
Line 1 col 1
Line 1 col 2
Line 2 col 1
Line 2 col 2
```

---

# 5. Figures in Multi-Column Layouts

A figure may:

- Span one column
- Span two columns
- Appear between paragraphs
- Float to the top of a page
- Float to the bottom of a page

Its physical location does not necessarily determine its logical location.

Preserve:

```text
Figure number
Caption
Textual references
```

---

# 6. Tables

Tables encode relationships through:

```text
Rows
Columns
Headers
Grouping
Indentation
Footnotes
```

Naive text extraction may produce:

```text
Control Treatment 30 32 82.4 87.2
```

which loses structure.

Reconstruct:

```markdown
| Group     |   N | Mean |
| --------- | --: | ---: |
| Control   |  30 | 82.4 |
| Treatment |  32 | 87.2 |
```

---

# 7. Table Footnotes

Preserve table footnotes.

For example:

```markdown
_Note. Values are means; SD = standard deviation._
```

Footnotes may define:

```text
Abbreviations
Statistical significance
Units
Analysis subsets
```

---

# 8. Headings

Heading detection can use:

```text
Font size
Font weight
Numbering
Whitespace
Position
Repeated formatting
```

Example:

```text
3 Results
3.1 Behavioural results
3.2 Neuroimaging results
```

becomes:

```markdown
# Results

## Behavioural Results

## Neuroimaging Results
```

---

# 9. Numbered Sections

Preserve section relationships.

For example:

```text
2 Methods
2.1 Participants
2.2 Procedure
2.2.1 Stimuli
```

becomes:

```markdown
# Methods

## Participants

## Procedure

### Stimuli
```

The numbering itself can be retained if useful.

---

# 10. Headers and Footers

Repeated elements such as:

```text
Journal of Neuroscience
Smith et al.
Page 4
```

are often layout elements.

Usually remove them from the body.

Do not remove content if it contains unique scientific information.

---

# 11. Page Numbers

Page numbers generally do not belong in the Markdown body.

For example:

```text
12
```

at the bottom of every page should normally be removed.

---

# 12. Footnotes

Footnotes differ from page numbers because they may contain scientific information.

Preserve:

```text
Methodological notes
Definitions
Additional results
References
Funding notes
```

---

# 13. Lists

PDF extraction can flatten lists.

Original:

```text
1. Recruit participants.
2. Collect data.
3. Analyse results.
```

should become:

```markdown
1. Recruit participants.
2. Collect data.
3. Analyse results.
```

---

# 14. Mathematical Layout

Mathematical expressions often rely heavily on visual positioning.

For example:

```text
       x²
y =  ─────
        2
```

should become:

```markdown
$$
y = \frac{x^2}{2}
$$
```

not:

```text
y = x2 / 2
```

---

# 15. Superscripts and Subscripts

Preserve:

```text
x²
H₂O
β₁
R²
```

as appropriate Markdown/LaTeX:

```markdown
$x^2$
$H_2O$
$\beta_1$
$R^2$
```

---

# 16. Ligatures

PDFs may use typographic ligatures:

```text
ﬁ
ﬂ
```

These may extract incorrectly.

Convert them to ordinary text where appropriate:

```text
fi
fl
```

but verify scientific names and identifiers.

---

# 17. Unicode

Scientific papers contain many Unicode symbols:

```text
μ
α
β
γ
±
≤
≥
−
×
°
```

Preserve their meaning.

---

# 18. Chemical and Biological Notation

Be careful with:

```text
CO₂
H₂O
Ca²⁺
Na⁺
```

A missing superscript or subscript can change meaning.

---

# 19. Cross-References

Preserve:

```text
Figure 2
Table 3
Section 4.1
Appendix A
Supplementary Figure S2
```

Where possible, turn them into internal Markdown links.

Only create links to sections that actually exist.

---

# 20. Reading Order Validation

After reconstruction, read the Markdown continuously.

Ask:

```text
Does the argument make sense?
```

If sentences appear to jump between unrelated topics, inspect the original page layout.

This is one of the fastest ways to detect column-order errors.

---

# 21. Structure Reconstruction Principle

Do not ask:

> What text did the PDF extractor return?

Ask:

> What document structure does the PDF visually represent?

Then reconstruct that structure in Markdown.

---

# Final Principle

> **A PDF contains visual structure that must be interpreted before it can become semantic Markdown structure.**
