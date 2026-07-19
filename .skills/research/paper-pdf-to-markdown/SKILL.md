---
name: "paper-pdf-to-markdown"
description: "Convert scientific papers from PDF into structured, faithful Markdown by extracting document structure, preserving equations, tables, figures, citations, references, and formatting, while detecting and correcting common PDF extraction and OCR errors."
tags:
  - "research"
  - "paper"
  - "pdf"
  - "markdown"
when_to_use: "Use to convert a scholarly PDF into reviewable Markdown while preserving section hierarchy, equations, tables, figure references, citations, and source provenance."
prerequisites:
  - "The source PDF and permission to process it."
  - "A target Markdown format and a way to inspect rendered pages for layout-sensitive content."
  - "OCR or extraction tooling when the PDF is scanned or has a non-text layer."
related_skills:
  - "../research-poster/SKILL.md"
  - "../paper-reading/SKILL.md"
  - "../research-replication/SKILL.md"
avoid_when:
  - "When a publisher's structured HTML or XML is available and better preserves semantics; prefer that source and retain the PDF for verification."
  - "When the task is to summarize or critique the paper rather than transcribe it; use paper-reading."
  - "When tables, equations, or figures cannot be verified against the rendered PDF; preserve them as explicitly marked review items instead of guessing."
status: "active"
---

# Paper PDF to Markdown

## Purpose

Convert a scientific paper into Markdown that preserves its argument, document structure, and scientific details. Treat conversion as reconstruction, not a text dump: extraction order, layout, equations, tables, figures, and OCR can all alter meaning.

## Workflow

1. **Identify the source.** Record the paper title, authors, publication venue and year, version, and DOI when available. If a DOI is absent, record that it was not provided; do not infer one or silently substitute another version.
2. **Inspect the PDF.** Determine whether it is text-based, scanned, or hybrid. Sample pages with multiple columns, equations, tables, figures, footnotes, and references before choosing an extraction method.
3. **Extract in reading order.** Check that columns, paragraphs, captions, footnotes, and references are not interleaved. Remove only repetitive layout artifacts such as running headers and page numbers; retain scientifically meaningful labels and notes.
4. **Rebuild the hierarchy.** Represent the paper's actual section and subsection structure with Markdown headings. Do not invent missing headings or force every paper into IMRaD if it uses another structure.
5. **Preserve scientific content.** Retain equations and notation, table values and units, figure numbers and captions, in-text citations, reference numbering, and qualifiers such as uncertainty or direction. Link a figure only when the image is available; otherwise retain its caption and state that the image was unavailable.
6. **Validate against the PDF.** Compare the Markdown with the source, especially numbers, signs, decimals, confidence intervals, superscripts, subscripts, Greek letters, units, and cross-references. Flag unreadable or ambiguous content instead of guessing.

## Reconstruction decisions

### Reading order and layout

PDF text may follow visual coordinates rather than logical reading order. For a two-column page, reconstruct one column at a time before joining columns. Check page transitions for split paragraphs, repeated headers, and words broken by line-end hyphenation. Join a hyphenated word only when the source makes the intended word clear; preserve meaningful compounds and minus signs.

### Equations, tables, and figures

- Preserve equation numbering and enough surrounding context to identify each equation. If notation cannot be recovered, keep the readable parts and add an extraction note.
- Use Markdown tables when the row and column relationships remain clear. For complex tables, preserve a structured representation and note any cells or footnotes that could not be recovered reliably; never flatten values in a way that loses their association.
- Keep figure and table numbering, captions, panel labels, units, and statistical details. Do not fabricate image files, values, or descriptions.

### Citations and references

Keep citation keys or numeric citation labels consistent with the source reference list. Do not renumber citations merely to make the output appear sequential. Preserve available bibliographic details and mark missing source information explicitly rather than filling it from guesswork.

## Extraction notes

Use a brief, visible note only where the original cannot be read or reconstructed confidently, for example:

> [Extraction note: the value in this table cell is obscured in the source PDF.]

Keep uncertain source text distinguishable from editorial explanation. Recheck low-confidence OCR around numbers, negation, symbols, and names because small recognition errors can reverse a scientific claim.

## Output structure

Mirror the source paper's actual hierarchy. A typical paper might use the following outline, but omit sections not present in the source and retain alternative headings when appropriate:

```markdown
# Paper title

## Abstract

## Introduction

## Methods

## Results

## Discussion

## References
```

## Final validation

Before delivery, confirm that:

- The source and version are identified, and unavailable metadata is not guessed.
- The section order and reading order match the PDF.
- Headers and page numbers were removed only when they were layout noise.
- Equations, tables, figures, captions, citations, and references remain associated with the right content.
- Numerical values, signs, units, and statistical notation were checked against the PDF.
- Unrecoverable content is flagged, not silently completed.
- Markdown renders without broken tables, links, or code fences.

## Further detail

- [Extraction workflow](references/extraction-workflow.md)
- [PDF structure](references/pdf-structure.md)
- [Quality control](references/quality-control.md)
- [Scientific formatting](references/scientific-formatting.md)
