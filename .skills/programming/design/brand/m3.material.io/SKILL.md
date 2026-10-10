---
name: "google-design-system"
description: "Build web/app UI on an inherited, opinionated design system (Material Design 3 / Google) instead of inventing tokens from scratch. Covers color roles, type and shape scales, elevation, state layers, motion tokens, Tailwind v4 + DaisyUI 5 wiring, and where divergence must be declared. Use when starting a new app, choosing between borrowing a system and deriving one, or reviewing UI that drifts from its own design system."
tags:
  - "programming"
  - "design"
  - "brand"
  - "m3"
  - "material"
  - "io"
  - "google"
when_to_use: "Use when starting a new app, choosing between borrowing a system and deriving one, or reviewing UI that drifts from its own design system."
prerequisites:
  - "A clear product or design goal."
  - "Familiarity with the target audience and existing interface constraints."
related_skills:
  - "../carbondesignsystem.com/SKILL.md"
  - "../atlassian.design/SKILL.md"
  - "../nothing.tech/SKILL.md"
avoid_when:
  - "When the brief does not call for this design system or philosophy; follow the project’s existing design language instead."
status: "active"
---

# Google Design System (Material Design 3)

Every product ends up with a design system. The question is whether you **inherit** one or **derive** one from content (see design/brand/nothing.md). Mixing the two is the usual reason UI feels inconsistent with no explainable cause. This skill covers the inherit branch, using M3 because its token model is role-based and maps cleanly onto CSS variables, Tailwind v4, and DaisyUI 5.

**You buy:** cohesion, passing contrast, platform familiarity, and a decision you don't have to re-litigate. **You pay:** you look like everything else using it, and real needs outside it need a workaround or a...

## When to use

Use when starting a new app, choosing between borrowing a system and deriving one, or reviewing UI that drifts from its own design system.

## Prerequisites

- A clear product or design goal.
- Familiarity with the target audience and existing interface constraints.

## Scope boundary

- When the brief does not call for this design system or philosophy; follow the project’s existing design language instead.

## Essential checks

- **Roles, not names** — a token says what it _does_ (on-surface), never what
- it looks like (gray-800). Name-by-color breaks the moment a theme changes
- **Ink on ground** — every color token is a surface/ink pair (surface +
- on-surface). Contrast then holds by construction instead of by review
- **One source per feel** — elevation from surface tint, interaction from state
- layers, emphasis from color. Don't stack shadows to fake depth that has a token
- **The system is the decision record** — a component library is disposable; the
- resolved ratios and thresholds are the asset

## Focus areas

- 1. Core Principles
- 2. Color Is a Set of Roles
- 3. Wire Roles Into Tokens
- 4. Type Is Roles With Bundled Metrics
- 5. Shape, Elevation, and State
- 6. Accessibility Is Part of the System
- 7. Motion as Tokens
- 8. When to Choose This Branch — and When to Leave

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
