# C++ Best Practices: Validation Plan

Use this plan to verify work guided by [C++ Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Test the contract at the boundary** — valid/invalid/boundary/empty/error cases, table-driven:
- [ ] **Deterministic tests** — seeded RNGs, no wall-clock dependence, no ambient locale/env surprises
- [ ] **Run the suite under sanitizers** — a passing test without ASan is not a memory-safety pass
- [ ] **Fuzz/property-style cases** for parsers and binary boundaries; keep the seed corpus checked in
- [ ] **Name tests as behavior** — Method_WhenCondition_ThenResult or Given_X_Expect_Y

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
