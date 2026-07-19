---
name: "slint-material-design"
description: "Best practices for building Material Design-styled desktop/embedded GUIs with Slint (Rust). Use when creating, styling, or reviewing a Slint app — covers the Material style, .slint theming, typography, elevation, and component patterns with suggested values."
tags:
  - "programming"
  - "language"
  - "rust"
  - "ui"
  - "slint"
  - "material"
  - "design"
when_to_use: "Use when creating, styling, or reviewing a Slint app."
prerequisites:
  - "Basic familiarity with Rust and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../tauri/SKILL.md"
  - "../../SKILL.md"
  - "../../cli/ratatui/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Slint + Material Design Best Practices

Slint ships a built-in **Material** style (SLINT_STYLE=material or set in slint-build) that already implements most Material Design conventions. The main job is not reinventing Material tokens but applying them consistently and not fighting the style with ad-hoc overrides.

## When to use

Use when creating, styling, or reviewing a Slint app.

## Prerequisites

- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Don't fight the Material style** — overriding every widget's colors/shapes individually usually looks worse than adjusting the Palette globally
- **Test both material-light and material-dark** — set via SLINT_STYLE — before shipping
- **One primary color, one accent, neutral everything else** — Material is forgiving on layout but unforgiving on color sprawl
- **Respect elevation semantics** — don't give a flat background the same shadow as a dialog
- [ ] SLINT_STYLE explicitly set to material-light/material-dark
- [ ] Colors sourced from Palette or a single custom color global, not scattered hex literals
- [ ] Spacing values pulled from an 8px-based token set
- [ ] Elevation (drop-shadow) used to distinguish background / card / dialog levels

## Focus areas

- 1. Setup
- 2. Color: Use Material Tokens, Don't Hardcode
- 3. Elevation (Shadows)
- 4. Spacing Tokens (Material 8dp Grid)
- 5. Typography (Material Type Scale)
- 6. Shape (Corner Radius)
- 7. Components: Use `std-widgets.slint` First
- 8. Layout

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
