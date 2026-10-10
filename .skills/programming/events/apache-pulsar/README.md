# Apache Pulsar Best Practices

Pulsar is a **distributed log with cursor-based consumption** — messages are retained independently of consumption and read positions (cursors) are first-class state managed by subscribers. Best practice is tenant/namespace design for isolation and quotas, intentional subscription types (exclusive/shared/failover/key_shared), schema-based messages with safe versioning, and explicit retention/TTL management separated from...

## When to use

Use when designing tenants/namespaces/topics, choosing subscription types, configuring schemas and retention, planning geo-replication, or debugging backlog/latency.

## Core topics

- 1. Core Stack & Constraints
- 2. Topic, Subscription & Schema Design
- 3. Reliability & Delivery Guarantees
- 4. Performance, Scaling & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Apache Pulsar Best Practices: Basic Usage](./examples/basic-usage.md)
- [Apache Pulsar Best Practices: 4. Performance, Scaling & Operations](./examples/reliability-and-edge-cases.md)
- [Apache Pulsar Best Practices: 2. Topic, Subscription & Schema Design](./examples/setup-and-configuration.md)
- [Apache Pulsar Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Apache Pulsar Best Practices: Decision Record](./assets/decision-record.md)
- [Apache Pulsar Best Practices: Starter Template](./assets/starter-template.md)
- [Apache Pulsar Best Practices: Validation Plan](./assets/validation-plan.md)
- [Apache Pulsar Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
