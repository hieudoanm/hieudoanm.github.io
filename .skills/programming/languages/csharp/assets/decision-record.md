# C# Best Practices: Decision Record

Use this record when applying [C# Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing C# — the language conventions for .NET code. Use when writing, structuring, or reviewing C# code — covers type design, null safety, error handling, async discipline, collections, concurrency, diagnostics, and tooling.

C# is the language of the .NET platform; modern C# (12+) is concise and expressively typed (records, pattern matching, span, target-typed new). Practical C# leans on **immutability by default, null-safety enforced at compile time, exceptions for genuine failures, and async through a cancellation token that never gets dropped**. The discipline matters more than any single feature: every API boundary is a typed contract, and analyzers (.editorconfig + dotnet build warnings) are treated as part of the contract.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Type Design & Immutability
- [ ] 2. Null Safety
- [ ] 3. Error Handling
- [ ] 4. Async Discipline
- [ ] 5. Collections & LINQ
- [ ] 6. Concurrency
- [ ] 7. Strings & Culture
- [ ] 8. Modern C# Patterns

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
