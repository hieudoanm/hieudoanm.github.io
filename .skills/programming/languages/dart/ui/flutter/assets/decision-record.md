# Flutter Best Practices: Decision Record

Use this record when applying [Flutter Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Flutter apps — the framework conventions for declarative UIs on iOS/Android/web/desktop. Use when writing, structuring, or reviewing Flutter — covers widgets, state management, layout, navigation, theming, async/data, testing, performance, and tooling.

Flutter builds UI from **widgets**, and state is the texture of every screen. Practical Flutter leans on **small stateless leaves, predictable state ownership** (StatefulWidget + inherited/Provider/Riverpod scopes), and **BuildContext-bounded async** so errors close the UI instead of crash it. The flutter analyze gate plus a flutter test suite round out the review ritual.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Dart and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Widget Composition
- [ ] 2. State Management
- [ ] 3. Layout
- [ ] 4. Lists & Navigation
- [ ] 5. Theming & Styling
- [ ] 6. Async, Data & Lifecycle
- [ ] 7. Forms & Input
- [ ] 8. Testing

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
