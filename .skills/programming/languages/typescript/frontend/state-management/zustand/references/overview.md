# Overview

Focused reference for **zustand-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
