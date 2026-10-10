# Nothing Design Language: 6. The Dot Language

## Source guidance

This example applies the **6. The Dot Language** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

The signature. It appears in four places, each on a fixed grid.
- **Standalone numerals** — dot-display face for counts, indices, percentages,
dates, gauges. Letter units (`GB`, `K`) stay in mono.
- **Icons — 9×9.** Each lit cell is a **complete round dot** (`border-radius: 50%`).
Never build with `mask` or `clip-path`; that cuts dots into half-circles. Scale
via one `--dot-size`, gap = `size / 20`.
- **Glyph Matrix — 25×25 circularly masked** (Phone (3)): no dots in the corners,

## Example

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.42) 1.3px,
    transparent 1.7px
  );
  background-size: 120px 120px;
  background-attachment: fixed;
  mix-blend-mode: difference;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for nothing-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
