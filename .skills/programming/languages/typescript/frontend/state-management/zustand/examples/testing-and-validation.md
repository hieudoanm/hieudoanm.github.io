# Zustand Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Store tests run without React — plain model tests:**
- **Reset per test** (`useX.setState(initial)`); async actions tested with fetch mocked.
- **Selector stability tested** (`useShallow` snapshots equivalent data → no re-render) where perf matters.

## Example

```ts
it("login sets the user", () => {
  const store = useSession.getState();
  store.login({ id: "1" });
  expect(useSession.getState().user?.id).toBe("1");
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for zustand-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
