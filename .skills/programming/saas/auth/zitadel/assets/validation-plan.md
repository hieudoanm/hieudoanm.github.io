# ZITADEL Best Practices: Validation Plan

Use this plan to verify work guided by [ZITADEL Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Enable MFA and passwordless** (passkeys) per policy; enforce for admins
- [ ] **Brute-force protection and lockout policies** configured
- [ ] Secure the **admin (console/API)** surface; least-privilege machine users
- [ ] **Backups and HA** are part of operations — event-sourced store still needs consistent backups
- [ ] Monitor:
- [ ] **login failures/lockouts**
- [ ] **JWKS/key rotation errors**
- [ ] **token validation failures falling back to network**
- [ ] Keep **instances and orgs** cleanly separated to match your tenancy model

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
