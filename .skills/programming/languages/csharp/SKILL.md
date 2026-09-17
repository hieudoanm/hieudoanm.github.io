---
name: "csharp-best-practices"
description: "Best practices for writing C# — the language conventions for .NET code. Use when writing, structuring, or reviewing C# code — covers type design, null safety, error handling, async discipline, collections, concurrency, diagnostics, and tooling."
tags:
  - "programming"
  - "language"
  - "csharp"
when_to_use: "Use when writing, structuring, or reviewing C# code."
prerequisites:
  - "Basic familiarity with C# and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "dotnet/SKILL.md"
  - "game/unity/SKILL.md"
  - "ide/rider/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# C# Best Practices

C# is the language of the .NET platform; modern C# (12+) is concise and expressively typed (records, pattern matching, span, target-typed new). Practical C# leans on **immutability by default, null-safety enforced at compile time, exceptions for genuine failures, and async through a cancellation token that never gets dropped**. The discipline matters more than any single feature: every API boundary is a typed contract, and analyzers (.editorconfig + dotnet build warnings) are treated as part of the contract.

## When to use

Use when writing, structuring, or reviewing C# code.

## Prerequisites

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Make invalid states unrepresentable** — record structs, discriminated unions and pattern matching beat "0 means unset" oro-checkboxstringly booleans
- **Compile-time guarantees over runtime checks** — nullable annotations, readonly collection types, sealed
- **Immutable by default, mutate explicitly** — the happy path is a valueless value you assemble once
- **Async end-to-end with a token that flows** — cancellation is part of the signature, not an afterthought
- **Exceptions for failures, Results for expected outcomes** — pick once, consistently
- **Analyzers + dotnet test are part of "done"** — not a lint step to run before merge
- [ ] record/readonly record struct for DTOs; init/required over mutable setters; classes sealed by default
- [ ] Nullable reference types enabled; ?./?? over null ifs; ! only on verified invariants

## Focus areas

- 1. Type Design & Immutability
- 2. Null Safety
- 3. Error Handling
- 4. Async Discipline
- 5. Collections & LINQ
- 6. Concurrency
- 7. Strings & Culture
- 8. Modern C# Patterns
- 9. Classes & Dependency Injection
- 10. Testing
- 11. Tooling & Diagnostics

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
