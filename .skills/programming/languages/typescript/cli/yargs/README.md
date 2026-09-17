# Yargs CLI Design Best Practices

Yargs is the configuration-driven Node.js CLI framework: you declare commands, options, and validation rules as data, and it produces help, strict parsing, and completion from those declarations. Because Yargs is declarative, the main risks are letting its permissive defaults through — unflagged args, loose coercion, unvalidated input — so best practice starts with .strict() and the discipline of describing every option's...

## When to use

Use when creating, structuring, or reviewing a Yargs CLI app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Yargs CLI Design Best Practices: Basic Usage](./examples/basic-usage.md)
- [Yargs CLI Design Best Practices: 4. Options & Positionals](./examples/reliability-and-edge-cases.md)
- [Yargs CLI Design Best Practices: 2. Command Structure](./examples/setup-and-configuration.md)
- [Yargs CLI Design Best Practices: 9. Testing](./examples/testing-and-validation.md)

## Assets

- [Yargs CLI Design Best Practices: Decision Record](./assets/decision-record.md)
- [Yargs CLI Design Best Practices: Starter Template](./assets/starter-template.md)
- [Yargs CLI Design Best Practices: Validation Plan](./assets/validation-plan.md)
- [Yargs CLI Design Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
