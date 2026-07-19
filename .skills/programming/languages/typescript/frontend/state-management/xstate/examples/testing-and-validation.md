# XState Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Machine tests = transition tables — each (state,event,guard) → (target, actions):**
- **Guards and actions unit-tested in isolation (pure).**
- **`createActor` test harness covers full state space — including every `error`/`RETRY` path.**

## Example

```ts
it("transitions idle → loading on FETCH", () => {
  const actor = createActor(fetchMachine);
  actor.send({ type: "FETCH" });
  expect(actor.getSnapshot().value).toBe("loading");
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for xstate-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
