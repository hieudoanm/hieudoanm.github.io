# Polar Best Practices

Polar is a payments platform aimed at **open-source monetization** — subscriptions, one-time purchases, donations, and benefits attached to repos/products, with the merchant-of-record handling tax. Best practice is letting Polar own checkout/tax, consuming **webhooks** for entitlement state, and treating **benefits** (license keys, repo access, Discord roles) as the product surface you grant.

## When to use

Use when selling subscriptions, one-time purchases, or handling donations/pledges.

## Core topics

- 1. Core Stack & Concepts
- 2. Checkout & Product Model
- 3. Webhooks & Entitlement
- 4. Open-Source & Community
- 5. Reliability & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Polar Best Practices: Basic Usage](./examples/basic-usage.md)
- [Polar Best Practices: 5. Reliability & Operations](./examples/reliability-and-edge-cases.md)
- [Polar Best Practices: 2. Checkout & Product Model](./examples/setup-and-configuration.md)
- [Polar Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Polar Best Practices: Decision Record](./assets/decision-record.md)
- [Polar Best Practices: Starter Template](./assets/starter-template.md)
- [Polar Best Practices: Validation Plan](./assets/validation-plan.md)
- [Polar Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
