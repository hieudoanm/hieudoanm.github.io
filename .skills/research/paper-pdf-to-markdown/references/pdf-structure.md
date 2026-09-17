# PDF Structure

## Purpose

Understand how scientific content is represented in PDF documents and how that structure should be reconstructed in Markdown.

---

## Figures in Multi-Column Layouts
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

## Tables
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

## Table Footnotes
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

## Superscripts and Subscripts
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

## Chemical and Biological Notation
Be careful with:

```text
CO₂
H₂O
Ca²⁺
Na⁺
```

A missing superscript or subscript can change meaning.

---

## Cross-References
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

## Reading Order Validation
After reconstruction, read the Markdown continuously.

Ask:

```text
Does the argument make sense?
```

If sentences appear to jump between unrelated topics, inspect the original page layout.

This is one of the fastest ways to detect column-order errors.

---

## Structure Reconstruction Principle
Do not ask:

> What text did the PDF extractor return?

Ask:

> What document structure does the PDF visually represent?

Then reconstruct that structure in Markdown.

---

## Final Principle
> **A PDF contains visual structure that must be interpreted before it can become semantic Markdown structure.**
