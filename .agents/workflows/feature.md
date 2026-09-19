# Workflow: Feature

## Trigger

A new capability, page, endpoint, or package is requested or planned.

## Goal

Ship a small, reviewable, tested increment that satisfies a requirement without
silent scope creep or unexamined trade-offs.

## Personas

| Phase    | Persona                                 |
| -------- | --------------------------------------- |
| Analysis | `product/business-analyst`              |
| Planning | `product/product-owner`                 |
| Design   | `solution/architect`, `solution/design` |
| Build    | `engineer/senior`                       |
| Verify   | `quality/sdet` (when present)           |

## Steps

1. **Read context** — `AGENTS.md`, relevant `TREE.md` subtree, existing
   implementations, applicable architecture decisions, and related tests.
2. **Clarify the requirement** — Write acceptance criteria in
   Given/When/Then form. Confirm the business outcome before writing code.
3. **Confirm the design** — Check existing patterns first. Prefer the simplest
   solution that satisfies the requirement. Document trade-offs, not silent
   shortcuts.
4. **Write the failing test first** — Name the test as a specification
   (`returns 404 when user not found`). Cover boundary and failure paths, not
   just the happy path.
5. **Implement** — Keep functions ≤ 30 lines, files ≤ 200 lines, no new
   dependencies or patterns without a stated reason.
6. **Verify** — Run tests, lint, and type checks for the changed package.
7. **Review the diff** — Remove unnecessary changes; ensure the change is
   appropriately scoped.
8. **Report** — Summary, Reasoning, Validation, Remaining Issues.

## Definition of Done

- [ ] Requirements satisfied, criteria verified against the acceptance criteria.
- [ ] Tests encode the contract, not just the happy path.
- [ ] No unnecessary dependencies introduced.
- [ ] Tests, lint, and type checks pass.
- [ ] Documentation (`AGENTS.md`, `TREE.md`, `packages/*/docs`) updated when necessary.
