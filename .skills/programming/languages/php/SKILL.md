---
name: "php-best-practices"
description: "Best practices for writing PHP — the language conventions for modern PHP 8 web applications and CLIs. Use when writing, structuring, or reviewing PHP — covers strict types, null safety, error handling, OOP design, PSR conventions, security, and tooling."
tags:
  - "programming"
  - "language"
  - "php"
when_to_use: "Use when writing, structuring, or reviewing PHP."
prerequisites:
  - "Basic familiarity with Php and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "backend/laravel/SKILL.md"
  - "ide/php-storm/SKILL.md"
  - "../ruby/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# PHP Best Practices

Modern PHP (8.x) is a mature, typed language — not the "fast but scary" era of PHP 4. Practical PHP leans on **strict types declared at every file boundary (declare(strict_types=1)), typed properties and parameters, first-class exceptions with narrow catches**, and **PSR-12 style as a CI-enforced convention**. Composer is the dependency ecosystem, and static analysis (phpstan/psalm) is the review gate.

## When to use

Use when writing, structuring, or reviewing PHP.

## Prerequisites

- Basic familiarity with Php and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **declare(strict_types=1) and typed everything — the compiler is the cheapest reviewer.**
- **final by default; interfaces at seams; constructor injection.**
- **Exceptions with previous:, narrow catches, fail-fast validation.**
- **Think security at the data boundary** — validate input, escape output, parameterize SQL
- **PSR-12 + PHPStan + PHPUnit as the "done" gate.**
- **Composer lockfile and --no-dev deploy discipline.**
- [ ] declare(strict_types=1) on functional files; typed props/params/returns
- [ ] final + readonly where extension/mutation isn't wanted; interfaces at seams

## Focus areas

- 1. Strict Types & Type Safety
- 2. Null Safety & Defaults
- 3. Error Handling
- 4. Classes, Inheritance & Design
- 5. PSR Conventions
- 6. Security
- 7. Composer & Dependencies
- 8. Tooling & Static Analysis
- 9. Testing
- 10. Async & Long-Running

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
