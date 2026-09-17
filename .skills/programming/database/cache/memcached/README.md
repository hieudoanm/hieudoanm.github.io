# Memcached Best Practices

Memcached is a **distributed, in-memory, non-persistent key-value cache** — values are opaque blobs, scaling is client-managed, and data loss is acceptable by design. Best practice is **boring, stable designs**: cache-aside for hot recomputable data, short deterministic keys, small values, explicit TTLs, and graceful handling of misses and evictions.

## When to use

Use when designing cache-aside strategies, choosing keys/TTLs, tuning slab/memory usage, or deciding between Memcached and Redis.

## Core topics

- 1. Core Stack & Constraints
- 2. Architecture & Design
- 3. Security & Data Safety
- 4. Reliability & Performance

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Memcached Best Practices: Basic Usage](./examples/basic-usage.md)
- [Memcached Best Practices: 4. Reliability & Performance](./examples/reliability-and-edge-cases.md)
- [Memcached Best Practices: 2. Architecture & Design](./examples/setup-and-configuration.md)
- [Memcached Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Memcached Best Practices: Decision Record](./assets/decision-record.md)
- [Memcached Best Practices: Starter Template](./assets/starter-template.md)
- [Memcached Best Practices: Validation Plan](./assets/validation-plan.md)
- [Memcached Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
