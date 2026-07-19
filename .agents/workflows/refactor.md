# Workflow: Refactor

## Trigger

Existing code is restructured to improve readability, DRY, naming, or structure
without changing observable behavior.

## Goal

Improve the internal structure of the code while keeping behavior identical and
the change reviewable.

## Personas

| Phase    | Persona              |
| -------- | -------------------- |
| Planning | `solution/architect` |
| Review   | `engineer/senior`    |

## Steps

1. **Confirm the requirement** — Refactor must have a concrete reason
   (it is DRY, too long, unclear names, duplicated). Refactor-for-its-own-sake
   is out of scope.
2. **Baseline the behavior** — Ensure tests exist that encode current behavior.
   If the area is untested, add characterizing tests _before_ changing code.
3. **Make behavior-preserving changes** — One mechanical change at a time
   (rename, extract, flatten). Do not mix refactor with feature changes.
4. **Keep the refactor small** — Prefer many small commits/PRs over one large
   rewrite. If the change exceeds ~200 changed lines, split it.
5. **Run tests after each step** — Confirm the same tests pass before and after
   each mechanical change.
6. **Apply repo conventions** — Small focused files, explicit types, early
   returns, DRY. Mirror conventions in `AGENTS.md`.
7. **Verify** — Full package test suite, lint, and type checks.
8. **Report** — Summary, Reasoning, Validation, Remaining Issues, noting why the
   refactor was worth it.

## Definition of Done

- [ ] Behavior unchanged — same tests pass before and after.
- [ ] Reason for refactor stated and justified.
- [ ] No feature or fix changes mixed in.
- [ ] Tests, lint, and type checks pass.
- [ ] Duplicated patterns removed; structure matches repo conventions.
