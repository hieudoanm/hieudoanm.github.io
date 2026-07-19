# Klarna Best Practices

Klarna offers **Checkout (v2), Payment (v3), and Pay Later** products. Best practice is session-first integration: create a **Checkout Session** server-side, the client renders the iframe, your server **captures/holds the order** after authorization, and **webhooks** tell you the final state.

## When to use

Use when offering Klarna checkout, affecting order flows with a payment SDK/v2 API, or handling webhooks.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration & Checkout
- 3. Authorization & Capture
- 4. Webhooks & Notifications
- 5. Security & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Klarna Best Practices: Basic Usage](./examples/basic-usage.md)
- [Klarna Best Practices: 5. Security & Operations](./examples/reliability-and-edge-cases.md)
- [Klarna Best Practices: Overview](./examples/setup-and-configuration.md)
- [Klarna Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Klarna Best Practices: Decision Record](./assets/decision-record.md)
- [Klarna Best Practices: Starter Template](./assets/starter-template.md)
- [Klarna Best Practices: Validation Plan](./assets/validation-plan.md)
- [Klarna Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
