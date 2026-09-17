# Apache Kafka Best Practices

Kafka is an **event log and streaming backbone** — immutable, append-only events retained independently of consumption, replayed freely, ordered per partition. Best practice is designing topics around business events with stable naming and versioned schemas, choosing partition keys intentionally, committing offsets deliberately, and building idempotent consumers because reprocessing and duplicates are the expected contract.

## When to use

Use when designing topics and schemas, building producers/consumers, choosing delivery semantics, debugging consumer lag, or planning streaming pipelines.

## Core topics

- 1. Core Stack & Constraints
- 2. Topic & Data Modeling
- 3. Reliability & Delivery Guarantees
- 4. Performance & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Apache Kafka Best Practices: Basic Usage](./examples/basic-usage.md)
- [Apache Kafka Best Practices: 4. Performance & Operations](./examples/reliability-and-edge-cases.md)
- [Apache Kafka Best Practices: 2. Topic & Data Modeling](./examples/setup-and-configuration.md)
- [Apache Kafka Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Apache Kafka Best Practices: Decision Record](./assets/decision-record.md)
- [Apache Kafka Best Practices: Starter Template](./assets/starter-template.md)
- [Apache Kafka Best Practices: Validation Plan](./assets/validation-plan.md)
- [Apache Kafka Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
