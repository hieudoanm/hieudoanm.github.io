# optimistic concurrency: create, then always send _rev back on update

curl -sS -X PUT "$CB/orders" -H 'Content-Type: application/json' \ -d '{"_id":"order:1001","status":"pending","total":99.00}'

## When to use

Use when implementing, configuring, evaluating, or troubleshooting optimistic concurrency: create, then always send _rev back on update in a project.

## Core topics

- 1. Core Concepts
- 2. Access via HTTP
- 3. Views and Indexes
- 4. Conflicts and Replication
- 5. Operational Practices
- 6. Common Pitfalls

## Reference materials

- [Access via HTTP](./references/access-via-http.md)
- [1. Core Concepts](./references/core-concepts.md)
- [Overview](./references/overview.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [optimistic concurrency: create, then always send _rev back on update: Basic Usage](./examples/basic-usage.md)
- [optimistic concurrency: create, then always send _rev back on update: 5. Operational Practices](./examples/reliability-and-edge-cases.md)
- [optimistic concurrency: create, then always send _rev back on update: 2. Access via HTTP](./examples/setup-and-configuration.md)
- [optimistic concurrency: create, then always send _rev back on update: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [optimistic concurrency: create, then always send _rev back on update: Decision Record](./assets/decision-record.md)
- [optimistic concurrency: create, then always send _rev back on update: Starter Template](./assets/starter-template.md)
- [optimistic concurrency: create, then always send _rev back on update: Validation Plan](./assets/validation-plan.md)
- [optimistic concurrency: create, then always send _rev back on update: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
