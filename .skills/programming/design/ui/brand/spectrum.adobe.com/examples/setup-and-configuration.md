# Spectrum Design System (Adobe): 2. The Two-Tier Token Model

## Source guidance

This example applies the **2. The Two-Tier Token Model** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Global tokens** hold raw values: colors, dimensions, font sizes, durations.
They know nothing about where they will be used.
- **Alias tokens** bind meaning: "this surface color is a background", "this is an
border that must pass contrast". This is the tier components consume.
- **Component tokens** are internal to a component and should not be referenced
from application code.
Referencing a global token directly in a component hard-codes today's value and

## Example

This excerpt is from the cited **2. The Two-Tier Token Model** section.

```css
/* application code consumes the alias, never the primitive */
.panel {
  background: var(--alias-background-color-primary);
  color: var(--alias-label-text-color);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for spectrum-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
