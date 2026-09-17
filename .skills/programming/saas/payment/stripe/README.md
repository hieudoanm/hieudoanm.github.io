# Stripe Best Practices

Stripe is the reference payments API. Best practice is treating every call as **idempotent and event-driven**: use idempotency keys, rely on **webhooks as the source of truth** for payment/intent/dispute state, verify signatures, keep secrets server-side, and never trust client-supplied amounts.

## When to use

Use when building checkout, subscriptions, webhooks, or payment processing.

## Core topics

- 1. Core Stack & Principles
- 2. Integration & Checkout
- 3. Webhooks & State
- 4. Data & Endpoints
- 5. Reliability & Monitoring

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Stripe Best Practices: Basic Usage](./examples/basic-usage.md)
- [Stripe Best Practices: 5. Reliability & Monitoring](./examples/reliability-and-edge-cases.md)
- [Stripe Best Practices: 3. Webhooks & State](./examples/setup-and-configuration.md)
- [Stripe Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Stripe Best Practices: Decision Record](./assets/decision-record.md)
- [Stripe Best Practices: Starter Template](./assets/starter-template.md)
- [Stripe Best Practices: Validation Plan](./assets/validation-plan.md)
- [Stripe Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
