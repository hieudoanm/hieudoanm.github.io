# Compose Multiplatform Best Practices: Decision Record

Use this record when applying [Compose Multiplatform Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building desktop UIs with Compose Multiplatform (Kotlin). Use when writing, structuring, styling, or reviewing a Compose app — covers Gradle setup, theming and design tokens, state and recomposition, side effects, lists and performance, desktop windows, accessibility, and testing, with suggested values.

Compose replaces the widget tree with a function tree: you describe what the UI should look like for the current state, and the runtime recomposes what changed. Best practice here is **state-first, token-driven, side-effect-free composition** — hoist state out of composables, consume design tokens instead of literal values, and keep the composable body a pure function of its parameters.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Gradle Setup
- [ ] 2. Theming: Define Tokens Once, Consume by Role
- [ ] Color
- [ ] Typography
- [ ] Shape
- [ ] 3. Spacing & Layout: Use the 4dp Grid
- [ ] 4. State & Recomposition — The Core Discipline
- [ ] Hoist everything

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
