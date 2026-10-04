# HTML Rendering for Research Posters

## Purpose

This guide defines how to implement a research poster as a self-contained HTML document that can be:

- Opened directly in a browser
- Displayed at a fixed poster size
- Captured as a high-quality screenshot
- Printed or exported to PDF
- Shared as a single file

The implementation should prioritise **stable rendering and visual fidelity** rather than web-app behaviour.

---

## 1. Poster as a Fixed Canvas

A research poster should behave like a physical poster rather than a responsive webpage.

For example, an A0 landscape poster has a physical size of:

```text
1189 mm × 841 mm
```

The HTML document should therefore define an explicit poster canvas.

```html
<main class="poster">...</main>
```

```css
.poster {
  width: 1189mm;
  height: 841mm;
}
```

The canvas should not depend on viewport height.

---

## 2. Self-Contained HTML

Prefer a single HTML file containing:

- HTML structure
- CSS
- SVG graphics where practical
- Small embedded assets where necessary

Example:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Research Poster</title>

    <style>
      /* All poster styles */
    </style>
  </head>

  <body>
    <main class="poster">...</main>
  </body>
</html>
```

A self-contained file makes the poster easier to:

- Share
- Archive
- Reproduce
- Screenshot
- Print
- Open on another machine

---

## 3. CSS Architecture

Organise CSS into predictable layers.

A useful structure is:

```css
/* 1. Variables */
:root {
  --poster-width: 1189mm;
  --poster-height: 841mm;
  --space-1: 4mm;
  --space-2: 8mm;
  --space-3: 12mm;
  --space-4: 18mm;
}

/* 2. Base */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

/* 3. Poster canvas */
.poster {
  width: var(--poster-width);
  height: var(--poster-height);
}

/* 4. Layout */
.poster-grid {
  display: grid;
}

/* 5. Components */
.section {
  ...
}

/* 6. Typography */
.title {
  ...
}

/* 7. Figures */
.figure {
  ...
}

/* 8. Print */
@media print {
  ...
}
```

Avoid scattering unrelated styles throughout the document.

---

## 4. CSS Variables

Use variables for values that should remain visually consistent.

For example:

```css
:root {
  --color-background: #ffffff;
  --color-surface: #f7f8fa;
  --color-text: #17202a;
  --color-muted: #5f6b76;
  --color-accent: #315c8a;

  --radius-small: 4mm;
  --radius-medium: 6mm;

  --space-small: 4mm;
  --space-medium: 8mm;
  --space-large: 12mm;
}
```

This makes global visual changes much easier.

---

## 5. Grid-Based Layout

CSS Grid is generally preferable to manually positioned elements.

Example:

```css
.poster-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12mm;
  padding: 24mm;
}
```

For a more structured poster:

```css
.poster-grid {
  display: grid;
  grid-template-columns: 0.9fr 1fr 1.1fr;
  grid-template-rows: auto 1fr auto;
  gap: 10mm;
}
```

Grid makes relationships between sections explicit.

---

## 6. Avoid Absolute Positioning

Absolute positioning can make a poster difficult to maintain.

Avoid using:

```css
position: absolute;
left: 437px;
top: 281px;
```

for normal poster content.

Prefer:

- Grid
- Flexbox
- Padding
- Margin
- Gap
- `minmax()`
- Fractional units

Absolute positioning is appropriate for specific overlays or decorative elements when their placement is intentional.

---

## 7. Fixed Spacing System

Use a consistent spacing scale.

For example:

```css
:root {
  --space-xs: 3mm;
  --space-sm: 5mm;
  --space-md: 8mm;
  --space-lg: 12mm;
  --space-xl: 18mm;
}
```

Then use the same values throughout the poster.

This produces visual rhythm.

---

## 8. Typography

Define typography explicitly.

For example:

```css
.poster {
  font-family: Inter, Helvetica, Arial, sans-serif;
  color: var(--color-text);
}

.poster-title {
  font-size: 28mm;
  line-height: 1.05;
  font-weight: 800;
}

.section-title {
  font-size: 9mm;
  line-height: 1.1;
  font-weight: 750;
}

.body {
  font-size: 5mm;
  line-height: 1.35;
}
```

Exact sizes should be adjusted according to:

- Poster dimensions
- Viewing distance
- Amount of content
- Typeface
- Screenshot resolution

---

## 9. Avoid Browser-Dependent Typography

A poster intended for sharing should not depend on an obscure locally installed font.

Prefer:

- Common system fonts
- Embedded fonts where licensing permits
- Carefully selected web fonts when network access is guaranteed

If the poster must remain completely offline, system fonts or embedded font files are safer.

---

## 10. Images

Images should have explicit dimensions or predictable containers.

```css
.figure img {
  display: block;
  width: 100%;
  height: auto;
}
```

For images that must occupy a fixed region:

```css
.figure-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

Avoid unintentionally stretching scientific figures.

---

## 11. SVG for Diagrams

SVG is particularly useful for:

- Experimental pipelines
- Brain diagrams
- Model architecture
- Flow diagrams
- Simple charts
- Arrows
- Icons

For example:

```html
<svg viewBox="0 0 800 300" role="img" aria-label="Analysis pipeline">...</svg>
```

SVG remains sharp when the poster is rendered at high resolution.

---

## 12. Accessible Figures

Important figures should have meaningful descriptions.

For example:

```html
<figure>
  <img
    src="results.png"
    alt="Scatter plot showing speech complexity increasing with participant age." />

  <figcaption>
    Speech complexity increased with age across the sample.
  </figcaption>
</figure>
```

The caption communicates the scientific interpretation.

The `alt` text communicates the visual content.

---

## 13. Colour

Define a small colour system.

For example:

```css
:root {
  --color-primary: #315c8a;
  --color-secondary: #64748b;
  --color-background: #ffffff;
  --color-surface: #f4f6f8;
  --color-text: #17202a;
  --color-muted: #5f6b76;
}
```

Avoid assigning a unique colour to every section.

Colour should communicate structure or meaning.

---

## 14. Avoid Colour-Only Encoding

Do not communicate an important distinction using colour alone.

Weak:

```text
Group A = blue
Group B = orange
```

Better:

```text
Group A = blue + label
Group B = orange + label
```

For accessibility, also consider:

- Shape
- Pattern
- Position
- Labels
- Line style

---

## 15. Cards and Sections

Section containers can improve hierarchy.

Example:

```css
.section {
  background: var(--color-surface);
  border-radius: var(--radius-medium);
  padding: var(--space-lg);
}
```

However, avoid turning every element into a separate card.

Too many cards can make the poster look like a dashboard rather than a scientific argument.

---

## 16. Main Finding Callout

A major finding can receive a dedicated visual region.

```html
<section class="key-finding">
  <div class="key-finding-label">Key finding</div>

  <p>Speech complexity increased with age across the study sample.</p>
</section>
```

This provides a fast entry point for readers.

---

## 17. Prevent Content Overflow

Poster content must fit inside the fixed canvas.

Avoid:

```css
.poster {
  height: 841mm;
  overflow: visible;
}
```

where content can extend beyond the poster.

Instead, design the content to fit.

Do not solve overflow by simply shrinking all text.

A better order is:

```text
Remove unnecessary content
        ↓
Shorten text
        ↓
Simplify layout
        ↓
Resize figures
        ↓
Adjust spacing
        ↓
Only then adjust typography
```

---

## 18. Avoid Scroll-Dependent Design

The complete poster should be visible as one canvas.

Avoid layouts such as:

```css
.poster {
  min-height: 100vh;
}
```

when the poster is intended to represent a physical page.

Instead use the physical poster dimensions.

---

## 19. Browser Rendering

A poster should be tested in the browser at multiple zoom levels.

Check:

- 25–50% zoom for overall composition
- 100% for text
- High zoom for figures and alignment

At low zoom, the visual hierarchy should remain obvious.

At high zoom, text and figures should remain sharp.

---

## 20. Screenshot Rendering

A screenshot should capture the entire poster canvas.

The target is:

```text
┌──────────────────────────────────────────────┐
│                                              │
│              COMPLETE POSTER                 │
│                                              │
│                                              │
│                                              │
└──────────────────────────────────────────────┘
```

Not:

```text
┌─────────────────────────┐
│ top half of poster      │
│                         │
├─────────────────────────┤
│ second screenshot       │
│                         │
├─────────────────────────┤
│ third screenshot        │
└─────────────────────────┘
```

The poster should therefore be designed for one-shot capture.

---

## 21. Screenshot-Safe Design

Avoid:

- Hover-only information
- Tooltips
- Animations
- Carousels
- Video
- Dynamic charts
- Content loaded after rendering
- Collapsible sections
- Sticky navigation
- Scroll-dependent content

The screenshot should contain all important information immediately.

---

## 22. Print CSS

Include print rules when PDF or physical printing is expected.

Example:

```css
@media print {
  @page {
    size: A0 landscape;
    margin: 0;
  }

  html,
  body {
    width: 1189mm;
    height: 841mm;
    margin: 0;
  }

  .poster {
    width: 1189mm;
    height: 841mm;
  }
}
```

Avoid relying entirely on browser defaults.

---

## 23. Backgrounds and Printing

Large background colours can consume substantial ink.

For print-oriented posters, prefer:

- Light backgrounds
- High-contrast text
- Limited saturated regions
- Minimal full-page dark backgrounds

For a digital-only poster, the design can be more flexible.

The intended output medium should be known before finalising the visual system.

---

## 24. Page Breaks

When exporting to PDF, prevent important components from splitting.

For example:

```css
.section {
  break-inside: avoid;
}

.figure {
  break-inside: avoid;
}
```

For a single-page poster, the preferred solution is still to ensure the complete poster fits inside one page.

---

## 25. Rendering Stability

Avoid layouts that depend on:

- JavaScript calculations
- Current time
- Random values
- Network APIs
- External data
- Dynamic viewport measurements

A scientific poster should render deterministically.

The same HTML should produce essentially the same visual result each time.

---

## 26. JavaScript

JavaScript should generally be unnecessary.

Use HTML and CSS for:

- Layout
- Typography
- Colours
- Diagrams
- Static figures
- Responsive behaviour

JavaScript may be appropriate for a development-only utility, but the final poster should not depend on it.

---

## 27. External Dependencies

Minimise external dependencies.

Avoid requiring:

- A JavaScript framework
- A CSS framework
- A charting library
- A remote API

unless there is a strong reason.

A self-contained poster is easier to reproduce.

---

## 28. Semantic HTML

Use meaningful HTML elements.

Prefer:

```html
<header>
  <h1>...</h1>
</header>

<section>
  <h2>Background</h2>
  ...
</section>

<figure>...</figure>

<footer>...</footer>
```

over a document consisting entirely of generic `<div>` elements.

Semantic structure improves maintainability and accessibility.

---

## 29. Validation

Before considering the poster complete, verify:

### Layout

- [ ] Poster dimensions are correct.
- [ ] No content extends outside the canvas.
- [ ] Columns align correctly.
- [ ] Spacing is consistent.
- [ ] No unexpected scrollbars appear inside the poster.

### Typography

- [ ] Title is immediately visible.
- [ ] Section headings are distinct.
- [ ] Body text is readable.
- [ ] No text is clipped.
- [ ] No unexpected font fallback occurs.

### Figures

- [ ] Images are not distorted.
- [ ] Charts have readable labels.
- [ ] Captions are visible.
- [ ] Important findings are visually prominent.
- [ ] Figures remain sharp at high resolution.

### Screenshot

- [ ] Entire poster fits in one capture.
- [ ] No browser UI is accidentally included.
- [ ] No dynamic content is missing.
- [ ] No hover state is required.
- [ ] No animation changes the captured result.

### Print

- [ ] A0/A1/etc. dimensions are correct.
- [ ] PDF export produces one poster page.
- [ ] Margins are correct.
- [ ] Colours remain readable when printed.

---

## 30. Recommended Development Workflow

Build the poster in stages:

```text
1. Define poster dimensions
        ↓
2. Create semantic HTML structure
        ↓
3. Create major grid
        ↓
4. Add typography
        ↓
5. Add scientific content
        ↓
6. Add figures
        ↓
7. Add visual hierarchy
        ↓
8. Validate overflow
        ↓
9. Test browser rendering
        ↓
10. Test screenshot
        ↓
11. Test PDF/print rendering
        ↓
12. Final scientific review
```

Do not spend significant time polishing colours before the content and layout are stable.

---

## 31. Final Principle

The HTML implementation is successful when the browser becomes a reliable rendering surface for the scientific poster.

The goal is not to build a website.

The goal is to build a **reproducible scientific poster that happens to be rendered with HTML and CSS**.
