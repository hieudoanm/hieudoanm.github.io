# Go Best Practices: Validation Plan

Use this plan to verify work guided by [Go Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Table-driven tests** are the idiomatic default for anything with multiple input/output cases:
- [ ] Test files live next to the code (foo.go → foo_test.go), same package (white-box) unless testing only the public API (package foo_test, black-box) — use black-box for library packages to catch API usability issues
- [ ] Use t.Helper() in test helper functions so failures report the caller's line number
- [ ] Use testify/assert sparingly — plain if got != want { t.Errorf(...) } is often clearer and is what most of the standard library itself uses

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
