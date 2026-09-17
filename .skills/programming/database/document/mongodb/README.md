# MongoDB Best Practices

MongoDB is a document database whose performance hinges on **schema design**, not SQL-style normalization. Best practice is designing documents around **query patterns**: embed for one-to-few, reference for fan-outs, index deliberately, never scan collections, and plan shard keys before scaling.

## When to use

Use when modeling documents, choosing embed vs reference, designing indexes, building aggregation pipelines, or preparing for scale.

## Core topics

- 1. Core Stack & Constraints
- 2. Data Modeling & Architecture
- 3. Security & Data Integrity
- 4. Reliability & Performance

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [MongoDB Best Practices: Basic Usage](./examples/basic-usage.md)
- [MongoDB Best Practices: 4. Reliability & Performance](./examples/reliability-and-edge-cases.md)
- [MongoDB Best Practices: 2. Data Modeling & Architecture](./examples/setup-and-configuration.md)
- [MongoDB Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [MongoDB Best Practices: Decision Record](./assets/decision-record.md)
- [MongoDB Best Practices: Starter Template](./assets/starter-template.md)
- [MongoDB Best Practices: Validation Plan](./assets/validation-plan.md)
- [MongoDB Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
