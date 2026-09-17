# Auth0 Best Practices

Auth0 is a hosted identity platform (OIDC/OAuth2) providing login, MFA, and user management. Best practice is treating it as a **trust boundary**: validate tokens locally (JWKS), never trust the browser, keep secrets server-side, and enable MFA and brute-force protection for production tenants.

## When to use

Use when adding authentication, configuring OIDC/OAuth2 clients, tenancy, or user management.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration & Token Handling
- 3. Security
- 4. Reliability & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Auth0 Best Practices: Basic Usage](./examples/basic-usage.md)
- [Auth0 Best Practices: 4. Reliability & Operations](./examples/reliability-and-edge-cases.md)
- [Auth0 Best Practices: 3. Security](./examples/setup-and-configuration.md)
- [Auth0 Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Auth0 Best Practices: Decision Record](./assets/decision-record.md)
- [Auth0 Best Practices: Starter Template](./assets/starter-template.md)
- [Auth0 Best Practices: Validation Plan](./assets/validation-plan.md)
- [Auth0 Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
