---
name: "research-poster"
description: "Create self-contained HTML research posters that communicate research questions, methods, results, and conclusions quickly while preserving scientific accuracy."
tags:
  - "research"
  - "poster"
when_to_use: "Use to turn a completed study or evidence synthesis into a self-contained scientific poster for a defined canvas, browser capture, or PDF export."
prerequisites:
  - "Verified study question, methods, results, limitations, and references, or explicit placeholders for information not yet available."
  - "Poster dimensions, audience, and export requirements."
related_skills:
  - "../research-writing/SKILL.md"
  - "../paper-pdf-to-markdown/SKILL.md"
  - "../research-replication/SKILL.md"
avoid_when:
  - "When the underlying study results are not yet verified; create a clearly labeled draft or placeholder poster rather than presenting invented findings."
  - "When the requested output is a manuscript, slide deck, or interactive dashboard rather than a poster."
status: "active"
---

# Research Poster Skill

## Purpose
Create scientific research posters as polished, self-contained HTML documents that can be opened in a browser and captured as a screenshot or exported to PDF.

The poster should communicate a research project quickly and visually while preserving scientific accuracy.

The primary output is:

```text
poster.html
```

The HTML file should contain the poster content, styling, layout, and visual structure required to render the poster without requiring a separate application.

---

## Core Principle
A research poster is not a research paper placed on a large page.

It is a **visual communication artifact**.

The design should help the viewer understand:

```text
Research problem
      ↓
Research question
      ↓
Method
      ↓
Key findings
      ↓
Interpretation
      ↓
Takeaway
```

A good poster should communicate the main idea within a few seconds and provide enough detail for closer inspection.

---

## Screenshot Requirement
The poster must be suitable for taking a screenshot of the complete poster.

Therefore:

- The entire poster should fit within one defined canvas.
- Avoid content that extends outside the poster.
- Avoid layouts that require scrolling.
- Avoid hover-dependent information.
- Avoid animations that could capture an inconsistent state.
- Avoid dynamically changing content unless explicitly requested.
- Keep important information visible without interaction.
- Mark every illustrative or synthetic example prominently; do not let sample values read as actual study findings.

The final HTML should render deterministically.

---

## Research Question
Make the central research question visually identifiable.

For example:

> **Research question:** How does speech complexity change with age in typically developing children?

The question should be understandable without reading the entire poster.

---

## Results
Results should receive substantial visual emphasis.

Prioritise:

1. Main finding
2. Primary figure
3. Important quantitative result
4. Secondary findings

A viewer should be able to identify the main result without reading every paragraph.

Use:

- Large figures
- Clear axis labels
- Short captions
- Highlighted statistics
- Callout numbers
- Effect sizes
- Confidence intervals

Avoid decorative figures that do not communicate scientific information.

---

## Tables
Use tables when exact values are more useful than visual patterns.

Keep tables compact.

Prefer:

```text
Measure          Estimate       95% CI
Age → complexity  0.42          [0.31, 0.53]
```

over reproducing a large statistical output table.

---

## Claim Strength
The visual emphasis of a claim must not exceed the strength of the evidence.

A large headline such as:

> **AGE DRIVES LANGUAGE DEVELOPMENT**

is inappropriate for a simple cross-sectional correlation.

Prefer:

> **Speech complexity increases across age groups**

when this accurately describes the observed result.

The same principle applies to figures, callouts, captions, and conclusions.

---

## Images and Figures
When figures are supplied by the user, preserve their scientific content.

When figures are generated programmatically, prefer:

- SVG
- Embedded images
- High-resolution raster images

For simple diagrams, inline SVG can be useful because it remains sharp at poster resolution.

Do not invent scientific data or figure values.

If a figure is unavailable, create a clearly labelled placeholder rather than fabricating a result.

---

## Further detail

- [Html Rendering](references/html-rendering.md)
- [Poster Structure](references/poster-structure.md)
- [Scientific Communication](references/scientific-communication.md)
- [Visual Design](references/visual-design.md)
