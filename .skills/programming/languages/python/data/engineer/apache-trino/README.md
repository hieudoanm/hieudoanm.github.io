# Apache Trino Best Practices

Trino is a **distributed SQL query engine for federated analytics across many connectors (Hive, Iceberg, Postgres, Kafka…)** — stateless, ANSI-ish, streaming results. Practical Trino leans on **catalog-qualified queries (catalog.schema.table), pushing work down (filters/joins at the source), correct join style (hash vs broadcast) aware of connector behavior, and bucketing on join keys for performance** — "push down,...

## When to use

Use when writing, structuring, or reviewing Trino SQL/queries.

## Core topics

- 1. Catalog & Schema Model
- 2. Query Patterns
- 3. Joins & Performance Levers
- 4. Bucketing & Table Design
- 5. Resource Management
- 6. Governance & Reproducibility

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Apache Trino Best Practices: Basic Usage](./examples/basic-usage.md)
- [Apache Trino Best Practices: 3. Joins & Performance Levers](./examples/reliability-and-edge-cases.md)
- [Apache Trino Best Practices: 1. Catalog & Schema Model](./examples/setup-and-configuration.md)
- [Apache Trino Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Apache Trino Best Practices: Decision Record](./assets/decision-record.md)
- [Apache Trino Best Practices: Starter Template](./assets/starter-template.md)
- [Apache Trino Best Practices: Validation Plan](./assets/validation-plan.md)
- [Apache Trino Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
