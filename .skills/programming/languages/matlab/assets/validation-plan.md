# MATLAB Best Practices: Validation Plan

Use this plan to verify work guided by [MATLAB Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Matlab and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Profile first** — profile on/profile viewer: optimize the measured 10%, not the guessed 50%
- [ ] **The usual suspects in order** — unvectorized loops, growing arrays, in-loop I/O, recomputing static data, cell-vs-matrix indexing
- [ ] **parfor for embarrassingly parallel independent iterations** (R2016b+ parfor w/ tall); know the loop-variable slicing rules
- [ ] **Cache repeated heavy computations** (e.g., precomputed weight matrices, lookups) — but verify with the profiler before caching
- [ ] **Precomputed/simplified paths in live scripts are for analysis; the hot function file is the product.**
- [ ] **matlab.unittest framework** — testCase.assertEqual/verifyEqual contract tests:
- [ ] **Table-driven cases** — an input×expected block in a cell/table, iterated with a toggled-on row message
- [ ] **Tolerances matter** — AbsTol/RelTol on floating asserts; never exact-equality on computed floats
- [ ] **checkcode/mlint clean; run the whole suite with runtests in CI per release.**

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
