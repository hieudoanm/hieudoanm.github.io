---
name: "polaris-design-system"
description: "Build commerce and merchant-facing web UI on Shopify's Polaris design system. Covers the --p-* token namespace, 4px spacing, role-based color (bg, text, fill, border, icon), depth restraint, the current web-components direction versus the legacy React package, per-surface context (Admin, Checkout, POS, customer accounts), accessibility, and brand customization. Use when building or reviewing admin tooling, merchant dashboards, checkout surfaces, or any Shopify app UI."
tags:
  - "programming"
  - "design"
  - "brand"
  - "polaris"
when_to_use: "Use when building or reviewing admin tooling, merchant dashboards, checkout surfaces, or any Shopify app UI."
prerequisites:
  - "A clear product or design goal."
  - "Familiarity with the target audience and existing interface constraints."
related_skills:
  - "../carbondesignsystem.com/SKILL.md"
  - "../lightningdesignsystem.com/SKILL.md"
  - "../spectrum.adobe.com/SKILL.md"
avoid_when:
  - "When the brief does not call for this design system or philosophy; follow the project’s existing design language instead."
status: "active"
---

# Polaris Design System (Shopify)

Polaris is Shopify's unified UI framework, and the front door to every merchant surface: app admin, embedded app home, checkout, customer accounts, and POS. It is the reference implementation of Shopify's merchant-first design philosophy.

**You buy:** a dense, high-signal component vocabulary that merchant users already recognize from the products they run their business on, plus a token layer that covers the full scale of a commerce app.

## When to use

Use when building or reviewing admin tooling, merchant dashboards, checkout surfaces, or any Shopify app UI.

## Prerequisites

- A clear product or design goal.
- Familiarity with the target audience and existing interface constraints.

## Scope boundary

- When the brief does not call for this design system or philosophy; follow the project’s existing design language instead.

## Essential checks

- **The merchant is busy and interrupted.** Every extra click and every wasted
- vertical pixel costs them money. Density is a feature
- **Ship the obvious thing.** Polaris favours a small set of well-understood
- patterns over novel ones
- **Roles, not colors.** Tokens describe what a value _does_ (bg, text, fill),
- never what it looks like
- **Depth is rationed.** Elevation exists to communicate stacking order, not to
- decorate. Most surfaces are flat

## Focus areas

- 1. Core Principles
- 2. The Token Namespace
- 3. Color Is a Role System
- 4. Depth Without Shadows
- 5. Typography and Spacing
- 6. Surfaces and Their Contexts
- 7. Implementation
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
