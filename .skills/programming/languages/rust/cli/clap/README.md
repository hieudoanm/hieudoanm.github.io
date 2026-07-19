# clap.rs CLI Design Best Practices

clap (Command Line Argument Parser) handles parsing, help generation, and validation. Most of it is declarative via the derive API — good CLI design here is mostly about which conventions you encode into that derive structure, not fighting clap's defaults.

## When to use

Use when creating, structuring, or reviewing a clap-based CLI app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [clap.rs CLI Design Best Practices: Basic Usage](./examples/basic-usage.md)
- [clap.rs CLI Design Best Practices: 6. Error Handling](./examples/reliability-and-edge-cases.md)
- [clap.rs CLI Design Best Practices: 2. Command Structure](./examples/setup-and-configuration.md)
- [clap.rs CLI Design Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [clap.rs CLI Design Best Practices: Decision Record](./assets/decision-record.md)
- [clap.rs CLI Design Best Practices: Starter Template](./assets/starter-template.md)
- [clap.rs CLI Design Best Practices: Validation Plan](./assets/validation-plan.md)
- [clap.rs CLI Design Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
