# Rails Backend Best Practices

Rails is a mature, convention-heavy application framework: convention over configuration, MVC, Active Record, and integration-tested workflow primitives like jobs, mailers, and storage. Best practice is treating Rails as **an application framework, not the domain** — controllers orchestrate HTTP, models own persistence and invariants, services/Plain-Ruby-Objects own workflows, and domain logic would survive outside Rails...

## When to use

Use when creating, structuring, or reviewing a Rails app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Rails Backend Best Practices: Basic Usage](./examples/basic-usage.md)
- [Rails Backend Best Practices: 6. Performance, Memory & Safety](./examples/reliability-and-edge-cases.md)
- [Rails Backend Best Practices: 3. Architecture & Design Rates](./examples/setup-and-configuration.md)
- [Rails Backend Best Practices: 8. Reliability, Testing & Portability](./examples/testing-and-validation.md)

## Assets

- [Rails Backend Best Practices: Decision Record](./assets/decision-record.md)
- [Rails Backend Best Practices: Starter Template](./assets/starter-template.md)
- [Rails Backend Best Practices: Validation Plan](./assets/validation-plan.md)
- [Rails Backend Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
