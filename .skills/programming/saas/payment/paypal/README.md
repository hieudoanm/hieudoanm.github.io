# PayPal Best Practices

PayPal offers checkout and merchant APIs (REST v2 Orders/Catalog/Subscriptions) plus the classic flow. Best practice is using the **Orders v2 API** for modern checkout, **verifying webhooks** for order/billing state, and reconciling against the order ID rather than trusting client callbacks.

## When to use

Use when adding checkout, subscriptions/billing, or handling webhooks.

## Core topics

- 1. Core Stack & Concepts
- 2. Checkout Integration
- 3. Subscriptions & Billing
- 4. Webhooks & Verification
- 5. Security & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [PayPal Best Practices: Basic Usage](./examples/basic-usage.md)
- [PayPal Best Practices: 5. Security & Operations](./examples/reliability-and-edge-cases.md)
- [PayPal Best Practices: Quick-Start Checklist](./examples/setup-and-configuration.md)
- [PayPal Best Practices: Overview](./examples/testing-and-validation.md)

## Assets

- [PayPal Best Practices: Decision Record](./assets/decision-record.md)
- [PayPal Best Practices: Starter Template](./assets/starter-template.md)
- [PayPal Best Practices: Validation Plan](./assets/validation-plan.md)
- [PayPal Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
