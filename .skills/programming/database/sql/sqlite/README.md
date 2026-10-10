# SQLite Best Practices

SQLite is a file-based, embedded SQL database — single-writer by design, with journaling (rollback/WAL) governing durability and concurrency. Best practice is treating it as a **serious embedded database**: explicit schemas, foreign keys on, WAL for concurrent reads, transactional batching, and no massaging into a multi-writer server role.

## When to use

Use when designing schemas, choosing journal modes, writing queries, planning migrations, or debugging locking/concurrency.

## Core topics

- 1. Core Stack & Constraints
- 2. Data Modeling & Architecture
- 3. Integrity & Safety
- 4. Reliability & Performance

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [SQLite Best Practices: Basic Usage](./examples/basic-usage.md)
- [SQLite Best Practices: 4. Reliability & Performance](./examples/reliability-and-edge-cases.md)
- [SQLite Best Practices: 2. Data Modeling & Architecture](./examples/setup-and-configuration.md)
- [SQLite Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [SQLite Best Practices: Decision Record](./assets/decision-record.md)
- [SQLite Best Practices: Starter Template](./assets/starter-template.md)
- [SQLite Best Practices: Validation Plan](./assets/validation-plan.md)
- [SQLite Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
