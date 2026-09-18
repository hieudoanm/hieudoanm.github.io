---
name: nano-stores-best-practices
description: Best practices for state management with Nano Stores — the tiny atomic-store conventions for JavaScript frameworks. Use when writing, structuring, or reviewing Nano Stores — covers atoms/maps/stores, reactivity, derived values, framework bindings, and testing.
---

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

- **`store.listen` for passive listeners; `subscribe` fires immediately with current value — know which you need.**
- **Unsubscribe in teardown** (the bindings handle it; manual subscribers must not leak).

---

## 3. Derived & Computed Stores

- **`computed` maps sources to derived values — memoized, dependency-tracked:**

```ts
export const total = computed([count, price], (c, p) => c * p);
```

- **No manual sync** — computed stores derive purely from their sources.
- **`computed` accepts async sources (`computed([p], async (p) => ...)`)** but stay pure: the value resolves externally.

---

## 4. Actions & Mutations

- **`action(store, name, fn)` wraps mutations — validation + intended writes in one place:**

```ts
export const addToCart = action(cart, "addToCart", (store, item: Item) => {
  if (!item.available) return;
  store.set([...store.get(), item]);
});
```

- **Mutations go through `action`s** — readable event-shaped updates; validation at the store boundary.
- **`map.setKey`/`map.update` for structured mutations — keep granular, avoid whole-store ripples.**

---

## 5. Persistence & Integration

- **`persist` from `@nanostores/persistent` or a small adapter** — namespaced keys, validated reads:

```ts
import { persist } from "@nanostores/persistent";
export const theme = persist("app:theme", "light", { encode: JSON.stringify, decode: JSON.parse });
```

- **Storage is untrusted** — validate parsed shapes before use.
- **`request`/`computed` for data fetching combinators** where the config is declarative.

---

## 6. Performance & Scaling

- **Granular stores = granular subscriptions** — a single mega-store re-renders everything on any change.
- **Derived values via `computed`, not per-render computation.**
- **Hundreds of small stores are fine; deep fragmentation of one concept is not.** Name stores by domain noun (`cartItems`, `sessionUser`), not scaffolding.

---

## 7. Testing

- **Pure model tests:**

```ts
it("total derives from count × price", () => {
  count.set(3); price.set(2);
  expect(total.get()).toBe(6);
});
```

- **`action` behavior tested — invariant updates, validation paths, garbage inputs.**
- **Reset stores per test** (`store.set(initial)`) — no cross-test leakage; deterministic.

---

## General Rules of Thumb

- **Atom for scalar, map for structure, computed for derived — no manual sync.**
- **Mutations via `action`, not raw `store.set` scattered.**
- **Component bindings (`useStore`) handle subscribe/unsubscribe.**
- **`persist` with namespaced, validated storage.**
- **Granular stores; per-test resets; model-layer tests.**

---

## Quick-Start Checklist

- [ ] `atom`/`map` per domain; `computed` derived values
- [ ] `action` wrappers for mutations + validation
- [ ] `useStore` bindings in components; manual `subscribe` unsubscribed
- [ ] `persist` with namespaced keys + shape validation
- [ ] Granular stores; no mega-store ripples
- [ ] Model tests with per-test resets; deterministic