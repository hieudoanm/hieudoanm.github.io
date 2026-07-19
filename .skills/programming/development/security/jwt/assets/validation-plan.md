# JWT Best Practices: Validation Plan

Use this plan to verify work guided by [JWT Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Token validation** — validate JWT tokens:
- [ ] **Asymmetric validation** — validate with public key:
- [ ] **Claim validation** — validate specific claims:
- [ ] **Strong algorithms** — use strong signing algorithms:
- [ ] **Short expiration** — use short expiration times:
- [ ] **Token revocation** — implement token revocation:
- [ ] **Token generation testing** — test token generation:
- [ ] **Token validation testing** — test token validation:

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
