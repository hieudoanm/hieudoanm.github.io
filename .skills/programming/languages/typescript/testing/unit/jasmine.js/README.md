# Jasmine Best Practices

Jasmine is a **behavior-driven testing framework for JavaScript** — describe/it blocks with rich matchers and spyOn for fakes, no extra dependencies. Practical Jasmine leans on **sub-describe blocks per behavior, readable expect(...).toEqual(...) (avoiding toBe for objects), beforeEach for shared setup, and spies for seams** — mirroring how the object behaves, not how it computes. Tests read as sentences.

## When to use

Use when writing, structuring, or reviewing Jasmine suites.

## Core topics

- 1. Structure & Naming
- 2. Matchers
- 3. Spies & Fakes
- 4. Setup & Teardown
- 5. Async Specs
- 6. Running & CI

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Jasmine Best Practices: Basic Usage](./examples/basic-usage.md)
- [Jasmine Best Practices: 3. Spies & Fakes](./examples/reliability-and-edge-cases.md)
- [Jasmine Best Practices: 4. Setup & Teardown](./examples/setup-and-configuration.md)
- [Jasmine Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Jasmine Best Practices: Decision Record](./assets/decision-record.md)
- [Jasmine Best Practices: Starter Template](./assets/starter-template.md)
- [Jasmine Best Practices: Validation Plan](./assets/validation-plan.md)
- [Jasmine Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
