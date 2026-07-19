---
name: "java-best-practices"
description: "Idiomatic modern Java (17+) best practices covering project structure, records and sealed types, immutability, null handling, error handling, concurrency and virtual threads, composition, testing and tooling. Use when writing, structuring, or reviewing Java code."
tags:
  - "programming"
  - "language"
  - "java"
when_to_use: "Use when writing, structuring, or reviewing Java code."
prerequisites:
  - "Basic familiarity with Java and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "backend/javalin/SKILL.md"
  - "ide/idea/SKILL.md"
  - "../kotlin/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Java Best Practices

Modern Java (17, 21, and beyond) has moved decisively toward a more concise, data-focused style: records, sealed hierarchies, pattern matching, and virtual threads replace much of the boilerplate that defined the language for decades. "Best practice" here is about using those newer constructs to make code that is small, explicit, and honest about what can be null, what can fail, and what can change — instead of the defensive, getter-heavy Java of the past.

## When to use

Use when writing, structuring, or reviewing Java code.

## Prerequisites

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Modern constructs over ceremony** — record over getter-POJO, switch pattern matching over if instanceof, text blocks over escaped strings
- **Explicit over over-engineered** — a plain record + small class beats a framework-annotated one for most code; add abstraction only when it removes real duplication
- **Dependency injection via constructors, explicit lifecycles** — no ServiceLocator, no static singletons hidden by static holders
- **Fail fast, fail loudly** — requireNonNull and validation at boundaries, logs with causes at the top, never silent suppression
- **Keep functions/classes small and single-purpose** — if a method needs a paragraph, split it; if a class needs "real" inheritance, prefer composition
- **Consistent style**: spotless removes style debates entirely — the formatter is the style guide
- [ ] record for data carriers; sealed interface + exhaustive switch for hierarchies
- [ ] Immutable final fields, unmodifiable collections exposed from getters

## Focus areas

- 1. Project Structure
- 2. Records, Sealed Types & Pattern Matching
- 3. Immutability & Values First
- 4. Null Handling
- 5. Error Handling
- 6. Concurrency & Virtual Threads
- 7. Composition over Inheritance
- 8. Testing
- 9. Tooling (Non-negotiable)

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
