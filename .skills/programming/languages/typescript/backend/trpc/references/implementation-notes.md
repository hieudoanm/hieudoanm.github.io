# Implementation notes

Focused reference for **tRPC-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
