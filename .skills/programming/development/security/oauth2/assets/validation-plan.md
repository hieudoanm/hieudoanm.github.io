# OAuth 2.0 Best Practices: Validation Plan

Use this plan to verify work guided by [OAuth 2.0 Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **State parameter** — use state parameter to prevent CSRF:
- [ ] **PKCE** — use PKCE for public clients:
- [ ] **HTTPS only** — enforce HTTPS for all OAuth flows:
- [ ] **OAuth flow testing** — test OAuth flow:

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
