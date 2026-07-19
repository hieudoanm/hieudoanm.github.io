# Osso Best Practices

Osso is an open-source, self-hosted SAML SSO service for B2B SaaS products — the "Auth0 for enterprise on your own infra." Best practice is treating it as an internal identity gateway: SAML termination handled by a single service, IdP connections managed as data, and directory users synced via SCIM for upstream apps like Okta/Azure AD.

## When to use

Use when adding enterprise SAML login, managing IdP connections, or syncing directory users.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration Patterns
- 3. Deployment & Operations
- 4. Security

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Osso Best Practices: Basic Usage](./examples/basic-usage.md)
- [Osso Best Practices: 3. Deployment & Operations](./examples/reliability-and-edge-cases.md)
- [Osso Best Practices: Quick-Start Checklist](./examples/setup-and-configuration.md)
- [Osso Best Practices: Overview](./examples/testing-and-validation.md)

## Assets

- [Osso Best Practices: Decision Record](./assets/decision-record.md)
- [Osso Best Practices: Starter Template](./assets/starter-template.md)
- [Osso Best Practices: Validation Plan](./assets/validation-plan.md)
- [Osso Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
