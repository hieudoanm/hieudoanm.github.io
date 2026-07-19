# Osso Best Practices: Validation Plan

Use this plan to verify work guided by [Osso Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Self-host with its required dependencies** (Postgres, mailer, worker) on stable infrastructure
- [ ] **TLS everywhere**; restrict administrative access
- [ ] Back up the **DB (connections + metadata) and secrets**
- [ ] Pin versions; follow upgrade notes — SAML and IdP ecosystems move
- [ ] Monitor:
- [ ] **failed SAML exchanges / certificate errors**
- [ ] **IdP metadata staleness** (certificate rotation breaks login)
- [ ] **SCIM sync failures**
- [ ] **Keep metadata and certificates up to date per IdP** — expired certs = locked-out customers
- [ ] **Never log assertion payloads or session data**

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
