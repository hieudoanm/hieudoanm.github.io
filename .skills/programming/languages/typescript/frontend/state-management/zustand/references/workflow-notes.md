# Workflow notes

Focused reference for **zustand-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```tsx
function Greeting() {
  const user = useSession((s) => s.user);
  return <div>{user?.name}</div>;
}
```

- **Selectors must return stable references** — derive with `useShallow`/custom selectors to avoid re-render on equivalent snapshots:

```ts
const items = useCart(useShallow((s) => s.items));
```

- **Inline selectors in `useStore` are fine; module-level named selectors for reused shapes.**

---

## 3. Actions & Async

- **Actions as functions — synchronous mutations via `set`, async via `async/await` in the action:**

```ts
export const useUser = create<UserState>()((set) => ({
  user: null, status: "idle",
  load: async (id: string) => {
    set({ status: "loading" });
    try {
      const user = await api.fetch(id);
      set({ user, status: "ready" });
    } catch (err) {
      set({ status: "error", error: err });
    }
  },
}));
```

- **No rules against cross-store access via `get`** — but keep it readable; prefer separate stores per domain over one monolithic store.
- **`get()` for reads inside actions when needed** — the escape hatch is named, not hidden.

---
