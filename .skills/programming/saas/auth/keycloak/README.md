# Keycloak Best Practices

Keycloak is an open-source, self-hosted identity and access management server supporting OIDC and SAML. Best practice is running it as a **managed platform piece**: realms for isolation, clients with least-privilege, DB-backed state for HA, close attention to upgrades, and local token validation on the application side.

## When to use

Use when deploying Keycloak, configuring realms/clients, or integrating OIDC/SAML.

## Core topics

- 1. Core Stack & Concepts
- 2. Deployment & High Availability
- 3. Realm & Client Configuration
- 4. Token & Integration Security
- 5. Upgrades & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Keycloak Best Practices: Basic Usage](./examples/basic-usage.md)
- [Keycloak Best Practices: 4. Token & Integration Security](./examples/reliability-and-edge-cases.md)
- [Keycloak Best Practices: 3. Realm & Client Configuration](./examples/setup-and-configuration.md)
- [Keycloak Best Practices: 2. Deployment & High Availability](./examples/testing-and-validation.md)

## Assets

- [Keycloak Best Practices: Decision Record](./assets/decision-record.md)
- [Keycloak Best Practices: Starter Template](./assets/starter-template.md)
- [Keycloak Best Practices: Validation Plan](./assets/validation-plan.md)
- [Keycloak Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
