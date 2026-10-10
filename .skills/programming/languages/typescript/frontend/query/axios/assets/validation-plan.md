# Axios Best Practices: Validation Plan

Use this plan to verify work guided by [Axios Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Mock via axios-mock-adapter or intercept the adapter; assert instance-level behavior:**
- [ ] **Test interceptors in isolation (401 path, token attach); response-validation unit tests.**
- [ ] **vi.mock("axios") for full-mock when adapter too heavy — keep seams typed.**

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
