# Workflow notes

Focused reference for **redux-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Actions dispatched by `useDispatch` in components/sagas — never touch the store directly.**
- **Action type inspection via devtools; serialize-able payloads only** (no DB handles/functions).

---

## 3. Selectors

- **Selectors are the read boundary — `createSelector` memoizes derived state:**

```ts
import { createSelector } from "@reduxjs/toolkit";

const selectItems = (s: RootState) => s.cart.items;
export const selectTotal = createSelector([selectItems],
  (items) => items.reduce((sum, i) => sum + i.amount, 0));
```

- **Components read via `useSelector(selectX)` — one selector per dependency, granular re-renders.**
- **No inline selectors in use** — module-level, colocated with the slice.

---

## 4. Async & Middleware

- **`createAsyncThunk` for the promise lifecycle:**

```ts
export const fetchUser = createAsyncThunk(
  "session/fetchUser",
  async (id: string, { rejectWithValue }) => {
    const res = await api.get(`/user/${id}`);
    if (!res.ok) return rejectWithValue(res.status);
    return res.json() as Promise<User>;
  }
);
```

- **`pending`/`fulfilled`/`rejected` handled in `extraReducers` — loading/error state extruded from the same lifecycle.**
- **Middleware for cross-cutting** (RTK Query, sagas); keep thunks thin and code-logic out of the store as much as possible.
