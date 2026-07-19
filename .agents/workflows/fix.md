# Workflow: Fix

## Trigger

A bug, failing test, or unexpected behavior is reported or discovered.

## Goal

Resolve the defect at its root cause with a regression test, without
side-effect fixes or unexamined behavior changes.

## Personas

| Phase     | Persona                       |
| --------- | ----------------------------- |
| Triage    | `product/product-owner`       |
| Diagnosis | `engineer/senior`             |
| Verify    | `quality/sdet` (when present) |

## Steps

1. **Reproduce** — Write down the exact steps, inputs, and expected vs. actual
   outcome. Never skip straight to a fix you cannot reproduce.
2. **Isolate** — Reduce the failure to the smallest surface: which function,
   contract, or boundary returns the wrong result. Read the relevant
   `AGENTS.md` and existing tests.
3. **Find the root cause** — Explain _why_ the current code produces the wrong
   outcome. If you cannot state the root cause, you are not done.
4. **Write a failing regression test** — Name it as a specification
   (`returns 400 when amount is negative`). The test must fail before the fix
   and pass after.
5. **Fix the smallest thing** — Change behavior at the root cause only. Do not
   fix unrelated code discovered along the way; log it as follow-up.
6. **Verify** — Run the full package test suite, lint, and type checks. Confirm
   no existing behavior regressed.
7. **Review the diff** — Ensure the change is surgical and the test would fail
   on the old code.
8. **Report** — Summary, Root cause, Validation, Remaining Issues.

## Definition of Done

- [ ] Bug reproduced and root cause stated explicitly.
- [ ] Regression test added that fails without the fix.
- [ ] No unrelated changes introduced.
- [ ] Tests, lint, and type checks pass.
- [ ] Behavior change is intentional and documented when non-obvious.
