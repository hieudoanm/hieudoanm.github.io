# DynamoDB Best Practices

DynamoDB scales automatically but only for the **access patterns you design for**. Best practice is access-pattern-first modeling: partition key + sort key encode relationships, GSIs are sparse and deliberate (each costs money), Scan is avoided, and every item has a clear query purpose.

## When to use

Use when designing access patterns, keys and single-table schemas, building GSIs, handling hot partitions, or tuning capacity.

## Core topics

- 1. Core Stack & Constraints
- 2. Data Modeling & Access Patterns
- 3. Security, Consistency & Data Safety
- 4. Reliability, Scaling & Performance

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [DynamoDB Best Practices: Basic Usage](./examples/basic-usage.md)
- [DynamoDB Best Practices: 4. Reliability, Scaling & Performance](./examples/reliability-and-edge-cases.md)
- [DynamoDB Best Practices: 2. Data Modeling & Access Patterns](./examples/setup-and-configuration.md)
- [DynamoDB Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [DynamoDB Best Practices: Decision Record](./assets/decision-record.md)
- [DynamoDB Best Practices: Starter Template](./assets/starter-template.md)
- [DynamoDB Best Practices: Validation Plan](./assets/validation-plan.md)
- [DynamoDB Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
