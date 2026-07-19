---
name: "dart-best-practices"
description: "Best practices for writing Dart — the language conventions for client and server Dart code. Use when writing, structuring, or reviewing Dart — covers null safety, sound types, immutability, collections, async, classes, records/patterns, and tooling."
tags:
  - "programming"
  - "language"
  - "dart"
when_to_use: "Use when writing, structuring, or reviewing Dart."
prerequisites:
  - "Basic familiarity with Dart and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "ui/flutter/SKILL.md"
  - "../csharp/SKILL.md"
  - "../scala/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Dart Best Practices

Dart is the language behind Flutter — sound-null-safe, type-inferred, and compiled to native or web. Practical Dart leans on **non-nullable by default with explicit null handling, final fields with constructor initialization, and async through Future/Stream that flows a token or completes cleanly**. The analyzer (dart analyze) is the review gate, and classes are assembled by composition, not hierarchy sprawl.

## When to use

Use when writing, structuring, or reviewing Dart.

## Prerequisites

- Basic familiarity with Dart and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Non-nullable by default; ? is a promise to handle absence.**
- **final first, const where possible, late only with a real invariant.**
- **Compose with mixins/interfaces; keep hierarchies flat.**
- **Exhaustive sealed types over dynamic dispatch.**
- **Async flows a single completion path — with an error story.**
- **dart analyze + dart format + dart test are part of "done".**
- [ ] Non-nullable types; ?./??/promotion over ! on untrusted data
- [ ] Public signatures annotated; dynamic avoided; sealed types for hierarchies

## Focus areas

- 1. Null Safety
- 2. Sound Types & Inference
- 3. Immutability & Construction
- 4. Collections
- 5. Async & Streams
- 6. Classes, Inheritance & Composition
- 7. Errors & Domain Modeling
- 8. Records, Patterns & Modern Dart
- 9. Tooling & Style
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
