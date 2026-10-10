# Keycloak Best Practices: Validation Plan

Use this plan to verify work guided by [Keycloak Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **External database (PostgreSQL) with periodic backups** — state lives in DB, not in-pod storage
- [ ] Run **multiple Keycloak nodes** sharing the DB for HA; use a load balancer
- [ ] **Hostname/URL configuration** (KC_HOSTNAME) set explicitly for production; avoid the default localhost
- [ ] **Enable production mode** (start not start-dev); disable Dev mode settings
- [ ] **TLS termination** at LB or node; never expose plaintext admin over HTTP
- [ ] Plan **failover and restore** — rehearse restoring from backups
- [ ] **Validate access tokens locally** (RS256 + JWKS), checking iss/aud/exp — avoid per-request calls to Keycloak
- [ ] **Cache JWKS** and handle key rotation (re-fetch on unknown kid)
- [ ] Use **claims** (roles, groups, aud) for authorization — don't trust client-sent headers
- [ ] **Never store or log tokens**; keep refresh tokens server-side

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
