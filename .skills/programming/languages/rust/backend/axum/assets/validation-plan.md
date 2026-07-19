# Axum Best Practices: Validation Plan

Use this plan to verify work guided by [Axum Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Test with axum's test utilities:**
- [ ] **Use tower::ServiceExt for testing.**
- [ ] **Test with in-memory state or test database.**
- [ ] **Test both success and error paths.**

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
