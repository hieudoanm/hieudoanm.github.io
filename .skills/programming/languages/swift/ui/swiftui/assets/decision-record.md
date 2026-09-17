# SwiftUI Best Practices: Decision Record

Use this record when applying [SwiftUI Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building SwiftUI apps — the framework conventions for Apple platform UIs. Use when writing, structuring, or reviewing SwiftUI — covers state and data flow, view composition, layout, lists, navigation, theming, previews, testing, and performance.

SwiftUI is a declarative UI framework: you describe the view for a given state and the framework reconciles it. Practical SwiftUI leans on **small View structs, explicit state ownership through property wrappers (@State, @Binding, @Observable)**, and **Observable/@Environment flows for shared data — not singletons**. The modifier chain reads as the styling contract, and #Preview + XCTest gate every iteration.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. State & Data Flow
- [ ] 2. View Composition
- [ ] 3. Layout & Modifiers
- [ ] 4. Lists & Scrollable Content
- [ ] 5. Navigation
- [ ] 6. Theming & Environment
- [ ] 7. Async & Side Effects
- [ ] 8. Previews & Iteration

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
