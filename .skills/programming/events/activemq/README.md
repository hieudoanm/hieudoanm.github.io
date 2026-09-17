# ActiveMQ Best Practices

ActiveMQ (Classic or Artemis) is **message-oriented middleware** implementing JMS: messages are consumed, acknowledged, and removed. Best practice is JMS-first design — choose Queue vs Topic explicitly, prefer destination-level routing over selectors, acknowledge deliberately, use transactions for at-least-once + idempotency, and configure redelivery/DLQ as explicit design.

## When to use

Use when designing queues/topics, choosing acknowledgement modes, configuring redelivery and DLQs, transactions, or tuning broker operations.

## Core topics

- 1. Core Stack & Constraints
- 2. Messaging Models & Destination Design
- 3. Reliability, Transactions & Delivery Semantics
- 4. Performance & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [ActiveMQ Best Practices: Basic Usage](./examples/basic-usage.md)
- [ActiveMQ Best Practices: 4. Performance & Operations](./examples/reliability-and-edge-cases.md)
- [ActiveMQ Best Practices: 2. Messaging Models & Destination Design](./examples/setup-and-configuration.md)
- [ActiveMQ Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [ActiveMQ Best Practices: Decision Record](./assets/decision-record.md)
- [ActiveMQ Best Practices: Starter Template](./assets/starter-template.md)
- [ActiveMQ Best Practices: Validation Plan](./assets/validation-plan.md)
- [ActiveMQ Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
