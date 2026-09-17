# OpenID Connect Best Practices: Validation Plan

Use this plan to verify work guided by [OpenID Connect Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **ID token structure** — ID token is a JWT with specific claims:
- [ ] **ID token validation** — validate ID token properly:
- [ ] **JWKS fetching** — fetch JSON Web Key Set:
- [ ] **Nonce validation** — always validate nonce:
- [ ] **State parameter** — use state parameter:
- [ ] **HTTPS only** — enforce HTTPS:
- [ ] **OIDC flow testing** — test OIDC flow:

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
