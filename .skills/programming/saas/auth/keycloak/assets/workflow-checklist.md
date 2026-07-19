# Keycloak Best Practices: Workflow Checklist

A practical run sheet for applying [Keycloak Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Realms** are isolated identity domains (analogous to tenants) — one realm per environment/business unit
- [ ] 1. Core Stack & Concepts: **Clients** define consumers (SPA, native, backend) with their own flows and scopes
- [ ] 2. Deployment & High Availability: **External database (PostgreSQL) with periodic backups** — state lives in DB, not in-pod storage
- [ ] 2. Deployment & High Availability: Run **multiple Keycloak nodes** sharing the DB for HA; use a load balancer
- [ ] 3. Realm & Client Configuration: **One realm per environment/tenant** — dev/stage/prod isolated
- [ ] 3. Realm & Client Configuration: **Clients with least privilege**: correct access type (public/confidential), minimal redirect URIs, scoped roles
- [ ] 4. Token & Integration Security: **Validate access tokens locally** (RS256 + JWKS), checking iss/aud/exp — avoid per-request calls to Keycloak
- [ ] 4. Token & Integration Security: **Cache JWKS** and handle key rotation (re-fetch on unknown kid)
- [ ] 5. Upgrades & Operations: **Upgrades are significant events** — read the release upgrade notes; breaking changes are common between majors
- [ ] 5. Upgrades & Operations: Test upgrades in a staging realm/database first

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
