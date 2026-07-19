# Review checklist

Focused reference for **tRPC-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 7. Testing

- **Test procedures against the router with a mocked context:**

```ts
function callRouter(input: unknown, ctx: AppContext) {
  return router.createCaller(ctx);
}

it("rejects unauthorized create", async () => {
  const caller = appRouter.createCaller({ user: null, db: fakeDb });
  await expect(caller.user.create({ ... })).rejects.toThrow(TRPCError);
});
```

- **`createCaller(ctx)` in unit tests — no HTTP layer.**
- **Contract cases**: valid, invalid schema, unauthorized, not-found, mutation mutation invariants.

---

## General Rules of Thumb

- **Small domain routers merged; `query`/`mutation` semantics.**
- **`zod` on every input; errors as `TRPCError` codes.**
- **Context request-built; middleware = auth/rate-limit boundary.**
- **End-to-end typing is the feature — no codegen, no drift.**
- **`createCaller` tests; contract + error codes covered.**

---

## Quick-Start Checklist

- [ ] Router per domain merged into `appRouter`; `query`/`mutation` verbs
- [ ] `zod` input/output schemas on every procedure
- [ ] Context per-request (`db`, `user`); no global mutable state
- [ ] `protectedProcedure`/`adminProcedure` middleware; TRPCError codes ranked
- [ ] Error formatter maps domain → code; no stack leaks
- [ ] Client types from `AppRouter`; `useQuery`/`useMutation` + invalidation
- [ ] `createCaller` tests covering schema/auth/not-found paths
