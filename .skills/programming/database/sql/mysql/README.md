# MySQL Best Practices

MySQL is a client/server RDBMS whose behavior depends heavily on storage engine, isolation level, and locking. Best practice is respecting it as **critical infrastructure**: InnoDB by default, always-on primary keys, explicit transactions, deliberate indexes, versioned migrations, and observability over cargo-cult tuning.

## When to use

Use when writing schemas, optimizing slow queries, reviewing indexes, planning migrations, or debugging locks/deadlocks.

## Core topics

- 1. Core Stack & Constraints
- 2. Data Modeling & Architecture
- 3. Integrity, Security & Safety
- 4. Reliability, Performance & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [MySQL Best Practices: Basic Usage](./examples/basic-usage.md)
- [MySQL Best Practices: 4. Reliability, Performance & Operations](./examples/reliability-and-edge-cases.md)
- [MySQL Best Practices: 2. Data Modeling & Architecture](./examples/setup-and-configuration.md)
- [MySQL Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [MySQL Best Practices: Decision Record](./assets/decision-record.md)
- [MySQL Best Practices: Starter Template](./assets/starter-template.md)
- [MySQL Best Practices: Validation Plan](./assets/validation-plan.md)
- [MySQL Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
