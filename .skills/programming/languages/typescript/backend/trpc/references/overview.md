# Overview

Focused reference for **tRPC-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
