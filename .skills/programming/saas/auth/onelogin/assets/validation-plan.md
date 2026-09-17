# OneLogin Best Practices: Validation Plan

Use this plan to verify work guided by [OneLogin Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Enable MFA and adaptive/smart policies** for production
- [ ] Rate-limit **ACS/login endpoints**; monitor for credential stuffing
- [ ] Enforce **least-privilege roles**; audit admin usage in OneLogin
- [ ] **Never log assertions/tokens**; keep secrets server-side
- [ ] Rehearse **IdP outage handling** — local token validation keeps reads working
- [ ] Monitor:
- [ ] **SAML certificate expiry** (upstream rotation breaks login)
- [ ] **sync/provisioning failures**
- [ ] **failed login spikes**

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
