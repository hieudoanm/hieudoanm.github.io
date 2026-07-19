# Keycloak Best Practices: 2. Deployment & High Availability

## Scenario

A project is working on **2. deployment & high availability** for Keycloak Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **External database (PostgreSQL) with periodic backups** — state lives in DB, not in-pod storage
- Run **multiple Keycloak nodes** sharing the DB for HA; use a load balancer
- **Hostname/URL configuration** (`KC_HOSTNAME`) set explicitly for production; avoid the default `localhost`
- **Enable production mode** (`start` not `start-dev`); disable Dev mode settings
- **TLS termination** at LB or node; never expose plaintext admin over HTTP
- Plan **failover and restore** — rehearse restoring from backups

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Deployment & High Availability** section of [SKILL.md](../SKILL.md).
