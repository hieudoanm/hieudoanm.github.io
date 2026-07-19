# Implementation notes

Focused reference for **typescript-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
