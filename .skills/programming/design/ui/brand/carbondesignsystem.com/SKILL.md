---
name: "carbon-design-system"
description: "Build enterprise, data-dense web UI on IBM's Carbon design system instead of inventing tokens. Covers the four themes, the role-based token layer, productive vs editorial typography, layer-based elevation, the 2x Grid, Carbon package wiring for React and Web Components, accessibility, and where to declare divergence. Use when building or reviewing dashboards, admin consoles, tables, forms, settings, or any app that must sit inside IBM Cloud or a Carbon-flavoured surface."
tags:
  - "programming"
  - "design"
  - "brand"
  - "carbondesignsystem"
  - "com"
  - "carbon"
when_to_use: "Use when building or reviewing dashboards, admin consoles, tables, forms, settings, or any app that must sit inside IBM Cloud or a Carbon-flavoured surface."
prerequisites:
  - "A clear product or design goal."
  - "Familiarity with the target audience and existing interface constraints."
related_skills:
  - "../polaris/SKILL.md"
  - "../m3.material.io/SKILL.md"
  - "../atlassian.design/SKILL.md"
avoid_when:
  - "When the brief does not call for this design system or philosophy; follow the project’s existing design language instead."
status: "active"
---

# Carbon Design System (IBM)

Carbon is IBM's open-source, enterprise-first design system and the software expression of the IBM Design Language. It is the right default when the work is **enterprise software**: dashboards, consoles, tables, forms, settings — surfaces where density, clarity and predictable behaviour matter more than personality.

**You buy:** four ready-made themes, a role-based token layer, a component library shipped as both React and Web Components, a documented 2x Grid, and accessibility that is already solved for the hard widgets (data table, combo box, tabs).

## When to use

Use when building or reviewing dashboards, admin consoles, tables, forms, settings, or any app that must sit inside IBM Cloud or a Carbon-flavoured surface.

## Prerequisites

- A clear product or design goal.
- Familiarity with the target audience and existing interface constraints.

## Scope boundary

- When the brief does not call for this design system or philosophy; follow the project’s existing design language instead.

## Essential checks

- **Themes change values, never roles.** A token's _role_ is fixed across all four
- themes; only its _value_ changes. Anything else means you hard-coded a hex
- **Dense is the default.** Carbon is sized for scanning tables and forms at
- enterprise density. If your layout looks empty, the fix is hierarchy, not padding
- **Elevation is a layer token.** Stacked shadows that fake depth are a bug; use
- $layer-01…$layer-accent-01
- **Productive type is the UI voice.** Editorial styles are for reading, not for
- buttons and tables

## Focus areas

- 1. Core Principles
- 2. Themes and the Token Model
- 3. Color Is Roles Over Values
- 4. Typography Has Four Categories
- 5. Spacing and the 2x Grid
- 6. Elevation Is a Layer, Not a Shadow
- 7. Implementation: Which Package
- 8. Accessibility
- 9. Declaring Divergence

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
