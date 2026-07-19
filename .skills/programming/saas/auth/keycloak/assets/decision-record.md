# Keycloak Best Practices: Decision Record

Use this record when applying [Keycloak Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for running Keycloak as a self-hosted identity provider. Use when deploying Keycloak, configuring realms/clients, or integrating OIDC/SAML — covers realm isolation, token validation, high availability, and upgrades.

Keycloak is an open-source, self-hosted identity and access management server supporting OIDC and SAML. Best practice is running it as a **managed platform piece**: realms for isolation, clients with least-privilege, DB-backed state for HA, close attention to upgrades, and local token validation on the application side.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Deployment & High Availability
- [ ] 3. Realm & Client Configuration
- [ ] 4. Token & Integration Security
- [ ] 5. Upgrades & Operations
- [ ] 6. General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
