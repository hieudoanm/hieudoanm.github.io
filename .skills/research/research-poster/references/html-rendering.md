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

## Avoid Browser-Dependent Typography
A poster intended for sharing should not depend on an obscure locally installed font.

Prefer:

- Common system fonts
- Embedded fonts where licensing permits
- Carefully selected web fonts when network access is guaranteed

If the poster must remain completely offline, system fonts or embedded font files are safer.

---

## Accessible Figures
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

## Main Finding Callout
A major finding can receive a dedicated visual region.

```html
<section class="key-finding">
  <div class="key-finding-label">Key finding</div>

  <p>Speech complexity increased with age across the study sample.</p>
</section>
```

This provides a fast entry point for readers.

---

## Avoid Scroll-Dependent Design
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

## Screenshot Rendering
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

## Screenshot-Safe Design
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

## Recommended Development Workflow
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

## Final Principle
The HTML implementation is successful when the browser becomes a reliable rendering surface for the scientific poster.

The goal is not to build a website.

The goal is to build a **reproducible scientific poster that happens to be rendered with HTML and CSS**.
