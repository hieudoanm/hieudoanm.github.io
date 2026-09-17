# Overview

Focused reference for **typescript-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
