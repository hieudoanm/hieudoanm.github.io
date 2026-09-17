# PHP Best Practices: Decision Record

Use this record when applying [PHP Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing PHP — the language conventions for modern PHP 8 web applications and CLIs. Use when writing, structuring, or reviewing PHP — covers strict types, null safety, error handling, OOP design, PSR conventions, security, and tooling.

Modern PHP (8.x) is a mature, typed language — not the "fast but scary" era of PHP 4. Practical PHP leans on **strict types declared at every file boundary (declare(strict_types=1)), typed properties and parameters, first-class exceptions with narrow catches**, and **PSR-12 style as a CI-enforced convention**. Composer is the dependency ecosystem, and static analysis (phpstan/psalm) is the review gate.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Php and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Strict Types & Type Safety
- [ ] 2. Null Safety & Defaults
- [ ] 3. Error Handling
- [ ] 4. Classes, Inheritance & Design
- [ ] 5. PSR Conventions
- [ ] 6. Security
- [ ] 7. Composer & Dependencies
- [ ] 8. Tooling & Static Analysis

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
