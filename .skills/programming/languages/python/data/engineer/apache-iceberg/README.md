# Apache Iceberg Best Practices

Iceberg is an **open table format for data lakes — ACID semantics, schema/propagation, snapshots of table state, and time travel on object storage.** Practical Iceberg leans on **partitioning designed around your access patterns (not imitation of old partitions), PartitionSpec set at creation (evolve-aware), snapshots as the version primitive (AS OF queries/expire), and routine maintenance...

## When to use

Use when writing, structuring, or reviewing Iceberg tables.

## Core topics

- 1. Table Creation & Specs
- 2. Writes & Snapshots
- 3. Partitioning & Data Layout
- 4. Maintenance Tasks
- 5. Time Travel & Governance
- 6. Engines & Ops

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Apache Iceberg Best Practices: Basic Usage](./examples/basic-usage.md)
- [Apache Iceberg Best Practices: 4. Maintenance Tasks](./examples/reliability-and-edge-cases.md)
- [Apache Iceberg Best Practices: 2. Writes & Snapshots](./examples/setup-and-configuration.md)
- [Apache Iceberg Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Apache Iceberg Best Practices: Decision Record](./assets/decision-record.md)
- [Apache Iceberg Best Practices: Starter Template](./assets/starter-template.md)
- [Apache Iceberg Best Practices: Validation Plan](./assets/validation-plan.md)
- [Apache Iceberg Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
