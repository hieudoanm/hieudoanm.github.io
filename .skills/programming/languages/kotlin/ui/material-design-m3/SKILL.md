---
name: "material-design-m3"
description: "Material Design 3 (Material You) — Google's third design system for Android/Kotlin (and cross-platform), with dynamic color, expressive components, and adaptive layouts."
tags:
  - "programming"
  - "language"
  - "kotlin"
  - "ui"
  - "material"
  - "design"
  - "m3"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Material Design 3 in a project."
prerequisites:
  - "Basic familiarity with Kotlin and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../android/SKILL.md"
  - "../compose/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Material Design 3

(M3, "Material You") is Google's **evolved design system** for Android (Jetpack Compose) and the web. It centers on **dynamic color, expression, and adaptability** while keeping the strong token-based theming of M2.

## When to use

Use when implementing, configuring, evaluating, or troubleshooting Material Design 3 in a project.

## Prerequisites

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- Mixing M2 and M3 components — token mismatch (e.g., Surface with old elevation)
- Hardcoding colors instead of using scheme roles (breaks dark/dynamic theming)
- Ignoring **accessibility**: contrast on tonal surfaces, localizedStrings, touch targets (minimumInteractiveComponentSize)
- Loading dynamic color on unsupported OS versions without fallback
- Theming is token-first: define color, typography, and shape once, consume via roles
- Use dynamic color when supported, custom scheme otherwise; always support dark
- Prefer Material 3 components over custom visuals to stay accessible and consistent
- Elevate via tonal overlays and shadows consistently across the app

## Focus areas

- 1. Core Concepts
- 2. Setting Up in Compose
- 3. Color
- 4. Typography
- 5. Shape
- 6. Components & State
- 7. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
