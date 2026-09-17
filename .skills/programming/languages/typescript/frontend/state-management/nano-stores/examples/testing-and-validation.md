# Nano Stores Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pure model tests:**
- **`action` behavior tested — invariant updates, validation paths, garbage inputs.**
- **Reset stores per test** (`store.set(initial)`) — no cross-test leakage; deterministic.

## Example

```ts
it("total derives from count × price", () => {
  count.set(3); price.set(2);
  expect(total.get()).toBe(6);
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for nano-stores-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
