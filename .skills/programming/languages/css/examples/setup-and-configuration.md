# Css: 1. Box Model and Units

## Source guidance

This example applies the **1. Box Model and Units** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Every element is a box: `content` + `padding` + `border` + `margin`.
- `box-sizing: border-box` includes padding/border in width/height — the default for modern resets.
- Units: relative (`rem`, `em`, `%`, `vh`, `vw`, `ch`) over absolute (`px`) for scalable, responsive UI.
- Logical properties (`margin-inline`, `padding-block`, `inset-inline`) adapt to writing direction.

## Example

This excerpt is from the cited **1. Box Model and Units** section.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  margin-inline: auto;
  padding-block: 1.5rem;
  max-inline-size: 40rem;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for css.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
