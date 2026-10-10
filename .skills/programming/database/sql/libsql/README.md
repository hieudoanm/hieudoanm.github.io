# libSQL Best Practices

libSQL is **SQLite-first with replication**, not "Postgres-lite": a local embedded core plus remote URLs, primary/replica topology, and sync. Best practice is a **local-first, distributed-systems-aware** mental model — schemas must tolerate replication lag and eventual consistency, local reads are primary, and remote operations are treated as high-latency, potentially stale, and partition-prone.

## When to use

Use when designing local-first/edge-first data models, planning SQLite→libSQL migrations, or building replicated read/write tunnels.

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

- [libSQL Best Practices: Basic Usage](./examples/basic-usage.md)
- [libSQL Best Practices: 4. Reliability & Performance](./examples/reliability-and-edge-cases.md)
- [libSQL Best Practices: 2. Data Modeling & Architecture](./examples/setup-and-configuration.md)
- [libSQL Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [libSQL Best Practices: Decision Record](./assets/decision-record.md)
- [libSQL Best Practices: Starter Template](./assets/starter-template.md)
- [libSQL Best Practices: Validation Plan](./assets/validation-plan.md)
- [libSQL Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
