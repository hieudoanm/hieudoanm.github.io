# R Best Practices: Validation Plan

Use this plan to verify work guided by [R Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with R and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Vectorize by construction** — base R and the tidyverse operate on whole vectors; for loops copy semantics per iteration:
- [ ] **purrr for element-wise with type certainty; base apply (rows/cols) only when margins matter.**
- [ ] **Precompute/lookup** — match, dplyr::join for joins; never in-loop which/sapply scans
- [ ] **Profile before optimizing** — profvis/bench measures the real hot spot:
- [ ] **data.table only when the data genuinely exceeds dplyr's copy semantics** (10^7+ rows) — it's a different idiom with a real cost ceiling
- [ ] **testthat for functions and data contracts**:
- [ ] **Table-driven expectations** over hand-written branches:
- [ ] **Data checks are tests** — tests/testthat asserts computed totals against known hand-computed fixtures
- [ ] **Deterministic RNG** — set.seed()/withr::with_seed in any random-dependent test
- [ ] **check-pack style: run tests in CI alongside the analysis pipeline.**

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
