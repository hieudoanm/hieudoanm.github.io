# Slint + Material Design Best Practices: Decision Record

Use this record when applying [Slint + Material Design Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Material Design-styled desktop/embedded GUIs with Slint (Rust). Use when creating, styling, or reviewing a Slint app — covers the Material style, .slint theming, typography, elevation, and component patterns with suggested values.

Slint ships a built-in **Material** style (SLINT_STYLE=material or set in slint-build) that already implements most Material Design conventions. The main job is not reinventing Material tokens but applying them consistently and not fighting the style with ad-hoc overrides.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Setup
- [ ] 2. Color: Use Material Tokens, Don't Hardcode
- [ ] 3. Elevation (Shadows)
- [ ] 4. Spacing Tokens (Material 8dp Grid)
- [ ] 5. Typography (Material Type Scale)
- [ ] 6. Shape (Corner Radius)
- [ ] 7. Components: Use `std-widgets.slint` First
- [ ] 8. Layout

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
