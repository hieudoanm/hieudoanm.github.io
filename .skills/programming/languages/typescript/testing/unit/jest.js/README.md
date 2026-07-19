# Jest Best Practices

Jest is the **default test framework in the JS/TS ecosystem** — everything in one runner (runner, matchers, mocking, coverage, watch). Practical Jest leans on **behavioral suites (describe/it sentences), toEqual/toMatchObject deep matchers, and jest.mock/jest.spyOn for seam isolation** — with the config minimal (one jest.config.js/pkg "jest" block). Tests document and verify the contract.

## When to use

Use when writing, structuring, or reviewing Jest suites.

## Core topics

- 1. Structure & Naming
- 2. Matchers
- 3. Mocking
- 4. Fake Timers
- 5. Coverage
- 6. Config & CI

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Jest Best Practices: Basic Usage](./examples/basic-usage.md)
- [Jest Best Practices: 3. Mocking](./examples/reliability-and-edge-cases.md)
- [Jest Best Practices: 6. Config & CI](./examples/setup-and-configuration.md)
- [Jest Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Jest Best Practices: Decision Record](./assets/decision-record.md)
- [Jest Best Practices: Starter Template](./assets/starter-template.md)
- [Jest Best Practices: Validation Plan](./assets/validation-plan.md)
- [Jest Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
