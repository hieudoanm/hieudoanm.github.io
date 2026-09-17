# TypeScript Best Practices: Workflow Checklist

A practical run sheet for applying [TypeScript Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Structure & Tooling: **pnpm over npm/yarn** — strict, fast, and its content-addressed store makes installs deterministic and CI-friendly; commit pnpm-lock.yaml
- [ ] 1. Project Structure & Tooling: **src/ layout, moduleResolution: "bundler"** with modern tooling (Vite/Vitest/tsx); each module has one clear responsibility
- [ ] 2. Compiler Strictness (Non-negotiable): **strict: true always** — strictNullChecks is the entire point of TypeScript; anything less lets undefined sneak through
- [ ] 2. Compiler Strictness (Non-negotiable): **exactOptionalPropertyTypes: true** — an optional ?: string field shouldn't accept string | undefined; forces honest signatures
- [ ] 3. Interfaces vs Types: **interface for object shapes** — declaration merging, clearer error traces, the idiomatic default for objects:
- [ ] 3. Interfaces vs Types: **type for unions, intersections, tuples, and mapped/conditional types** — the places interfaces can't express:
- [ ] 4. Immutability & Literal Types: **const over let; let only when reassigned** — treat every let as something to justify
- [ ] 4. Immutability & Literal Types: **as const for literal/config shapes** — widens nothing, keeps the exact literals:
- [ ] 5. Branded Types: Domain Primitives: **Newtype/branded types prevent value mix-ups at compile time** — a UserId is not a ProductId even though both are strings:
- [ ] 5. Branded Types: Domain Primitives: **Parse/validate at the boundary to create brands** — the composition point (zod schema, factory) is where the brand is minted; elsewhere the compiler enforces it

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
