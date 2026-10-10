# Overview

Focused reference for **nano-stores-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Nano Stores Best Practices

Nano Stores is a **tiny (sub-1KB) atomic store library** — `nanostores` gives `atom`, `map`, `computed`, and `action` primitives with a subscription model that works across React, Preact, Svelte, and Vue via bindings (`@nanostores/react`). Practical Nano Stores leans on **small named stores, `computed` for derived values, `action` for mutations with validation, and `useStore`/`useStore`-like bindings in components** — framework-agnostic state, framework-bound UI.

---

## 1. Stores: atom, map, and signals

- **One store per domain concept; `atom` for scalar, `map` for structured:**

```ts
import { atom, map } from "nanostores";

export const count = atom(0);
export const user = map<User>({ name: "", roles: [] });
```

- **`map` supports dot-paths (`user.setKey("name", "ada")`) — targeted updates keep subscribers precise.**
- **Stores are exports — colocated with the domain, imported by the UI.**

---

## 2. Reading & Reactivity

- **Subscribe via `store.subscribe(listener)`; components use the binding (`useStore`):**

```ts
// React
import { useStore } from "@nanostores/react";
const n = useStore(count);
```
