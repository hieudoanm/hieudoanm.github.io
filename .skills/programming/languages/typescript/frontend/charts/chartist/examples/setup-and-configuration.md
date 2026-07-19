# Chartist Best Practices: 2. Styling via CSS

## Source guidance

This example applies the **2. Styling via CSS** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **The library outputs structured SVG classes — style them, don't pixel-hack:**
- **Y-axis/energy via `.ct-grid`/`.ct-labels` CSS; consistent palette per series letter.**
- **No camelCase inline styles — the CSS classes are the theme.**

## Example

```css
.ct-series-a .ct-line { stroke: #2563eb; stroke-width: 2px; }
.ct-series-b .ct-bar { fill: #dc2626; }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for chartist-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
