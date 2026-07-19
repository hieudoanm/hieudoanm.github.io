# Testing Library Best Practices

Testing Library tests the **behavior users experience — roles, labels, text — not implementation details** (getByRole over class/state assertions). Practical Testing Library leans on **accessible queries (*ByRole, *ByLabelText, *ByText), userEvent for interaction (over fireEvent), screen.getByX in preference to destructured queries, and waitFor/findBy for async settling** — the "don't test implementation" rule keeps the...

## When to use

Use when writing, structuring, or reviewing Testing Library suites.

## Core topics

- 1. Queries & the User's Eye
- 2. Expect + User Events
- 3. Async & Waiting
- 4. Anti-Patterns
- 5. Rendering & Cleanup
- 6. Accessible-by-Design

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Testing Library Best Practices: Basic Usage](./examples/basic-usage.md)
- [Testing Library Best Practices: 5. Rendering & Cleanup](./examples/reliability-and-edge-cases.md)
- [Testing Library Best Practices: 2. Expect + User Events](./examples/setup-and-configuration.md)
- [Testing Library Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Testing Library Best Practices: Decision Record](./assets/decision-record.md)
- [Testing Library Best Practices: Starter Template](./assets/starter-template.md)
- [Testing Library Best Practices: Validation Plan](./assets/validation-plan.md)
- [Testing Library Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
