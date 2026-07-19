# Clikt Best Practices: Validation Plan

Use this plan to verify work guided by [Clikt Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Pass an immutable config object across the boundary.** launch(ServeConfig(...)) gives the test one value to assert on instead of a pile of captured variables, and it keeps the command from knowing how the work is executed
- [ ] **Use echo for user-facing output**, not println. echo writes through the context, so test() captures it in .stdout; a bare println bypasses the harness and leaks into the real console during tests

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
