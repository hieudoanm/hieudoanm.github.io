# MariaDB Best Practices

MariaDB is a MySQL-compatible RDBMS that has diverged over time with its own storage engines (InnoDB, XtraDB, Aria, ColumnStore) and replication (standard primary–replica, Galera). Best practice is treating it as **independent infrastructure**: choose engines deliberately, treat MySQL compatibility as a decision rather than a guarantee, and validate schemas and topology under production-scale conditions.

## When to use

Use when designing schemas, choosing storage engines, migrating from MySQL, tuning replication/Galera, or planning backups.

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

- [MariaDB Best Practices: Basic Usage](./examples/basic-usage.md)
- [MariaDB Best Practices: 4. Reliability, Performance & Operations](./examples/reliability-and-edge-cases.md)
- [MariaDB Best Practices: 2. Data Modeling & Architecture](./examples/setup-and-configuration.md)
- [MariaDB Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [MariaDB Best Practices: Decision Record](./assets/decision-record.md)
- [MariaDB Best Practices: Starter Template](./assets/starter-template.md)
- [MariaDB Best Practices: Validation Plan](./assets/validation-plan.md)
- [MariaDB Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
