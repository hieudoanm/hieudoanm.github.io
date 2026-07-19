# Dodo Payments Best Practices

Dodo Payments is a payments platform (payments + subscriptions, checkout links/SDK). Best practice is the standard payment-service contract: **server-side session/checkout**, **webhook signatures verified**, **idempotent entitlement grants**, and **no client-trusted amounts**.

## When to use

Use when accepting payments/subscriptions, handling local payment methods, or consuming webhooks.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration & Checkout
- 3. Webhooks & Entitlement
- 4. Data & Security
- 5. Reliability & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Dodo Payments Best Practices: Basic Usage](./examples/basic-usage.md)
- [Dodo Payments Best Practices: 5. Reliability & Operations](./examples/reliability-and-edge-cases.md)
- [Dodo Payments Best Practices: Overview](./examples/setup-and-configuration.md)
- [Dodo Payments Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Dodo Payments Best Practices: Decision Record](./assets/decision-record.md)
- [Dodo Payments Best Practices: Starter Template](./assets/starter-template.md)
- [Dodo Payments Best Practices: Validation Plan](./assets/validation-plan.md)
- [Dodo Payments Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
