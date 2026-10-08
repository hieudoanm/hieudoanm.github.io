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

## Primary Output Requirements

Generate a complete HTML document.

The output should normally contain:

- `<!DOCTYPE html>`
- `<html>`
- `<head>`
- `<body>`
- Embedded CSS
- Poster content
- Figures or figure placeholders
- Tables where useful
- References where necessary
- A clear visual hierarchy

Prefer a **single self-contained HTML file**.

Avoid requiring:

- Build tools
- JavaScript frameworks
- CSS frameworks
- External JavaScript libraries
- External fonts
- External assets

unless the user explicitly requests them.

---

## Poster Rendering Requirements

The HTML should be designed as a physical poster rather than a normal webpage.

Define a fixed poster canvas using CSS.

For example:

```text
A0 landscape
1189 mm × 841 mm
```

The exact dimensions may be changed when the user specifies another poster format.

The poster should have:

- Fixed dimensions
- Consistent margins
- Clearly defined columns
- Consistent spacing
- Large readable typography
- High visual contrast
- Print-safe colours
- Predictable rendering

The poster should not depend on scrolling to communicate its structure.

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

The final HTML should render deterministically.

---

## Scientific Content Structure

Use the following structure by default:

```text
TITLE
Authors / Affiliations

BACKGROUND
Research question / hypothesis

METHODS
Participants / Dataset
Experimental design
Analysis

RESULTS
Primary finding
Figures
Statistics

DISCUSSION
Interpretation
Limitations
Implications

CONCLUSION
Main takeaway

REFERENCES
Selected references

CONTACT / QR CODE
Optional
```

Not every poster needs every section.

Prioritise the research question and main findings over completeness.

---

## Information Hierarchy

The poster should have three levels of information.

### Level 1 — Immediate

The viewer should understand:

- What is this research about?
- What was the main question?
- What was the main finding?

This information should be visually dominant.

### Level 2 — Main evidence

The viewer should be able to understand:

- How the study was conducted
- What was measured
- What the main results were
- What the findings mean

### Level 3 — Supporting detail

This may include:

- Statistical details
- Secondary findings
- Limitations
- References
- Technical implementation details

Supporting detail should not compete visually with the main finding.

---

## Title

The title should communicate the research topic clearly.

Prefer:

> Age-related Changes in Children's Speech Complexity

over:

> An Investigation Into the Relationship Between Age and Speech Complexity in a Sample of Typically Developing Children

The title should be:

- Specific
- Concise
- Scientifically accurate
- Visually prominent

Avoid unnecessary jargon.

---

## Research Question

Make the central research question visually identifiable.

For example:

> **Research question:** How does speech complexity change with age in typically developing children?

The question should be understandable without reading the entire poster.

---

## Methods

Methods should be compressed into the information needed to understand the evidence.

Prefer visual representations where appropriate:

- Participant icons
- Experimental timelines
- Pipeline diagrams
- Data-processing flows
- Brain diagrams
- Model diagrams

For example:

```text
Raw data
   ↓
Quality control
   ↓
Preprocessing
   ↓
Feature extraction
   ↓
Statistical analysis
   ↓
Results
```

Avoid reproducing a full paper-style Methods section.

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

## Figures

Every figure should have a clear purpose.

A figure should answer at least one question such as:

- What changed?
- What differed?
- What relationship was observed?
- What pattern was found?
- How did the model perform?

Figures should include:

- Descriptive title or caption
- Axis labels where applicable
- Units
- Legible text
- Appropriate scale
- Clear legend where necessary

Do not distort scientific figures merely to make them visually attractive.

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

## Scientific Accuracy

The poster must preserve the distinction between:

- Observation
- Association
- Prediction
- Interpretation
- Causal explanation

Do not convert a correlational finding into a causal statement simply because the poster needs a strong headline.

For example:

Bad:

> Age causes children to develop more complex speech.

Better:

> Speech complexity was positively associated with age.

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

## Visual Design

Use visual hierarchy rather than decoration.

The design should communicate:

```text
Title
  ↓
Research question
  ↓
Methods
  ↓
Main result
  ↓
Interpretation
```

Use:

- Large headings
- Consistent spacing
- Clear cards or sections
- Limited colour palette
- Strong alignment
- Consistent typography
- Adequate whitespace

Avoid:

- Excessive gradients
- Excessive shadows
- Decorative illustrations without purpose
- Too many colours
- Tiny text
- Dense paragraphs
- Inconsistent spacing
- Unnecessary animations

---

## Layout

Use CSS Grid for the main poster layout.

A typical structure is:

```text
┌─────────────────────────────────────────────┐
│                  TITLE                      │
├──────────────┬──────────────┬───────────────┤
│ BACKGROUND   │ METHODS      │ RESULTS       │
│              │              │               │
│ QUESTION     │ DESIGN       │ MAIN FIGURE   │
│              │ PIPELINE     │               │
├──────────────┼──────────────┤               │
│ DATA         │ ANALYSIS     │ KEY FINDING   │
│              │              │               │
├──────────────┴──────────────┼───────────────┤
│ DISCUSSION / LIMITATIONS    │ CONCLUSION    │
├─────────────────────────────┴───────────────┤
│ REFERENCES / CONTACT / QR                   │
└─────────────────────────────────────────────┘
```

The exact layout should adapt to the content.

Do not force every poster into identical columns.

---

## Typography

Use a small, consistent type system.

For example:

```text
Title       → 64–96 px
Section     → 32–48 px
Subheading  → 24–32 px
Body        → 18–24 px
Caption     → 14–18 px
```

These values are starting points rather than strict requirements.

Poster text must remain readable at the intended physical size.

Avoid very small body text simply to fit more information.

---

## Colour

Use colour to communicate structure or highlight important information.

A simple palette is usually sufficient:

```text
Background
Surface
Primary
Secondary
Accent
Text
Muted text
```

Maintain sufficient contrast.

Do not encode important information using colour alone.

For example, if two experimental groups are distinguished by colour, also use:

- Labels
- Patterns
- Symbols
- Direct annotations

where appropriate.

---

## Accessibility

The poster should remain understandable to viewers with common visual limitations.

Consider:

- Sufficient contrast
- Readable font sizes
- Clear labels
- Non-colour-dependent encoding
- Avoidance of excessively thin text
- Meaningful figure captions

Do not rely solely on colour to communicate scientific differences.

---

## HTML Architecture

Prefer semantic HTML.

Use elements such as:

- `<main>`
- `<header>`
- `<section>`
- `<figure>`
- `<figcaption>`
- `<table>`
- `<footer>`

Example structure:

```text
<body>
  <main class="poster">
    <header class="poster-header">
      ...
    </header>

    <section class="section background">
      ...
    </section>

    <section class="section methods">
      ...
    </section>

    <section class="section results">
      ...
    </section>

    <section class="section discussion">
      ...
    </section>

    <section class="section conclusion">
      ...
    </section>

    <footer>
      ...
    </footer>
  </main>
</body>
```

---

## CSS Architecture

Keep the CSS organised around reusable concepts.

Prefer CSS custom properties:

```text
:root {
  --poster-width: 1189mm;
  --poster-height: 841mm;
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
}
```

Use reusable classes for:

- Sections
- Cards
- Figures
- Callouts
- Statistics
- Tags
- Tables

Avoid excessive one-off styling.

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

## External Assets

Prefer self-contained assets.

If an image is available locally, reference it appropriately or embed it when practical.

Avoid relying on external resources such as:

- CDN-hosted CSS
- Remote fonts
- Remote JavaScript
- External image URLs

unless explicitly requested.

A research poster should remain usable when opened offline.

---

## Responsive Behaviour

The primary target is the physical poster canvas.

Responsive behaviour may be added for convenience when viewing the poster on a screen.

For example:

```text
Physical poster
      ↓
Desktop preview
      ↓
Optional smaller-screen preview
```

Do not allow responsive behaviour to compromise the fixed poster layout.

---

## Print Styling

Include print-specific CSS when appropriate.

For example:

```text
@media print {
  @page {
    size: A0 landscape;
    margin: 0;
  }

  body {
    margin: 0;
  }

  .poster {
    width: 1189mm;
    height: 841mm;
  }
}
```

The exact dimensions should match the selected poster format.

Avoid page breaks that divide the poster into multiple pages.

---

## Screenshot Validation

Before considering the poster complete, verify:

### Layout

- [ ] The complete poster fits within the defined canvas.
- [ ] No content is clipped.
- [ ] No elements overlap unexpectedly.
- [ ] Columns align correctly.
- [ ] Margins are consistent.

### Typography

- [ ] Title is immediately visible.
- [ ] Section headings are clear.
- [ ] Body text is readable.
- [ ] Figure labels are readable.
- [ ] No important text is excessively small.

### Scientific content

- [ ] Research question is clear.
- [ ] Methods are understandable.
- [ ] Main result is obvious.
- [ ] Figures represent the actual data.
- [ ] Statistical claims are accurate.
- [ ] Conclusions match the evidence.

### Visual design

- [ ] Visual hierarchy is obvious.
- [ ] Colour usage is consistent.
- [ ] There is sufficient whitespace.
- [ ] Figures receive appropriate emphasis.
- [ ] The poster does not look like a document stretched onto a large canvas.

### Screenshot

- [ ] The poster can be captured as one complete image.
- [ ] No scrolling is required.
- [ ] No hover state is required.
- [ ] No animation affects the result.
- [ ] The browser background does not become part of the poster unintentionally.

---

## Content Compression

When source material is too long for a poster, compress it in this order:

```text
Remove repetition
      ↓
Remove low-value background
      ↓
Shorten explanations
      ↓
Convert prose to bullets
      ↓
Convert procedures to diagrams
      ↓
Prioritise primary findings
      ↓
Remove non-essential details
```

Do not solve overcrowding by simply reducing font size.

---

## Poster Writing Style

Use concise scientific language.

Prefer:

> Older children produced more complex speech.

over:

> The results obtained from the statistical analysis demonstrated that there was a tendency for children belonging to the older age groups to produce speech that could be characterised as being of greater complexity.

Use:

- Short sentences
- Strong nouns and verbs
- Specific terminology
- Direct statements
- Minimal repetition

---

## Final Takeaway

A research poster should allow three levels of reading:

### 5-second view

The viewer sees:

- Title
- Topic
- Main finding

### 30-second view

The viewer understands:

- Research question
- Methods
- Main result
- Conclusion

### 3-minute view

The viewer can inspect:

- Methods
- Figures
- Statistics
- Limitations
- References

The poster succeeds when all three levels work together.

---

## Core Principle

**Design the poster for understanding, not information density.**

The goal is not to fit the entire paper onto one page.

The goal is to make the research question, evidence, findings, and conclusion understandable at a glance while preserving scientific accuracy.
