# Braintree Best Practices

Braintree is a payments gateway with a strong async-first API and owned by PayPal. Best practice is keeping the **card/sensitive data out of your server** (client token + Drop-in UI), running transaction requests server-side with idempotency, and consuming **webhooks** for state changes.

## When to use

Use when accepting cards, PayPal, and alternative methods, or adding subscriptions.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration & Transactions
- 3. Subscriptions & Recurring
- 4. Webhooks & Verification
- 5. Security & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Braintree Best Practices: Basic Usage](./examples/basic-usage.md)
- [Braintree Best Practices: 5. Security & Operations](./examples/reliability-and-edge-cases.md)
- [Braintree Best Practices: Overview](./examples/setup-and-configuration.md)
- [Braintree Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Braintree Best Practices: Decision Record](./assets/decision-record.md)
- [Braintree Best Practices: Starter Template](./assets/starter-template.md)
- [Braintree Best Practices: Validation Plan](./assets/validation-plan.md)
- [Braintree Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
