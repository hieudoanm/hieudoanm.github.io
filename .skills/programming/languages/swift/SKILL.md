---
name: "swift-best-practices"
description: "Idiomatic Swift best practices covering value types, optionals, protocols, Codable, concurrency and actors, error handling, testing, and tooling. Use when writing, structuring, or reviewing Swift code."
tags:
  - "programming"
  - "language"
  - "swift"
when_to_use: "Use when writing, structuring, or reviewing Swift code."
prerequisites:
  - "Basic familiarity with Swift and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "ui/swiftui/SKILL.md"
  - "cli/swift-argument-parser/SKILL.md"
  - "ide/xcode/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Swift Best Practices

Swift is a multi-paradigm language built around value semantics and protocol-oriented design. Most of the classic Objective-C pain (nil-heavy code, unguarded state, shared mutable classes) is designed _out_ — the best practices here are about leaning into value types, Codable, enum-based state machines, and structured concurrency so whole classes of bugs become unrepresentable.

## When to use

Use when writing, structuring, or reviewing Swift code.

## Prerequisites

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Value semantics first, reference semantics when justified** — struct/enum over class, let over var, immutable Codable models. Sharing is the source of most bugs; avoid it by default
- **Keep ViewController/View thin** — UI types capture and render state; logic lives in testable models/services injected via initialisers
- **Single responsibility per type and screen** — if a file needs a table of contents, split it
- **Exhaustive switch over runtime checks** — the compiler is the best reviewer of your state handling
- **Dependencies explicit and injected** — no reaches into UIApplication.shared, singletons, or global mutable state
- **String-literal state is a smell** — use enums, OptionSet for flags, and Codable-friendly structures instead
- [ ] struct/enum by default; class only for identity/shared state, marked final
- [ ] let preferred over var

## Focus areas

- 1. Project Structure
- 2. Value Types vs Reference Types
- 3. Optionals & Flow Control
- 4. Enums & State Machines
- 5. Error Handling
- 6. Concurrency & Actors
- 7. Protocols & Extensions
- 8. Codable & Serialization
- 9. Testing
- 10. Tooling (Non-negotiable)

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
