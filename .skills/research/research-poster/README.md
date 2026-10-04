# Research Poster Skill

Create polished scientific research posters as **self-contained HTML files** that can be opened in a browser, displayed as a fixed-size poster, and captured as a screenshot or exported to PDF.

## Purpose

This skill helps transform research content into a visual scientific communication artifact.

The primary output is:

`poster.html`

The poster should prioritise:

- Scientific accuracy
- Clear information hierarchy
- Visual communication
- Readability
- Consistent layout
- Screenshot-friendly rendering
- Print-friendly dimensions
- Reproducibility

A research poster is not simply a paper converted to HTML. It should be redesigned around the information that a viewer needs to understand the research quickly.

## Typical Use Cases

Use this skill when creating:

- Conference posters
- University research posters
- MSc dissertation posters
- Undergraduate research posters
- Neuroscience posters
- Psychology posters
- Computational neuroscience posters
- Data science research posters
- Project presentation posters
- Research project summaries
- Academic exhibition posters

## Output

The default output should be a complete HTML document:

```text
poster.html
```

Prefer a single self-contained file containing:

- HTML structure
- CSS styling
- Poster content
- Embedded diagrams where appropriate
- Figures or figure placeholders
- Tables
- References
- Optional QR/contact information

The file should work when opened directly in a browser.

## Default Poster Structure

A typical poster contains:

1. Title
2. Authors and affiliations
3. Background
4. Research question
5. Hypothesis or objectives
6. Methods
7. Results
8. Discussion
9. Limitations
10. Conclusion
11. References
12. Contact or QR code

The exact structure should depend on the research project.

Do not include sections merely because they appear in this list.

## Core Design Principle

Organise the poster around:

**Question → Method → Evidence → Finding → Meaning**

The viewer should be able to identify the main research question and main finding without reading the entire poster.

## Poster Canvas

The HTML should use a fixed physical canvas.

For example:

- A0 landscape: `1189mm × 841mm`
- A0 portrait: `841mm × 1189mm`

Use the dimensions specified by the user when available.

The poster should not behave like an ordinary scrolling webpage.

## Screenshot-First Design

The poster should be designed so that the entire artifact can be captured as one screenshot.

Avoid:

- Scroll-dependent content
- Hover-dependent information
- Collapsible sections
- Animated content
- Dynamically changing content
- Content extending beyond the poster canvas
- Important information hidden below the fold

The rendering should be deterministic.

## Visual Hierarchy

Use visual prominence according to scientific importance.

The hierarchy should generally be:

```text
Main finding
    ↓
Research question
    ↓
Primary evidence
    ↓
Methods
    ↓
Interpretation
    ↓
Supporting details
```

Do not give equal visual weight to every piece of information.

## Scientific Writing

Use concise scientific language.

Prefer:

> Speech complexity increased with age.

over:

> The results of the analysis demonstrated that there appeared to be a tendency for speech complexity to increase as a function of the age of the participants.

Use short paragraphs, concise headings, bullets, figures, and callouts.

## Scientific Accuracy

The poster must preserve the distinction between:

- Correlation and causation
- Observation and interpretation
- Prediction and explanation
- Statistical significance and practical importance
- Confirmatory and exploratory analysis

Never exaggerate a finding to make the poster visually stronger.

## Figures

Figures should be central to the poster when they communicate the main evidence.

Prefer:

- Large plots
- Clear diagrams
- Experimental timelines
- Analysis pipelines
- Brain visualisations
- Model diagrams
- Compact statistical summaries

Each figure should have a clear scientific purpose.

Do not fabricate data.

If required data or a figure are unavailable, use an explicit placeholder rather than inventing results.

## HTML and CSS

Prefer:

- Semantic HTML
- CSS Grid
- CSS custom properties
- Reusable components/classes
- Embedded CSS
- Inline SVG for simple diagrams
- Print-specific CSS

Avoid unnecessary dependencies.

A basic structure is:

```text
<body>
  <main class="poster">
    <header>...</header>

    <section>Background...</section>
    <section>Methods...</section>
    <section>Results...</section>
    <section>Discussion...</section>
    <section>Conclusion...</section>

    <footer>...</footer>
  </main>
</body>
```

## Validation

Before delivering the poster, check:

### Scientific

- [ ] Research question is clear.
- [ ] Methods accurately represent the study.
- [ ] Results represent actual findings.
- [ ] Claims match the evidence.
- [ ] Limitations are appropriately stated.
- [ ] Conclusion answers the research question.

### Visual

- [ ] Main finding is visually prominent.
- [ ] Typography is readable.
- [ ] Figures are large enough.
- [ ] Sections are clearly separated.
- [ ] Colour usage is consistent.
- [ ] There is sufficient whitespace.
- [ ] No section is unnecessarily dense.

### Technical

- [ ] HTML is valid.
- [ ] CSS is contained or reliably available.
- [ ] Poster dimensions are correct.
- [ ] Content fits within the canvas.
- [ ] No important content requires scrolling.
- [ ] Screenshot captures the complete poster.
- [ ] Print rendering is defined where appropriate.

## Workflow

Use the following workflow:

```text
Research material
      ↓
Identify research question
      ↓
Identify main finding
      ↓
Extract essential evidence
      ↓
Plan poster hierarchy
      ↓
Design layout
      ↓
Write concise content
      ↓
Create figures / diagrams
      ↓
Implement HTML + CSS
      ↓
Check scientific accuracy
      ↓
Check visual hierarchy
      ↓
Validate screenshot / print rendering
      ↓
Final poster.html
```

## Related Skills

This skill works particularly well with:

- `research-writing`
- `paper-pdf-to-markdown`
- `research-reproduction`
- `research-literature-review`
- `research-methodology`
- `research-analysis`

Use `research-writing` for developing the scientific argument and prose.

Use `research-poster` for transforming that material into a visual HTML poster.

## Core Principle

**A research poster should make the research understandable before it makes the research comprehensive.**
