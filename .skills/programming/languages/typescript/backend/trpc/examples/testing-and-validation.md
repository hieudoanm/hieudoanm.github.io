# tRPC Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test procedures against the router with a mocked context:**
- **`createCaller(ctx)` in unit tests — no HTTP layer.**
- **Contract cases**: valid, invalid schema, unauthorized, not-found, mutation mutation invariants.

## Example

```ts
function callRouter(input: unknown, ctx: AppContext) {
  return router.createCaller(ctx);
}

it("rejects unauthorized create", async () => {
  const caller = appRouter.createCaller({ user: null, db: fakeDb });
  await expect(caller.user.create({ ... })).rejects.toThrow(TRPCError);
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for tRPC-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
