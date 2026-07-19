# Implementation notes

Focused reference for **jotai-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
