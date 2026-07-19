---
name: "swiftui-best-practices"
description: "Best practices for building SwiftUI apps — the framework conventions for Apple platform UIs. Use when writing, structuring, or reviewing SwiftUI — covers state and data flow, view composition, layout, lists, navigation, theming, previews, testing, and performance."
tags:
  - "programming"
  - "language"
  - "swift"
  - "ui"
  - "swiftui"
when_to_use: "Use when writing, structuring, or reviewing SwiftUI."
prerequisites:
  - "Basic familiarity with Swift and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../ios/SKILL.md"
  - "../../SKILL.md"
  - "../ipados/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# SwiftUI Best Practices

SwiftUI is a declarative UI framework: you describe the view for a given state and the framework reconciles it. Practical SwiftUI leans on **small View structs, explicit state ownership through property wrappers (@State, @Binding, @Observable)**, and **Observable/@Environment flows for shared data — not singletons**. The modifier chain reads as the styling contract, and #Preview + XCTest gate every iteration.

## When to use

Use when writing, structuring, or reviewing SwiftUI.

## Prerequisites

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **State is explicit: @State/@Binding/@Observable — ownership visible from the declaration.**
- **Small view structs, @ViewBuilder composition, sub-40-line bodies.**
- **List/ForEach data-driven; navigation value-driven.**
- **All visual tokens via environment; accessibility is not optional.**
- **.task for lifecycle async; loading/error/empty are views.**
- **#Preview + unit tests + Instruments are part of "done".**
- [ ] @State/@Binding/@Observable ownership correct; no global/singleton state
- [ ] Small View structs; @ViewBuilder; some View returns

## Focus areas

- 1. State & Data Flow
- 2. View Composition
- 3. Layout & Modifiers
- 4. Lists & Scrollable Content
- 5. Navigation
- 6. Theming & Environment
- 7. Async & Side Effects
- 8. Previews & Iteration
- 9. Testing
- 10. Performance & App Structure

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
