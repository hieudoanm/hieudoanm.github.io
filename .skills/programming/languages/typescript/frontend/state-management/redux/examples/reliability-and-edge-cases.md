# Redux Best Practices: 2. Actions & Payloads

## Source guidance

This example applies the **2. Actions & Payloads** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Payloads are data, not instructions — nouns over verbs:**
- **Actions dispatched by `useDispatch` in components/sagas — never touch the store directly.**
- **Action type inspection via devtools; serialize-able payloads only** (no DB handles/functions).

## Example

```ts
loginFulfilled(state, { payload: user })  // payload = user, reducers derive state
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for redux-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
