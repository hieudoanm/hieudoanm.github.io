# Workflow notes

Focused reference for **typescript-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
