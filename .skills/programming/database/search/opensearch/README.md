# OpenSearch Best Practices

OpenSearch is a **search and analytics platform**, not a system of record. Best practice is operationally aware design: mappings before indexing, text vs keyword separated deliberately, controlled dynamic mappings, the security plugin enabled with least-privilege roles, ISM for lifecycle, and search_after over deep pagination.

## When to use

Use when writing mappings, building queries/aggregations, configuring Index State Management, tuning shards, or planning upgrades.

## Core topics

- 1. Core Stack & Constraints
- 2. Indexing & Data Modeling
- 3. Security & Governance
- 4. Performance & Reliability

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [OpenSearch Best Practices: Basic Usage](./examples/basic-usage.md)
- [OpenSearch Best Practices: 4. Performance & Reliability](./examples/reliability-and-edge-cases.md)
- [OpenSearch Best Practices: 2. Indexing & Data Modeling](./examples/setup-and-configuration.md)
- [OpenSearch Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [OpenSearch Best Practices: Decision Record](./assets/decision-record.md)
- [OpenSearch Best Practices: Starter Template](./assets/starter-template.md)
- [OpenSearch Best Practices: Validation Plan](./assets/validation-plan.md)
- [OpenSearch Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
