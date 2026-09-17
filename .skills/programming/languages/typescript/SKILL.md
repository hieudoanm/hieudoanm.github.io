---
name: "typescript-best-practices"
description: "Idiomatic TypeScript best practices covering project structure and tooling, strict typing, interfaces vs types, immutability, branded types, discriminated unions, runtime validation, async patterns, and testing. Use when writing, structuring, or reviewing TypeScript code."
tags:
  - "programming"
  - "language"
  - "typescript"
when_to_use: "Use when writing, structuring, or reviewing TypeScript code."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "javascript/SKILL.md"
  - "backend/express.js/SKILL.md"
  - "runtime/node/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# TypeScript Best Practices

TypeScript is a superset of JavaScript whose value is entirely in _types that describe your data honestly_. Most of the classic TS pain — any sneaking back in, unions collapsing to string, data arriving at the boundary unvalidated — is avoided by treating the type system as the contract: lean on strict, model the domain with unions and branded types, validate at the edges, and let the compiler be the reviewer. Tooling-wise, pnpm is the package manager of choice here.

## When to use

Use when writing, structuring, or reviewing TypeScript code.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Types describe data, not decorations** — one type per concept, named by what it is (UserId, ApiError), not by field lists
- **strict + derfs + exhaustive never is the reviewer** — compile-time failure beats runtime undefined every time
- **Narrow before you act; validate at the edge; trust inside** — the boundary discipline removes whole bug classes
- **Small, focused modules** — if a file needs a table of contents, split it; keep re-export churn low
- **const by default, readonly where callers must not own mutation, interface for shapes, type for algebra** — consistency makes the type story legible
- **No silent fallbacks** — ?? with intent, validated defaults, real error paths; a toilet catch {} is a bug-in-waiting
- [ ] pnpm + committed pnpm-lock.yaml
- [ ] strict + exactOptionalPropertyTypes + noUncheckedIndexedAccess in tsconfig

## Focus areas

- 1. Project Structure & Tooling
- 2. Compiler Strictness (Non-negotiable)
- 3. Interfaces vs Types
- 4. Immutability & Literal Types
- 5. Branded Types: Domain Primitives
- 6. Discriminated Unions & Exhaustiveness
- 7. Narrowing, `satisfies` & Casts
- 8. Runtime Validation at the Boundary
- 9. Functions & Idioms
- 10. Async & Concurrency
- 11. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
