# Okta Best Practices: Validation Plan

Use this plan to verify work guided by [Okta Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Enable MFA + adaptive auth policies** for production
- [ ] **Rate-limit login endpoints**; monitor for credential-stuffing
- [ ] **Never store or log tokens**; refresh tokens server-side
- [ ] **Least-privilege scopes and groups** — no wildcard grants
- [ ] Rehearse **SSO outage handling** — validate tokens locally so reads work while the IdP is down

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
