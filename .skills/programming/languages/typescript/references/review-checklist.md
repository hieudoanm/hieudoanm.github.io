# Review checklist

Focused reference for **typescript-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 10. Async & Concurrency

- **`async`/`await` over `.then` chains for control flow** — flat reads as a sequence; keep exponential backoff/loops out of promise chains.
- **`Promise.all` for independent parallel work; sequential `for...of await` when order/dependency matters** — choosing the right one is a concurrency decision, not taste:

```ts
const [users, posts] = await Promise.all([loadUsers(), loadPosts()]);
```

- **Never `async` constructor; build then initialize** — `await factory()` or an explicit `init()` (caller decides sequencing).
- **Timeout composition** — wrap fallible external calls with `Promise.race`/`AbortController` so a hung upstream can't hang the app.
- **Treat `void asyncFn()` fire-and-forget deliberately** — errors still surface: `void task()` + `catch`/unhandled-rejection handling, not silent drops.
- **`??`/optional chaining for possibly-null async results** at the consumer, `satisfies` at producers.

---

## 11. Testing

- **Vitest (or Jest) with `describe`/`it`** — `it.each` for table-driven cases, `expect(...).toMatchObject`-style partial matching over deep literal clones.
- **Name tests as specifications** — `it("returns 404 when user not found")` reads as documentation:

```ts
describe('getUserById', () => {
  it('returns the user when found', async () => {
    await expect(getUserById(userId)).resolves.toEqual(user);
  });
  it('throws when missing', async () => {
    await expect(getUserById(missingId)).rejects.toThrow(NotFoundError);
  });
});
```

- **Type your test data with the same domain types** — use `as const`, `satisfies`, or factory helpers so test fixtures can't drift from production shapes.
- **Mock the boundaries (`vi.fn()` on HTTP/clock/storage), not the logic** — assert behaviour and outcomes.
- **`expect.objectContaining()`/`expect.any(...)` for partial or optional values** — don't assert the whole shape when only part matters.

---

## 12. General Rules of Thumb

- **Types describe data, not decorations** — one type per concept, named by what it is (`UserId`, `ApiError`), not by field lists.
- **`strict` + derfs + exhaustive `never` is the reviewer** — compile-time failure beats runtime `undefined` every time.
- **Narrow before you act; validate at the edge; trust inside** — the boundary discipline removes whole bug classes.
- **Small, focused modules** — if a file needs a table of contents, split it; keep re-export churn low.
- **`const` by default, `readonly` where callers must not own mutation, `interface` for shapes, `type` for algebra** — consistency makes the type story legible.
- **No silent fallbacks** — `??` with intent, validated defaults, real error paths; a toilet `catch {}` is a bug-in-waiting.

---

## Quick-Start Checklist

- [ ] `pnpm` + committed `pnpm-lock.yaml`
- [ ] `strict` + `exactOptionalPropertyTypes` + `noUncheckedIndexedAccess` in `tsconfig`
- [ ] `const` over `let`; `Readonly<T>`/`readonly` for un-owned mutation
- [ ] Object shapes as `interface`; unions/tuples/mapped types as `type`
- [ ] `as const` for literals; `satisfies` over `as` casts
- [ ] Branded types for domain ids/values
- [ ] Discriminated unions + exhaustive `never` guard
- [ ] `unknown` + zod/io-ts validation at every external boundary
- [ ] Arrow functions; explicit return types on exports
- [ ] `Promise.all` for independent work; timeouts on external calls
- [ ] Vitest/Jest tests named as specifications, types on fixtures
- [ ] ESLint + Prettier gating CI
