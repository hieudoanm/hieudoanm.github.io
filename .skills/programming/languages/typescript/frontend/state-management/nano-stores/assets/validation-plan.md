# Nano Stores Best Practices: Validation Plan

Use this plan to verify work guided by [Nano Stores Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Granular stores = granular subscriptions** — a single mega-store re-renders everything on any change
- [ ] **Derived values via computed, not per-render computation.**
- [ ] **Hundreds of small stores are fine; deep fragmentation of one concept is not.** Name stores by domain noun (cartItems, sessionUser), not scaffolding
- [ ] **Pure model tests:**
- [ ] **action behavior tested — invariant updates, validation paths, garbage inputs.**
- [ ] **Reset stores per test** (store.set(initial)) — no cross-test leakage; deterministic

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
