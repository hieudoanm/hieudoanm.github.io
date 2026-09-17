# Apache Spark Best Practices

Spark is a **distributed compute engine — DataFrames/RDD executed as lazy transformations against a cluster** (transfer: wide vs narrow dependencies). Practical Spark leans on **DataFrame/Dataset APIs (optimization, not RDD), narrow transformations, partitioning/skew management, broadcast joins for small tables, and shuffle minimization** — "lazy, partitioned, minimal-shuffle" describes the discipline; the Spark UI is your...

## When to use

Use when writing, structuring, or reviewing Spark (PySpark or Scala).

## Core topics

- 1. DataFrame Discipline
- 2. Transformations & Lineage
- 3. Partitioning & Skew
- 4. Joins & Shuffle Control
- 5. Caching & Persistence
- 6. Structured Streaming

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Apache Spark Best Practices: Basic Usage](./examples/basic-usage.md)
- [Apache Spark Best Practices: 3. Partitioning & Skew](./examples/reliability-and-edge-cases.md)
- [Apache Spark Best Practices: 6. Structured Streaming](./examples/setup-and-configuration.md)
- [Apache Spark Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Apache Spark Best Practices: Decision Record](./assets/decision-record.md)
- [Apache Spark Best Practices: Starter Template](./assets/starter-template.md)
- [Apache Spark Best Practices: Validation Plan](./assets/validation-plan.md)
- [Apache Spark Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
