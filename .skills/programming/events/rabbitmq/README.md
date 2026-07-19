# RabbitMQ Best Practices

RabbitMQ (AMQP) is a **message-queue-oriented broker**: messages are consumed and removed, routing is explicit via exchanges and bindings, and consumers provide backpressure through prefetch. Best practice is treating it as a reliable workflow broker, not a Kafka-style log or a store — model messages as commands/tasks, use DLQs and retry queues explicitly, ack deliberately, and design consumers to be idempotent.

## When to use

Use when designing exchanges and queues, implementing producers/consumers, adding retries and dead-letter queues, or debugging message loss/backlog.

## Core topics

- 1. Core Stack & Constraints
- 2. Messaging & Exchange Design
- 3. Reliability & Delivery Guarantees
- 4. Performance & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [RabbitMQ Best Practices: Basic Usage](./examples/basic-usage.md)
- [RabbitMQ Best Practices: 4. Performance & Operations](./examples/reliability-and-edge-cases.md)
- [RabbitMQ Best Practices: 3. Reliability & Delivery Guarantees](./examples/setup-and-configuration.md)
- [RabbitMQ Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [RabbitMQ Best Practices: Decision Record](./assets/decision-record.md)
- [RabbitMQ Best Practices: Starter Template](./assets/starter-template.md)
- [RabbitMQ Best Practices: Validation Plan](./assets/validation-plan.md)
- [RabbitMQ Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
