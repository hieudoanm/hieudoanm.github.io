# Clikt Best Practices

Clikt turns a command-line interface into a tree of Kotlin classes: each command is a CliktCommand subclass that declares its own parameters and does its work in run(). Best practice here is **one class per command, parameters as delegated properties, parsing separated from side effects, and errors as typed values** — so the same command object can be constructed in a test with a fake side-effect sink and asserted without...

## When to use

Use when writing, structuring, validating, or testing a Clikt CLI.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Clikt Best Practices: Basic Usage](./examples/basic-usage.md)
- [Clikt Best Practices: 4. Validation & Error Handling](./examples/reliability-and-edge-cases.md)
- [Clikt Best Practices: 1. Core Stack & Gradle Setup](./examples/setup-and-configuration.md)
- [Clikt Best Practices: 9. Testing](./examples/testing-and-validation.md)

## Assets

- [Clikt Best Practices: Decision Record](./assets/decision-record.md)
- [Clikt Best Practices: Starter Template](./assets/starter-template.md)
- [Clikt Best Practices: Validation Plan](./assets/validation-plan.md)
- [Clikt Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
