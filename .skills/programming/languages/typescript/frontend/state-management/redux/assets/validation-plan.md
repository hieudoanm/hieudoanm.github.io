# Redux Best Practices: Validation Plan

Use this plan to verify work guided by [Redux Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Unit-test reducers + selectors in isolation:**
- [ ] **Thunks tested with a mocked api; reducer transitions + reject paths asserted.**
- [ ] **Store-integration tests with configureStore for effects-in-actions flows.**
- [ ] **Contract cases**: initial state, fulfilled/rejected, selector memoization behavior, unknown-action passthrough

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
