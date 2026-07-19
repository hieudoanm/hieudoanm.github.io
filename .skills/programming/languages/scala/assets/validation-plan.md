# Scala Best Practices: Validation Plan

Use this plan to verify work guided by [Scala Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **munit/scalatest/zio-test on behavior** — table-driven cases for the contract:
- [ ] **Property tests (ScalaCheck/munit + Check)** for parsers, binary boundaries, and round-trips:
- [ ] **Fakes/IO-layered tests at effect seams** — pure functions need no mocks; test the interpreter separately
- [ ] **Deterministic** — seeded RNG, overrides for clocks, no ambient environment
- [ ] **Profile with the tools** (-Xprof/JFR/cat-nap) before optimizing; the usual suspects: allocations in hot loops, String building, boxing
- [ ] **Map/Vector over List for indexed/sized access; avoid ++ rebuilds in loops.**

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
