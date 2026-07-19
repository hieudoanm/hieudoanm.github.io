# ZITADEL Best Practices

ZITADEL is an identity and access management platform built on event sourcing (like Auth0/Keycloak but open source, Go-native). Best practice is using its **project/org model** for isolation, letting it own the authn user experience while your services enforce authz from verified claims, and validating tokens locally.

## When to use

Use when deploying realms/projects, configuring OIDC clients, or integrating IAM for your product.

## Core topics

- 1. Core Stack & Concepts
- 2. Isolation & Project Model
- 3. Integration & Token Handling
- 4. Security & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [ZITADEL Best Practices: Basic Usage](./examples/basic-usage.md)
- [ZITADEL Best Practices: 4. Security & Operations](./examples/reliability-and-edge-cases.md)
- [ZITADEL Best Practices: 2. Isolation & Project Model](./examples/setup-and-configuration.md)
- [ZITADEL Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [ZITADEL Best Practices: Decision Record](./assets/decision-record.md)
- [ZITADEL Best Practices: Starter Template](./assets/starter-template.md)
- [ZITADEL Best Practices: Validation Plan](./assets/validation-plan.md)
- [ZITADEL Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
