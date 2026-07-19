# Elasticsearch Best Practices

Elasticsearch is a **search and analytics engine**, not a transactional database or source of truth — data is rebuilt from primary storage. Best practice is designing mappings before indexing, separating text from keyword deliberately, avoiding mapping explosions and wildcards on high-cardinality fields, controlling shards, and using search_after over deep from+size pagination.

## When to use

Use when writing mappings, building search queries/aggregations, tuning shards, planning migrations/re-indexing, or debugging slow searches.

## Core topics

- 1. Core Stack & Constraints
- 2. Indexing & Data Modeling
- 3. Safety & Data Integrity
- 4. Performance & Reliability

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Elasticsearch Best Practices: Basic Usage](./examples/basic-usage.md)
- [Elasticsearch Best Practices: 4. Performance & Reliability](./examples/reliability-and-edge-cases.md)
- [Elasticsearch Best Practices: 2. Indexing & Data Modeling](./examples/setup-and-configuration.md)
- [Elasticsearch Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Elasticsearch Best Practices: Decision Record](./assets/decision-record.md)
- [Elasticsearch Best Practices: Starter Template](./assets/starter-template.md)
- [Elasticsearch Best Practices: Validation Plan](./assets/validation-plan.md)
- [Elasticsearch Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
