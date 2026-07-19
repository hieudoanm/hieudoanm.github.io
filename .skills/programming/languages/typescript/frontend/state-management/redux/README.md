# Redux Best Practices

Redux keeps **app state in a single store with pure reducers reading an action stream** — and Redux Toolkit (RTK) removes 95% of the boilerplate. Practical Redux leans on **createSlice (name, initialState, reducers) for synchronous state + createAsyncThunk for async — selectors (createSelector) derived at the read boundary**, and **reselect memoization for derived state**. Rules: mutate-with-Immer inside reducers, write...

## When to use

Use when writing, structuring, or reviewing Redux.

## Core topics

- 1. Slices & Reducers
- 2. Actions & Payloads
- 3. Selectors
- 4. Async & Middleware
- 5. RTK Query (when data is remote)
- 6. Store Setup

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Redux Best Practices: Basic Usage](./examples/basic-usage.md)
- [Redux Best Practices: 2. Actions & Payloads](./examples/reliability-and-edge-cases.md)
- [Redux Best Practices: 6. Store Setup](./examples/setup-and-configuration.md)
- [Redux Best Practices: 7. Testing](./examples/testing-and-validation.md)

## Assets

- [Redux Best Practices: Decision Record](./assets/decision-record.md)
- [Redux Best Practices: Starter Template](./assets/starter-template.md)
- [Redux Best Practices: Validation Plan](./assets/validation-plan.md)
- [Redux Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
