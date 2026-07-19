---
name: typescript-best-practices
description: Idiomatic TypeScript best practices covering project structure and tooling, strict typing, interfaces vs types, immutability, branded types, discriminated unions, runtime validation, async patterns, and testing. Use when writing, structuring, or reviewing TypeScript code.
---

# TypeScript Best Practices

TypeScript is a superset of JavaScript whose value is entirely in _types that describe your data honestly_. Most of the classic TS pain — `any` sneaking back in, unions collapsing to `string`, data arriving at the boundary unvalidated — is avoided by treating the type system as the contract: lean on `strict`, model the domain with unions and branded types, validate at the edges, and let the compiler be the reviewer. Tooling-wise, `pnpm` is the package manager of choice here.

---

## 1. Project Structure & Tooling

```txt
myapp/
├── pnpm-lock.yaml
├── package.json
├── tsconfig.json
├── vitest.config.ts          # vitest (or jest + ts-jest)
├── eslint.config.js          # flat config
└── src/
    ├── index.ts
    ├── domain/
    ├── services/
    └── utils/
```

- **`pnpm` over `npm`/`yarn`** — strict, fast, and its content-addressed store makes installs deterministic and CI-friendly; commit `pnpm-lock.yaml`.
- **`src/` layout, `moduleResolution: "bundler"`** with modern tooling (Vite/Vitest/tsx); each module has one clear responsibility.
- **ESLint flat config + Prettier** in CI — format and lint are gates, not suggestions; run both on every PR.
- One public entrypoint per package (`src/index.ts` re-exporting), explicit `exports` map in `package.json`.

---

## 2. Compiler Strictness (Non-negotiable)

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noFallthroughCasesInSwitch": true,
  },
}
```

- **`strict: true` always** — `strictNullChecks` is the entire point of TypeScript; anything less lets `undefined` sneak through.
- **`exactOptionalPropertyTypes: true`** — an optional `?: string` field shouldn't accept `string | undefined`; forces honest signatures.
- **`noUncheckedIndexedAccess: true`** — array/record indexing becomes `T | undefined`, so indexing forces a narrowing check instead of hiding a runtime `undefined`.
- **`noUnusedLocals`/`noUnusedParameters`** catch dead code and blind spots; combined with `noFallthroughCasesInSwitch` the compiler is a linter with real type knowledge.
- **Upgrade derfs with the same config** — a strict base `tsconfig` extended by apps keeps every package equally safe.

---

## 3. Interfaces vs Types

- **`interface` for object shapes** — declaration merging, clearer error traces, the idiomatic default for objects:

```ts
interface User {
  readonly id: number;
  name: string;
  email: Email;
}
```

- **`type` for unions, intersections, tuples, and mapped/conditional types** — the places interfaces can't express:

```ts
type Result = { ok: true; value: User } | { ok: false; error: string };
type Id<T> = { [K in keyof T]-?: K };
```

- **Extend via `interface X extends Y`, compose via `type Z = A & B`** — interfaces win for API/object contracts; types win for algebra.
- **Don't split a shape across `interface` + `type` for the same purpose** — pick one per concept or the type story fragments.

---

## 4. Immutability & Literal Types

- **`const` over `let`; `let` only when reassigned** — treat every `let` as something to justify.
- **`as const` for literal/config shapes** — widens nothing, keeps the exact literals:

```ts
const roles = ['admin', 'user'] as const; // readonly ["admin", "user"]
type Role = (typeof roles)[number]; // "admin" | "user"
```

- **`Readonly<T>` / `Partial<T>` / `Pick<T>` / `Record<K, V>` utilities over hand-rolled variants** — and prefer `readonly` fields on interfaces/`ReadonlyArray<T>` over mutable arrays where callers shouldn't mutate:

```ts
function summarize(repos: ReadonlyArray<Repo>): void { ... }
```

- **`Object.freeze`/`satisfies` for runtime-constant objects** (see §7) — typed immutability where the checker needs it, runtime freeze where the world can touch the object.

---

## 5. Branded Types: Domain Primitives

- **Newtype/branded types prevent value mix-ups at compile time** — a `UserId` is not a `ProductId` even though both are strings:

```ts
type UserId = string & { readonly __brand: "UserId" };
type ProductId = string & { readonly __brand: "ProductId" };

function getUserById(id: UserId): User { ... }
getUserById(productId);   // ✗ type error — good
```

- **Parse/validate at the boundary to create brands** — the composition point (zod schema, factory) is where the brand is minted; elsewhere the compiler enforces it.
- **Keep the brand field `readonly` and `__brand`-named so it can't collide** — one brand per domain notion.

---

## 6. Discriminated Unions & Exhaustiveness

- **Discriminated unions over parallel optional fields** — a single `kind`/`status` discriminant makes impossible states unrepresentable:

```ts
type Event =
  | { kind: 'start' }
  | { kind: 'data'; payload: string }
  | { kind: 'end'; summary: Stats };
```

- **`switch` on the discriminant (over `if/else` chains)** — narrows automatically in every branch.
- **Exhaustive `never` guard to verify every case is handled** — the compiler promotes a missing case from "runtime bug" to "compile error":

```ts
function handle(e: Event): void {
  switch (e.kind) {
    case 'start':
      return start(e);
    case 'data':
      return receive(e.payload);
    case 'end':
      return finish(e.summary);
    default: {
      const _exhaustive: never = e; // adding a variant breaks the build
      throw new Error('unhandled event: ' + _exhaustive);
    }
  }
}
```

- **`never` for impossible branches too** — `(x: never) => ...` makes the compiler your exhaustiveness reviewer everywhere.

---

## 7. Narrowing, `satisfies` & Casts

- **Prefer narrowing over casting** — `typeof`, `in`, `instanceof`, discriminated-union checks, and user-defined type guards:

```ts
function isEmail(v: unknown): v is string {
  return typeof v === 'string' && v.includes('@');
}
if (isEmail(raw)) {
  /* raw is string here */
}
```

- **`satisfies` over `as` casts** — validates the shape _without_ widening it:

```ts
const config = {
  port: 3000,
  retries: 3,
} satisfies Record<string, number>; // port/retries stay literal-typed
```

- **`as` is a confession, not a tool** — casts bypass the checker's guarantee. When needed, narrow to a `unknown` first (`value as unknown as T`) and document why the compiler can't see it.
- **No `any.append`-drift** — `any` is contagious; prefer `unknown` + narrowing. `unknown` forces handling, `any` silences it.

---

## 8. Runtime Validation at the Boundary

- **External input (network, storage, user input) is `unknown` until validated** — `zod` (or `io-ts`) for schema-based runtime checks; never cast JSON straight to a type you trust:

```ts
import { z } from 'zod';

const UserSchema = z
  .object({
    id: z.string().brand<'UserId'>(),
    name: z.string().min(1),
  })
  .brand<'UserDto'>();

type UserDto = z.infer<typeof UserSchema>;

function fetchUser(id: UserId): Promise<UserDto> {
  return http
    .get(url, { search: { id: id.toString() } })
    .then((res) => UserSchema.parse(res.body)); // throws or returns trusted data
}
```

- **Validate once at the edge; trust the declared type inside** — the schema is the composition point for brands (§5) and the single source of truth for external shapes.
- **Fail fast with validation errors** (`parse`, not `parseLike`safe-defaulting unless absence is a real value).
- **Keep schemas colocated with their types** — `z.infer` guarantees the type can't drift from the validator.

---

## 9. Functions & Idioms

- **Arrow functions `() => {}` over `function` declarations for callbacks and definitions** — lexical `this`, consistent in classes and modules; reserve `function` for named-hoisted legacy-consistent code.
- **Explicit return types on exported functions** — the signature is the contract; the compiler checks the body guarantees it.
- **Parameters: keyword-style options via a single object + destructuring** over positional flag soup:

```ts
export async function saveUser(opts: {
  id: UserId;
  force?: boolean;
  ttl?: number;
}): Promise<void>;
```

- **Default parameters over `|| fallback`** for optionals — typed defaults, no falsy surprises; use `??` only for `null`/`undefined`.
- **Generics with constraints, `infer` for conditional helpers** — name constraints (`T extends string`) so errors are readable.
- **Explicit error types**: prefer `Result`-style unions (`{ ok: true; value } | { ok: false; error }`) for recoverable failures and typed errors over throwing bare `Error("...")`.

---

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
