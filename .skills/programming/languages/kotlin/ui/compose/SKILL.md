---
name: "compose-best-practices"
description: "Best practices for building desktop UIs with Compose Multiplatform (Kotlin). Use when writing, structuring, styling, or reviewing a Compose app — covers Gradle setup, theming and design tokens, state and recomposition, side effects, lists and performance, desktop windows, accessibility, and testing, with suggested values."
tags:
  - "programming"
  - "language"
  - "kotlin"
  - "ui"
  - "compose"
when_to_use: "Use when writing, structuring, styling, or reviewing a Compose app."
prerequisites:
  - "Basic familiarity with Kotlin and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../android/SKILL.md"
  - "../material-design-m3/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Compose Multiplatform Best Practices

Compose replaces the widget tree with a function tree: you describe what the UI should look like for the current state, and the runtime recomposes what changed. Best practice here is **state-first, token-driven, side-effect-free composition** — hoist state out of composables, consume design tokens instead of literal values, and keep the composable body a pure function of its parameters.

This document is written against **Kotlin 2.4+ / Compose 1.12+** and includes concrete values you can drop straight into code.

## When to use

Use when writing, structuring, styling, or reviewing a Compose app.

## Prerequisites

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Stateless by default, stateful at the edge** — hoist to one owner, pass down, emit events up
- **Reducers own the logic; composables own the pixels.** If a rule is testable without Compose, it belongs outside Compose
- **Tokens, not literals** — color, type, shape, spacing defined once and consumed by role
- **Immutable state plus a single event type** — exhaustive, reviewable, skippable
- **Effects for anything asynchronous or external; the body stays pure.**
- **Stable keys on every list item; extract rows into leaf composables.**
- **Prefer M3 components over hand-rolled visuals** — they bring theming, states, and accessibility for free
- [ ] google() in both pluginManagement and dependencyResolutionManagement

## Focus areas

- 1. Core Stack & Gradle Setup
- 2. Theming: Define Tokens Once, Consume by Role
- 3. Spacing & Layout: Use the 4dp Grid
- 4. State & Recomposition — The Core Discipline
- 5. Side Effects & Lifecycle
- 6. Lists & Performance
- 7. Desktop Windows
- 8. Accessibility
- 9. Testing
- 10. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
