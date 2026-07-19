# Compose Multiplatform Best Practices

Compose replaces the widget tree with a function tree: you describe what the UI should look like for the current state, and the runtime recomposes what changed. Best practice here is **state-first, token-driven, side-effect-free composition** — hoist state out of composables, consume design tokens instead of literal values, and keep the composable body a pure function of its parameters.

## When to use

Use when writing, structuring, styling, or reviewing a Compose app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Compose Multiplatform Best Practices: Basic Usage](./examples/basic-usage.md)
- [Compose Multiplatform Best Practices: 6. Lists & Performance](./examples/reliability-and-edge-cases.md)
- [Compose Multiplatform Best Practices: 1. Core Stack & Gradle Setup](./examples/setup-and-configuration.md)
- [Compose Multiplatform Best Practices: 9. Testing](./examples/testing-and-validation.md)

## Assets

- [Compose Multiplatform Best Practices: Decision Record](./assets/decision-record.md)
- [Compose Multiplatform Best Practices: Starter Template](./assets/starter-template.md)
- [Compose Multiplatform Best Practices: Validation Plan](./assets/validation-plan.md)
- [Compose Multiplatform Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
