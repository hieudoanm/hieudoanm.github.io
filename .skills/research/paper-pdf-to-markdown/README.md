# Paper PDF to Markdown

## Purpose

`paper-pdf-to-markdown` converts scientific papers from PDF into structured Markdown while preserving their scientific content.

It is designed for papers containing:

- Multiple columns
- Mathematical equations
- Statistical notation
- Tables
- Figures
- Figure captions
- References
- Footnotes
- OCR text
- Scientific symbols
- Complex formatting

The goal is **faithful reconstruction**, not merely extracting readable text.

---

## When to Use

Use this skill when you need to:

- Convert a research paper into Markdown
- Build a searchable paper library
- Prepare papers for an AI research workflow
- Create structured research notes
- Extract papers for downstream analysis
- Preserve equations and tables in a text-based format
- Make scientific PDFs easier for agents to process

---

## When Not to Use

Do not use this skill when:

- You only need a short summary
- You only need the abstract
- The user wants a literature review
- The user wants interpretation rather than conversion
- The PDF is primarily a graphical poster
- Exact visual reproduction is the primary requirement

For exact visual reproduction, retain the original PDF.

---

# Core Workflow

```text
PDF
 ↓
Identify source
 ↓
Inspect structure
 ↓
Determine reading order
 ↓
Extract content
 ↓
Reconstruct hierarchy
 ↓
Recover equations
 ↓
Recover tables
 ↓
Preserve figures/captions
 ↓
Preserve citations/references
 ↓
Quality control
 ↓
Markdown
```

---

# PDF Is Not Plain Text

A PDF stores visual positioning.

For example:

```text
Column A       Column B
---------      ---------
Paragraph      Paragraph
Paragraph      Paragraph
```

A naive extractor might produce:

```text
Paragraph Paragraph Paragraph Paragraph
```

A correct conversion reconstructs:

```text
Column A paragraph...

Column B paragraph...
```

This distinction is critical for scientific papers.

---

# Reproduction versus Interpretation

The conversion should reproduce the source.

It should not:

- Summarise
- Paraphrase
- Correct scientific claims
- Improve writing
- Reinterpret results
- Add explanations

For example:

Original:

```text
The effect was significant, t(38) = 2.71, p = .010.
```

Correct:

```text
The effect was significant, $t(38) = 2.71$, $p = .010$.
```

Not:

```text
The researchers found a strong effect.
```

---

# Document Hierarchy

Prefer:

```text
# Major Section
## Subsection
### Sub-subsection
```

Do not create arbitrary hierarchy.

If the source clearly contains:

```text
3. Methods
3.1 Participants
3.2 Procedure
```

preserve the relationship.

---

# Equations

Use LaTeX:

```markdown
$$
y = X\beta + \epsilon
$$
```

rather than plain-text approximations whenever possible.

Pay particular attention to:

- Fractions
- Exponents
- Subscripts
- Greek symbols
- Matrix notation
- Statistical distributions
- Derivatives
- Summations

---

# Tables

Preserve the relationship between:

```text
Rows
Columns
Headers
Units
Footnotes
```

A table is not merely a sequence of numbers.

---

# Figures

When the figure itself is available, preserve the image.

When it is unavailable, preserve at minimum:

```markdown
### Figure 2

_Original caption..._
```

Never invent visual information.

---

# References

References are part of the paper's scientific record.

Preserve:

- Authors
- Year
- Title
- Journal
- Volume
- Issue
- Pages
- DOI when present

Do not invent missing bibliographic information.

---

# OCR

OCR should be treated as a potentially noisy source.

High-risk characters include:

```text
0 / O
1 / l / I
− / -
μ / u
α / a
β / B
rn / m
```

Statistical values require manual verification.

---

# Quality Levels

### High confidence

Text and structure are clearly recoverable.

### Medium confidence

Content is recoverable but some formatting or structure is uncertain.

### Low confidence

OCR, equations, tables, or layout makes reliable reconstruction uncertain.

Low-confidence content should be explicitly flagged.

---

# Validation

A successful conversion should be checked against:

```text
Original PDF
    ↓
Markdown
```

not merely:

```text
Markdown
    ↓
Looks readable
```

A readable document can still contain serious scientific errors.

---

# Relationship to Other Skills

| Skill                   | Main purpose                               |
| ----------------------- | ------------------------------------------ |
| `paper-pdf-to-markdown` | Convert paper PDF into structured Markdown |
| `paper-reading`         | Understand and critically read a paper     |
| `literature-review`     | Synthesise evidence across papers          |
| `research-gap`          | Identify unresolved research problems      |
| `research-replication`  | Test an existing scientific finding        |
| `meta-analysis`         | Quantitatively synthesise multiple studies |

A typical workflow is:

```text
PDF
 ↓
paper-pdf-to-markdown
 ↓
paper-reading
 ↓
literature-review
 ↓
research-gap
 ↓
research-question
```

---

# Quality Checklist

```text
[ ] Correct PDF/version
[ ] Correct reading order
[ ] Correct section hierarchy
[ ] Correct equations
[ ] Correct statistics
[ ] Correct tables
[ ] Correct figure captions
[ ] Correct citations
[ ] Correct references
[ ] Correct units
[ ] Correct special characters
[ ] OCR errors reviewed
[ ] Extraction uncertainties documented
```

---

# Useful Questions

Before finishing, ask:

1. Did I preserve every scientific section?
2. Did I preserve every equation?
3. Did any number change?
4. Did any sign change?
5. Did any statistical value change?
6. Did any table relationship change?
7. Did any citation disappear?
8. Did the reading order remain correct?
9. Did I accidentally paraphrase?
10. Did I invent anything that was not recoverable?

---

# Final Principle

> **The best PDF-to-Markdown conversion is the one that allows a researcher or AI system to recover the paper's scientific argument without needing to guess what the original PDF contained.**
