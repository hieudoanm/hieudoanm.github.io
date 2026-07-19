---
name: "flutter-best-practices"
description: "Best practices for building Flutter apps — the framework conventions for declarative UIs on iOS/Android/web/desktop. Use when writing, structuring, or reviewing Flutter — covers widgets, state management, layout, navigation, theming, async/data, testing, performance, and tooling."
tags:
  - "programming"
  - "language"
  - "dart"
  - "ui"
  - "flutter"
when_to_use: "Use when writing, structuring, or reviewing Flutter."
prerequisites:
  - "Basic familiarity with Dart and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../swift/ui/swiftui/SKILL.md"
  - "../../../typescript/game/cocos-creator/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Flutter Best Practices

Flutter builds UI from **widgets**, and state is the texture of every screen. Practical Flutter leans on **small stateless leaves, predictable state ownership** (StatefulWidget + inherited/Provider/Riverpod scopes), and **BuildContext-bounded async** so errors close the UI instead of crash it. The flutter analyze gate plus a flutter test suite round out the review ritual.

## When to use

Use when writing, structuring, or reviewing Flutter.

## Prerequisites

- Basic familiarity with Dart and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Small const leaves compose the screen.**
- **State ownership is explicit and scoped — never global mutable app state.**
- **Async completes and closes: streams cancel, futures bound, mounted guarded.**
- **Themes own all visual tokens.**
- **flutter analyze + flutter test are part of "done".**
- [ ] Const small widgets; StatelessWidget default; names read as a screen map
- [ ] State scope matches need (setState/Provider/Riverpod); views stay dumb
- [ ] Stack layouts with spacing; Expanded/Flexible; no default overflows

## Focus areas

- 1. Widget Composition
- 2. State Management
- 3. Layout
- 4. Lists & Navigation
- 5. Theming & Styling
- 6. Async, Data & Lifecycle
- 7. Forms & Input
- 8. Testing
- 9. Performance
- 10. Tooling & Release

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
