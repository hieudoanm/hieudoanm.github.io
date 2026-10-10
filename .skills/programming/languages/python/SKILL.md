---
name: "python-best-practices"
description: "Idiomatic Python best practices covering project structure, type hints, dataclasses, error handling, pathlib, generators, packaging, testing and tooling. Use when writing, structuring, or reviewing Python code."
tags:
  - "programming"
  - "language"
  - "python"
when_to_use: "Use when writing, structuring, or reviewing Python code."
prerequisites:
  - "Basic familiarity with Python and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "cli/click/SKILL.md"
  - "backend/django/SKILL.md"
  - "backend/fastapi/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Python Best Practices

Python is a dynamically typed language whose culture prizes readability and explicit, obvious code. The modern "best practice" stack — type hints, dataclasses, pathlib, positional-only/keyword-only parameters — exists to give a dynamic language guardrails and self-documentation that the interpreter itself doesn't enforce. This skill follows those modern conventions.

## When to use

Use when writing, structuring, or reviewing Python code.

## Prerequisites

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Explicit is better than implicit; obvious over clever** — the Zen guidelines are the style guide
- **Type hints are the new docstrings for signatures** — annotate what flows through; keep # comments for *why*, not *what*
- **Flat structure over deep nesting** — guard clauses, early returns, and comprehensions keep contexts small
- **No global mutable state** — module-level mutable singletons make tests order-dependent; inject via parameters (Context, Session, DB)
- **Idiomatic, standard-library-first, consistent formats** — ruff format removes the style debate entirely
- **Don't repeat the same logic in multiple shapes** — one canonical form, others delegate (DRY keeps name/behaviour in sync)
- [ ] pyproject.toml + src/ layout
- [ ] All public functions type-annotated, returns included

## Focus areas

- 1. Project Structure
- 2. Type Hints & Typing
- 3. Data Classes & Models
- 4. Error Handling
- 5. Paths & File I/O
- 6. Iteration & Generators
- 7. Functions & Idioms
- 8. Packaging & Tooling (Non-negotiable)
- 9. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
