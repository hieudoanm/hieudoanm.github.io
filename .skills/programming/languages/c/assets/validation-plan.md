# C Best Practices: Validation Plan

Use this plan to verify work guided by [C Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Test the contract at the API boundary**, not the internals: valid inputs, invalid inputs, empty inputs, error returns, boundary sizes (0, 1, max)
- [ ] **Property-style loop tests** over generated inputs (fuzz seeds) plus concrete corner cases
- [ ] **Run the suite under ASan/UBSan** — a test that passes without sanitizers proves nothing about memory safety
- [ ] **Keep tests deterministic** — no wall-clock sleeps, no ambient env dependence; seed everything
- [ ] **Table-driven cases**: inputs × expected results in an array of structs, iterated, one failure names the row

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
