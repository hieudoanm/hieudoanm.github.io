# TypeScript Best Practices: Decision Record

Use this record when applying [TypeScript Best Practices](../SKILL.md) to a concrete project decision.

## Context

Idiomatic TypeScript best practices covering project structure and tooling, strict typing, interfaces vs types, immutability, branded types, discriminated unions, runtime validation, async patterns, and testing. Use when writing, structuring, or reviewing TypeScript code.

TypeScript is a superset of JavaScript whose value is entirely in _types that describe your data honestly_. Most of the classic TS pain — any sneaking back in, unions collapsing to string, data arriving at the boundary unvalidated — is avoided by treating the type system as the contract: lean on strict, model the domain with unions and branded types, validate at the edges, and let the compiler be the reviewer. Tooling-wise, pnpm is the package manager of choice here.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Project Structure & Tooling
- [ ] 2. Compiler Strictness (Non-negotiable)
- [ ] 3. Interfaces vs Types
- [ ] 4. Immutability & Literal Types
- [ ] 5. Branded Types: Domain Primitives
- [ ] 6. Discriminated Unions & Exhaustiveness
- [ ] 7. Narrowing, `satisfies` & Casts
- [ ] 8. Runtime Validation at the Boundary

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
