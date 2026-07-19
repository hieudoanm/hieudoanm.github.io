# Overview

Focused reference for **jotai-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
