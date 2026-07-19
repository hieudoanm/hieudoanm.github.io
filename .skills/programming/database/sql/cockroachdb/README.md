# CockroachDB Best Practices

CockroachDB is a **distributed SQL database with Raft-based replication and serializable isolation** — not "Postgres with replicas". Best practice is distributed-systems-first thinking: distributed transactions by default with retries as normal behavior, latency-aware keys and queries, retry-safe application logic, and no single-node database assumptions.

## When to use

Use when designing schemas, writing distributed queries, planning multi-region deployments, or migrating from Postgres.

## Core topics

- 1. Core Stack & Constraints
- 2. Data Modeling & Architecture
- 3. Integrity & Consistency
- 4. Reliability & Performance

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [CockroachDB Best Practices: Basic Usage](./examples/basic-usage.md)
- [CockroachDB Best Practices: 4. Reliability & Performance](./examples/reliability-and-edge-cases.md)
- [CockroachDB Best Practices: 2. Data Modeling & Architecture](./examples/setup-and-configuration.md)
- [CockroachDB Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [CockroachDB Best Practices: Decision Record](./assets/decision-record.md)
- [CockroachDB Best Practices: Starter Template](./assets/starter-template.md)
- [CockroachDB Best Practices: Validation Plan](./assets/validation-plan.md)
- [CockroachDB Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
