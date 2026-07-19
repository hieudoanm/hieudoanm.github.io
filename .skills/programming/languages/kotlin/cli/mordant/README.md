# Mordant Best Practices

Mordant is a terminal rendering and input library: it detects what the terminal can do, renders widgets to it, and — in raw mode — reads individual keypresses. Best practice here is **detect, degrade, and keep rendering pure** — probe the terminal once instead of guessing from environment variables, build frames as plain strings that are trivial to assert, and treat the terminal as a resource you must restore no matter how...

## When to use

Use when writing, structuring, or debugging a Mordant TUI.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Mordant Best Practices: Basic Usage](./examples/basic-usage.md)
- [Mordant Best Practices: 11. Common Pitfalls](./examples/reliability-and-edge-cases.md)
- [Mordant Best Practices: 1. Core Stack & Gradle Setup](./examples/setup-and-configuration.md)
- [Mordant Best Practices: 10. Testing](./examples/testing-and-validation.md)

## Assets

- [Mordant Best Practices: Decision Record](./assets/decision-record.md)
- [Mordant Best Practices: Starter Template](./assets/starter-template.md)
- [Mordant Best Practices: Validation Plan](./assets/validation-plan.md)
- [Mordant Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
