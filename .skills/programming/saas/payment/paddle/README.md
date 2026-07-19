# Paddle Best Practices

Paddle is a **merchant of record** (MoR): it handles sales tax, VAT, invoicing, and refunds for digital goods. Best practice is leaning on that model — Paddle owns tax/fiscal obligations, you consume **webhooks** for payment/fulfillment, and you keep product/catalog and prices server-side while honoring Paddle's pricing model (License pricing / Catalogs).

## When to use

Use when integrating checkout, handling merchant-of-record tax/refunds, or consuming webhooks.

## Core topics

- 1. Core Stack & Concepts
- 2. Checkout & Subscription Modeling
- 3. Webhooks & Fulfillment
- 4. Data, Revenue & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Paddle Best Practices: Basic Usage](./examples/basic-usage.md)
- [Paddle Best Practices: 4. Data, Revenue & Operations](./examples/reliability-and-edge-cases.md)
- [Paddle Best Practices: 2. Checkout & Subscription Modeling](./examples/setup-and-configuration.md)
- [Paddle Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Paddle Best Practices: Decision Record](./assets/decision-record.md)
- [Paddle Best Practices: Starter Template](./assets/starter-template.md)
- [Paddle Best Practices: Validation Plan](./assets/validation-plan.md)
- [Paddle Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
