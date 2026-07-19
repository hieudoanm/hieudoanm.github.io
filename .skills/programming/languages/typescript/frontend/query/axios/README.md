# Axios Best Practices

Axios is the **promise-based HTTP client for browser + Node** — axios.create(instance) with interceptors, typed from TS generics. Practical Axios leans on **a single stamped instance per API (baseURL, timeout), interceptors for auth/error shaping only (not business logic), typed generic contracts, and defensive response validation** — the client is a boundary; interceptors cross it once.

## When to use

Use when writing, structuring, or reviewing Axios.

## Core topics

- 1. Instances
- 2. Interceptors
- 3. Requests & Typing
- 4. Error Handling
- 5. Abort & Cancellation
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Axios Best Practices: Basic Usage](./examples/basic-usage.md)
- [Axios Best Practices: 4. Error Handling](./examples/reliability-and-edge-cases.md)
- [Axios Best Practices: 2. Interceptors](./examples/setup-and-configuration.md)
- [Axios Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [Axios Best Practices: Decision Record](./assets/decision-record.md)
- [Axios Best Practices: Starter Template](./assets/starter-template.md)
- [Axios Best Practices: Validation Plan](./assets/validation-plan.md)
- [Axios Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
