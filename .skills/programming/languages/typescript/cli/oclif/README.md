# oclif CLI Design Best Practices

oclif (Salesforce's CLI framework) builds CLIs from **classes** with declarative args/flags, a plugin system, and framework-provided help and tab-completion. It shines for large, extensible CLIs where commands ship in plugins and every command is a Command subclass with typed flags/args. Best practice is about colocating those declarations, keeping run() thin, and following oclif's conventions for help, errors, and plugin...

## When to use

Use when creating, structuring, or reviewing an oclif CLI app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [oclif CLI Design Best Practices: Basic Usage](./examples/basic-usage.md)
- [oclif CLI Design Best Practices: 6. Errors & Exit Codes](./examples/reliability-and-edge-cases.md)
- [oclif CLI Design Best Practices: 1. Setup & Structure](./examples/setup-and-configuration.md)
- [oclif CLI Design Best Practices: 8. Testing](./examples/testing-and-validation.md)

## Assets

- [oclif CLI Design Best Practices: Decision Record](./assets/decision-record.md)
- [oclif CLI Design Best Practices: Starter Template](./assets/starter-template.md)
- [oclif CLI Design Best Practices: Validation Plan](./assets/validation-plan.md)
- [oclif CLI Design Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
