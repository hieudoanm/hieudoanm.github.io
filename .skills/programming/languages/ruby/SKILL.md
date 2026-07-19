---
name: "ruby-best-practices"
description: "Best practices for writing Ruby — the language conventions for Ruby 3 applications and tooling. Use when writing, structuring, or reviewing Ruby — covers object model, immutability, blocks, nil safety, error handling, OOP design, testing, and tooling."
tags:
  - "programming"
  - "language"
  - "ruby"
when_to_use: "Use when writing, structuring, or reviewing Ruby."
prerequisites:
  - "Basic familiarity with Ruby and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "backend/rails/SKILL.md"
  - "ide/ruby-mine/SKILL.md"
  - "../php/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Ruby Best Practices

Ruby is an expressive, message-passing language where reads-like-prose matters as much as behavior. Practical Ruby leans on **immutability + freeze and explicit nil handling via safe navigation, blocks for composition, and a disciplined object model** — attr_reader/private over monkey-patching, classes that receive dependencies explicitly. The standard library and gems provide the ecosystem; **RuboCop + RSpec are the review gates**.

## When to use

Use when writing, structuring, or reviewing Ruby.

## Prerequisites

- Basic familiarity with Ruby and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Reads-like-prose**: semantic names, predicate ?, mutator !, small methods
- **Immutable by default; freeze shared constants; dup before mutating.**
- **Blocks/Enumerable compose; loops are a smell.**
- **&./dig/fetch for nil-safe unwrapping; nil modeled, not hidden.**
- **Dependencies injected at construction; classes stay small and single-purpose.**
- **RuboCop + RSpec are part of "done".**
- [ ] attr_reader + private discipline; Data.define for plain data
- [ ] # frozen_string_literal: true; frozen constants; dup-before-mutate

## Focus areas

- 1. Object Model & Message Passing
- 2. Immutability & Freeze
- 3. Blocks, Enumerables & Composition
- 4. Nil Safety & Required Values
- 5. Error Handling
- 6. OOP Design & Dependency Injection
- 7. Style & Conventions
- 8. Testing
- 9. Async, Threads & Concurrency
- 10. Tooling & Project Structure

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
