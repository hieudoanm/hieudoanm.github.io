# Workflow notes

Focused reference for **tRPC-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
