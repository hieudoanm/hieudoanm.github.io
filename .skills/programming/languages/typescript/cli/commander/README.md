# Commander.js CLI Design Best Practices

Commander.js is the classic imperative Node.js CLI framework: you describe commands, options, and action handlers programmatically, and it produces consistent help/usage and exit behaviour for free. Good CLI design with Commander is mostly _conventions_ — command trees, stdout/stderr discipline, exit codes, and actionable errors — plus fitting your workflow into program.command(...)/.option(...)/.action(...) instead of...

## When to use

Use when creating, structuring, or reviewing a Commander CLI app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Commander.js CLI Design Best Practices: Basic Usage](./examples/basic-usage.md)
- [Commander.js CLI Design Best Practices: 7. Errors & Exit Codes](./examples/reliability-and-edge-cases.md)
- [Commander.js CLI Design Best Practices: 2. Command Structure](./examples/setup-and-configuration.md)
- [Commander.js CLI Design Best Practices: 10. Testing](./examples/testing-and-validation.md)

## Assets

- [Commander.js CLI Design Best Practices: Decision Record](./assets/decision-record.md)
- [Commander.js CLI Design Best Practices: Starter Template](./assets/starter-template.md)
- [Commander.js CLI Design Best Practices: Validation Plan](./assets/validation-plan.md)
- [Commander.js CLI Design Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
