# Okta Best Practices

Okta is an enterprise identity platform known for SSO, federation, and lifecycle management. Best practice is leveraging it for **federated identity** (SAML/OIDC with enterprise IdPs), validating tokens locally, and relying on **groups as the authorization primitive** rather than custom role plumbing.

## When to use

Use when adding enterprise authentication, SSO/SAML-OIDC federation, or provisioning.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration & Token Handling
- 3. SSO, Federation & Provisioning
- 4. Security & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Okta Best Practices: Basic Usage](./examples/basic-usage.md)
- [Okta Best Practices: 4. Security & Operations](./examples/reliability-and-edge-cases.md)
- [Okta Best Practices: Quick-Start Checklist](./examples/setup-and-configuration.md)
- [Okta Best Practices: Overview](./examples/testing-and-validation.md)

## Assets

- [Okta Best Practices: Decision Record](./assets/decision-record.md)
- [Okta Best Practices: Starter Template](./assets/starter-template.md)
- [Okta Best Practices: Validation Plan](./assets/validation-plan.md)
- [Okta Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
