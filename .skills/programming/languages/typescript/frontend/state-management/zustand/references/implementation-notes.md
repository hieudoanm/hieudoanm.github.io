# Implementation notes

Focused reference for **zustand-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Middleware

- **`persist` for storage-backed stores; `devtools` for Redux-devot checking; `immer` for deep updates:**

```ts
export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({ theme: "light", setTheme: (t) => set({ theme: t }) }),
    { name: "app:settings" }
  )
);
```

- **Persist keys namespaced; storage read validated** — shapes change across releases.
- **Use `devtools` during development; debugging DIP.**

---

## 5. Store Composition

- **Small stores per domain composed at the UI boundary** — select from multiple stores in the same component:

```tsx
const user = useSession((s) => s.user);
const cart = useCart((s) => s.items);
```

- **Avoid a single global mega-store** — thousands of subscriptions on one store kill granular re-renders.
- **Colocate store files with the domain (state + selector + actions in one module).**

---
