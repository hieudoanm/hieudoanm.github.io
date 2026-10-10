# Mocha Best Practices

Mocha is a **flexible test framework** — describe/it structure plus hooks, with assertions delegated to Chai/Assert (expect/should/assert). Practical Mocha leans on **a chosen assertion library up front (Chai's expect is idiomatic), hooks for shared setup, async tested explicitly (async/await or done), and explicit reporter/CI wiring** — the runner stays out of the way. Because Mocha has no built-in matchers, the assertion...

## When to use

Use when writing, structuring, or reviewing Mocha suites.

## Core topics

- 1. Structure & Hooks
- 2. Assertions
- 3. Async Tests
- 4. Spies & Stubs
- 5. Running & CI

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Mocha Best Practices: Basic Usage](./examples/basic-usage.md)
- [Mocha Best Practices: 3. Async Tests](./examples/reliability-and-edge-cases.md)
- [Mocha Best Practices: 1. Structure & Hooks](./examples/setup-and-configuration.md)
- [Mocha Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Mocha Best Practices: Decision Record](./assets/decision-record.md)
- [Mocha Best Practices: Starter Template](./assets/starter-template.md)
- [Mocha Best Practices: Validation Plan](./assets/validation-plan.md)
- [Mocha Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
