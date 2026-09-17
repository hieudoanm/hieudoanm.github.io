# PostgreSQL Best Practices

PostgreSQL is a production-grade relational database built on MVCC, a planner/executor, and rich data types. Best practice is treating it as a **mission-critical system**: database-enforced integrity over app-only checks, deliberate indexes, safe (additive) schema changes, and queries tuned against real row counts and workload.

## When to use

Use when writing schemas or SQL, optimizing slow queries, choosing indexes, or planning migrations.

## Core topics

- 1. Core Stack & Constraints
- 2. Data Modeling & Architecture
- 3. Integrity & Safety
- 4. Reliability & Performance
- 5. Security

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [PostgreSQL Best Practices: Basic Usage](./examples/basic-usage.md)
- [PostgreSQL Best Practices: 4. Reliability & Performance](./examples/reliability-and-edge-cases.md)
- [PostgreSQL Best Practices: 2. Data Modeling & Architecture](./examples/setup-and-configuration.md)
- [PostgreSQL Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [PostgreSQL Best Practices: Decision Record](./assets/decision-record.md)
- [PostgreSQL Best Practices: Starter Template](./assets/starter-template.md)
- [PostgreSQL Best Practices: Validation Plan](./assets/validation-plan.md)
- [PostgreSQL Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
