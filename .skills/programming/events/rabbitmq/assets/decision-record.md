# RabbitMQ Best Practices: Decision Record

Use this record when applying [RabbitMQ Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for message-driven workflows with RabbitMQ. Use when designing exchanges and queues, implementing producers/consumers, adding retries and dead-letter queues, or debugging message loss/backlog — treats RabbitMQ as a message broker for workflows, not an event log or data store.

RabbitMQ (AMQP) is a **message-queue-oriented broker**: messages are consumed and removed, routing is explicit via exchanges and bindings, and consumers provide backpressure through prefetch. Best practice is treating it as a reliable workflow broker, not a Kafka-style log or a store — model messages as commands/tasks, use DLQs and retry queues explicitly, ack deliberately, and design consumers to be idempotent.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Messaging & Exchange Design
- [ ] 3. Reliability & Delivery Guarantees
- [ ] 4. Performance & Operations
- [ ] 5. General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
