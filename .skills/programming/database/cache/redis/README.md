# Redis Best Practices

Redis is a **data structure server** — Strings, Hashes, Lists, Sets, ZSets, Streams — not a magical cache. Best practice is deliberate usage: namespaced keys with clear ownership, explicit TTLs, bounded structures, correct structure per access pattern, and treating Redis as **ephemeral unless persistence is explicitly required**.

## When to use

Use when designing caching strategies, modeling keys/data structures, building rate limits, queues, or pub/sub, or debugging memory/performance.

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

- [Redis Best Practices: Basic Usage](./examples/basic-usage.md)
- [Redis Best Practices: 4. Reliability & Performance](./examples/reliability-and-edge-cases.md)
- [Redis Best Practices: 2. Architecture & Design](./examples/setup-and-configuration.md)
- [Redis Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Redis Best Practices: Decision Record](./assets/decision-record.md)
- [Redis Best Practices: Starter Template](./assets/starter-template.md)
- [Redis Best Practices: Validation Plan](./assets/validation-plan.md)
- [Redis Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
