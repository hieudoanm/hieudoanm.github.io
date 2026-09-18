---
name: tRPC-best-practices
description: Best practices for building TypeScript client/server APIs with tRPC — the end-to-end typed procedure framework conventions. Use when writing, structuring, or reviewing tRPC — covers routers/procedures, input schemas, middleware, context, error handling, and testing.
---

# tRPC Best Practices

tRPC gives **end-to-end typed APIs** — the same `Router` types flow from server (`@trpc/server`) to client (`@trpc/client`) without codegen. Practical tRPC leans on **small routers per domain exposing sub routers, `zod` input/output schemas on every procedure, middleware for context/auth/rate-limit**, and **`Context` built at request time (never global)**. Type theory isn't the feature — the total package (types + validation + errors) is the API contract.

---

## 1. Router Structure

- **Routers compose by namespace — small domain routers merged into a root:**

```ts
// server/
export const userRouter = router({
  list: publicProcedure.query(() => repo.list()),
  byId: publicProcedure.input(z.object({ id: z.string().uuid() }))
    .query(({ input }) => repo.byId(input.id)),
  create: protectedProcedure.input(createSchema).mutation(({ input, ctx }) =>
    svc.create({ ...input, actor: ctx.user })),
});

export const appRouter = router({ user: userRouter, health: healthRouter });
export type AppRouter = typeof appRouter;
```

- **One router per domain; the merged `appRouter` is the API root.**
- **`query` for reads, `mutation` for writes** — the verbs encode the contract for the client.
- **Route paths are the namespace** — `trpc.user.byId.query(...)` maps to the router tree.

---

## 2. Procedures & Input Schemas

- **`zod` input/output on every procedure — untrusted input dies at the boundary:**

```ts
const createSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(120),
  role: z.enum(["user", "admin"]).default("user"),
});
```

- **Output types derived from what you return** (`.input(...).output(...)` or inference) — the schema is the type, no drift.
- **`publicProcedure`/`protectedProcedure` operators on the procedure factory** — auth below is a procedure-level concern.

---

## 3. Context

- **`Context` is built per request (`createContext`) — request-scoped data only:**

```ts
export const createContext = async ({ req }: CreateContextOptions) => {
  return { db, user: await getSession(req) };
};
```

- **No global mutable state in context** — it's the `req`-shaped contract; middlewares push values.
- **`ctx` accessed via the `{ ctx, input }` destructure in handlers.**

---

## 4. Middleware & Authorization

- **Procedure middleware wraps logic; auth/rate-limit/logging as middleware:**

```ts
const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { ...ctx, userId: ctx.user.id } });
});
```

- **Common middleware (`protectedProcedure`, `adminProcedure`) = the security boundary** — attach at the procedure, not per-handler checks.
- **Rank-ordered `code`s on `TRPCError`** (`UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `BAD_REQUEST`) — clients use them.

---

## 5. Error Handling

- **`TRPCError` with a code + message is the error contract; map domain errors to codes:**

```ts
const user = await repo.byId(input.id);
if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "user missing" });
```

- **An error-formatter maps unknown → `INTERNAL_SERVER_ERROR` at the boundary** — service-layer exceptions converted to codes; never leak stack traces.

---

## 6. Client Integration

- **Strongly typed client from the same router; `QueryClient`/`react-query` for data:**

```ts
// shared client
export const trpc = createTRPCReact<AppRouter>();
```

- **Client calls are type-checked against the server router** — inputs/errors autocompleted; no URL-string drift.
- **Panache-in-framework**: `useQuery`/`useMutation` handle state; invalidate on mutations.

---

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