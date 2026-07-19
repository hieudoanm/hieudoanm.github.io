# Redux Best Practices: Decision Record

Use this record when applying [Redux Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for state management with Redux and Redux Toolkit — the predictable-state conventions for React. Use when writing, structuring, or reviewing Redux — covers slices, actions, reducers, selectors, async thunks, middleware, and testing.

Redux keeps **app state in a single store with pure reducers reading an action stream** — and Redux Toolkit (RTK) removes 95% of the boilerplate. Practical Redux leans on **createSlice (name, initialState, reducers) for synchronous state + createAsyncThunk for async — selectors (createSelector) derived at the read boundary**, and **reselect memoization for derived state**. Rules: mutate-with-Immer inside reducers, write through thunks/actions, read through selectors.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Slices & Reducers
- [ ] 2. Actions & Payloads
- [ ] 3. Selectors
- [ ] 4. Async & Middleware
- [ ] 5. RTK Query (when data is remote)
- [ ] 6. Store Setup
- [ ] 7. Testing
- [ ] General Rules of Thumb

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
