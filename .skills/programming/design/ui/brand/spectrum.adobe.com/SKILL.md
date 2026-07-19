---
name: "spectrum-design-system"
description: "Build Adobe creative-tool and productivity UI on the Spectrum design system. Covers the global/alias token split, Spectrum's canvas-plus-chrome density model, UI typography, theme and mode handling, the React Spectrum / Web Components / CSS-only implementations, tool-surface accessibility, and how to avoid forking the system. Use when building or reviewing creative editors, panels, toolbars, inspectors, or Adobe-adjacent enterprise UI."
tags:
  - "programming"
  - "design"
  - "brand"
  - "spectrum"
  - "adobe"
  - "com"
when_to_use: "Use when building or reviewing creative editors, panels, toolbars, inspectors, or Adobe-adjacent enterprise UI."
prerequisites:
  - "A clear product or design goal."
  - "Familiarity with the target audience and existing interface constraints."
related_skills:
  - "../carbondesignsystem.com/SKILL.md"
  - "../lightningdesignsystem.com/SKILL.md"
  - "../polaris/SKILL.md"
avoid_when:
  - "When the brief does not call for this design system or philosophy; follow the project’s existing design language instead."
status: "active"
---

# Spectrum Design System (Adobe)

Spectrum is the design system behind Adobe's creative and productivity experiences. It is the right reference when the UI is **chrome around a canvas**: an editor, an inspector, a toolbar, a panel — surfaces where the user's attention belongs on the content and the interface's job is to stay out of the way.

**You buy:** a density model built specifically for tool UIs, a two-tier token system that separates primitives from semantics, themes and modes, and three mature implementations including React Spectrum.

## When to use

Use when building or reviewing creative editors, panels, toolbars, inspectors, or Adobe-adjacent enterprise UI.

## Prerequisites

- A clear product or design goal.
- Familiarity with the target audience and existing interface constraints.

## Scope boundary

- When the brief does not call for this design system or philosophy; follow the project’s existing design language instead.

## Essential checks

- **The canvas is the content.** UI is chrome; chrome must not compete with the
- work
- **Density is a first-class variable.** Creative tools change what is on screen
- constantly, so the same component appears at multiple densities
- **Primitives vs semantics.** A global token is a raw value; an alias token is
- what a value _means_. Components consume aliases, never globals
- **Modes are not themes.** A theme is a color scheme; a mode changes how the same
- scheme behaves (size, density, emphasis). Conflating them is a common bug

## Focus areas

- 1. Core Principles
- 2. The Two-Tier Token Model
- 3. Density Is the Point
- 4. Typography
- 5. Theme and Mode
- 6. Implementation: Pick Your Line
- 7. Accessibility
- 8. Declaring Divergence

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
