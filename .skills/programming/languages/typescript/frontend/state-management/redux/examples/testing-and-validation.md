# Redux Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Unit-test reducers + selectors in isolation:**
- **Thunks tested with a mocked `api`; reducer transitions + reject paths asserted.**
- **Store-integration tests with `configureStore` for effects-in-actions flows.**
- **Contract cases**: initial state, fulfilled/rejected, selector memoization behavior, unknown-action passthrough.

## Example

```ts
it("loginFulfilled sets user", () => {
  const next = sessionReducer(initial, loginFulfilled({ id: "1", name: "ada" }));
  expect(next.user?.name).toBe("ada");
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for redux-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
