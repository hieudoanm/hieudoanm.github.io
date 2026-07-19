# Workflow notes

Focused reference for **jotai-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
