---
name: zustand-best-practices
description: Best practices for state management with Zustand — the minimal hook-store conventions for React. Use when writing, structuring, or reviewing Zustand — covers stores, selectors, actions, middleware (persist/devtools/immer), and testing.
---

# Zustand Best Practices

Zustand is a **minimal hook-based store** — a `create()` store with `set`/`get` returns a hook (`useCountStore`) where **selectors (`(s) => s.count`) drive granular re-renders**. Practical Zustand leans on **small stores per domain, selector functions over whole-store reads, actions as plain functions (no strict reducers)**, and **middleware (`persist`, `devtools`, `immer`) only where the feature is genuinely used**. The knobs are few — the discipline is in the selector and state shape.

---

## 1. Creating a Store

- **`create<T>()(...)` with an explicit state type; actions live in the store:**

```ts
import { create } from "zustand";

interface SessionState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useSession = create<SessionState>()((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

- **State = data fields; actions = functions that `set`** — one store per domain concern.
- **`set` outside a hook (outside of components) works fine** — the store is plain JS.

---

## 2. Selectors & Re-renders

- **`useStore((s) => s.user)` selects exactly the field; avoid whole-store reads:**

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

## 6. Testing

- **Store tests run without React — plain model tests:**

```ts
it("login sets the user", () => {
  const store = useSession.getState();
  store.login({ id: "1" });
  expect(useSession.getState().user?.id).toBe("1");
});
```

- **Reset per test** (`useX.setState(initial)`); async actions tested with fetch mocked.
- **Selector stability tested** (`useShallow` snapshots equivalent data → no re-render) where perf matters.

---

## General Rules of Thumb

- **Store per domain; functions + data, no reducers needed.**
- **Selectors control re-renders — granular reads, `useShallow` for objects.**
- **Async inside actions (`set` transitions documented).**
- **Middleware only when the feature is used; persist validated.**
- **Plain-store model tests; per-test resets.**

---

## Quick-Start Checklist

- [ ] `create<T>` stores per domain; actions defined with state
- [ ] Selector-based reads (`(s) => s.field`); `useShallow` for object snapshots
- [ ] Async actions with state transitions; `get` used sparingly
- [ ] `persist`/`devtools`/`immer` middleware intentional; storage validated
- [ ] No mega-store; composition at the UI boundary
- [ ] Model tests for actions; per-test resets; mocked async