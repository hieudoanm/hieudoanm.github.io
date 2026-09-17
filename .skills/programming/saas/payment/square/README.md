# Square Best Practices

Square provides commerce APIs (Payments, Subscriptions, Invoicing, Catalog). Best practice is using **access tokens scoped to a seller**, the **Payments API** with idempotency, hosted/fast checkout to avoid raw card handling, and **webhooks** as the source of payment truth.

## When to use

Use when building checkout, commerce APIs, or processing online sales.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration & Checkout
- 3. Webhooks & State
- 4. Data & Security
- 5. Reliability & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Square Best Practices: Basic Usage](./examples/basic-usage.md)
- [Square Best Practices: 5. Reliability & Operations](./examples/reliability-and-edge-cases.md)
- [Square Best Practices: Overview](./examples/setup-and-configuration.md)
- [Square Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Square Best Practices: Decision Record](./assets/decision-record.md)
- [Square Best Practices: Starter Template](./assets/starter-template.md)
- [Square Best Practices: Validation Plan](./assets/validation-plan.md)
- [Square Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
