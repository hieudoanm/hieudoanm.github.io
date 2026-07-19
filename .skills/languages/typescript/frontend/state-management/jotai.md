---
name: jotai-best-practices
description: Best practices for state management with Jotai — the primitive-atomic conventions for React state. Use when writing, structuring, or reviewing Jotai — covers atoms, derived atoms, async atoms, persistence, selectors, and testing.
---

# Jotai Best Practices

Jotai is an **atomic state library** — every piece of state is an `atom([])`/`atom(value)` with fine-grained subscriptions; components read with `useAtomValue` and write with `useSetAtom`/`useAtom`. Practical Jotai leans on **small atoms (one concept each), derived atoms for computed state (no manual syncing), async atoms for data that arrives outside React**, and **`Provider` scoping for testability and multi-store pages**. "Atom = the smallest useful unit of truth" is the discipline.

---

## 1. Atoms & Basic Usage

- **Atoms are defined outside components; read/write via hooks:**

```ts
export const countAtom = atom(0);

function Counter() {
  const count = useAtomValue(countAtom);
  const setCount = useSetAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

- **`useAtomValue` for reads, `useSetAtom` for writes, `useAtom` for both** — reading an atom subscribes; writes notify exactly the subscribers.
- **Module-level `export const` atoms — colocated with the domain** so the atom graph reads top-down.

---

## 2. Derived Atoms

- **Derived atoms compute state with no manual syncing — the source of truth is atomic:**

```ts
const listAtom = atom<Item[]>([]);
const totalAtom = atom((get) =>
  get(listAtom).reduce((sum, i) => sum + i.amount, 0)
);
const hasItemsAtom = atom((get) => get(listAtom).length > 0);
```

- **Read-derived atoms are pure functions of their inputs** — no side effects in the getter.
- **Write-derived atoms (`atom(get, set)`) to express intent mutations:**

```ts
const setAmountAtom = atom(null, (get, set, amount: number) => {
  set(totalAtom, amount);
  set(listAtom, (prev) => prev.length && prev);   // example only
});
```

---

## 3. Async Atoms

- **Async atoms `atom(async (get) => ...)` for data outside React — the value resolves, errors surface via `useAtomValue`:**

```ts
const userAtom = atom<User>(async () => {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("fail");
  return res.json();
});
```

- **Suspense + async atoms pair; handle loading/error states with the component boundary** (ErrorBoundary/`ErrorBoundary`-ish, `useAtomValue` throws on pending until resolved).
- **Async atoms keep dependencies atomic — trigger refetch by setting a linked atom (query/params).**
- **Cancellation managed by the atom layer (keys/invalidation); never unbounded concurrent fetches in render.**

---

## 4. Persistence

- **Persist via `atomWithStorage`/JSON storage adapters:**

```ts
export const themeAtom = atomWithStorage<"light" | "dark">("theme", "light");
```

- **Storage keys stable + namespaced (`app:theme`) — a persisted atom is a schema; version it.**
- **Validation on read** — storage is untrusted; cast only after a shape guard.

---

## 5. Selectors & Performance

- **Derived atoms ARE the selectors** — one re-render per subscribed atom value change:

```ts
const visibleItemsAtom = atom((get) =>
  get(itemsAtom).filter(i => i.visible)
);
```

- **Keep atoms small and derived-tree shallow** — hundreds of atoms are fine; nested object-blowup-atoms are not.
- **`useAtomValue` granular subscriptions** — don't read a parent atom to get one derived field.

---

## 6. Providers & Testability

- **`<Provider>` scopes atoms; per-test stores isolate state:**

```tsx
function TestHarness({ children }) {
  return <Provider>{children}</Provider>;
}
```

- **Default global store for real pages; providers for multi-store/segmented pages or tests.**
- **Testing derived/async atoms** — read getters with a mocked store; assert derived outputs.

---

## General Rules of Thumb

- **Atom = smallest useful unit of truth; one concept per atom.**
- **Derived atoms, not manual sync; async atoms for external data.**
- **Read with `useAtomValue`, write with `useSetAtom`, both with `useAtom`.**
- **Persisted atoms are a versioned schema; storage validated on read.**
- **`Provider` for test isolation; fine-grained subscriber re-renders.**

---

## Quick-Start Checklist

- [ ] Colocated `atom(...)` exports; `useAtomValue`/`useSetAtom` discipline
- [ ] Derived atoms for computed state; no `useEffect` sync mirrors
- [ ] Async atoms for API data; loading/error via React boundaries
- [ ] `atomWithStorage` with namespaced keys; storage-validated reads
- [ ] `Provider` scoping for tests/multi-store; small granular atoms
- [ ] Derived-selector correctness tested; no per-render fetches