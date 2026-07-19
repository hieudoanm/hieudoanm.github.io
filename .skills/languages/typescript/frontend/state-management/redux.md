---
name: redux-best-practices
description: Best practices for state management with Redux and Redux Toolkit — the predictable-state conventions for React. Use when writing, structuring, or reviewing Redux — covers slices, actions, reducers, selectors, async thunks, middleware, and testing.
---

# Redux Best Practices

Redux keeps **app state in a single store with pure reducers reading an action stream** — and Redux Toolkit (RTK) removes 95% of the boilerplate. Practical Redux leans on **`createSlice` (name, initialState, reducers) for synchronous state + `createAsyncThunk` for async — selectors (`createSelector`) derived at the read boundary**, and **`reselect` memoization for derived state**. Rules: mutate-with-Immer inside reducers, write through thunks/actions, read through selectors.

---

## 1. Slices & Reducers

- **One slice per domain feature; `createSlice` colocated:**

```ts
const sessionSlice = createSlice({
  name: "session",
  initialState: { user: null as User | null, status: "idle" },
  reducers: {
    loginStarted(state)   { state.status = "loading"; },
    loginFulfilled(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "idle";
    },
  },
});
```

- **Immer lets reducers write as if mutable — but keep them pure and deterministic** (no I/O, no `Date.now`, no new arrays via push only).
- **`reducers` vs `extraReducers`**: sync handlers in `reducers`; thunk lifecycle in `extraReducers`.

---

## 2. Actions & Payloads

- **Payloads are data, not instructions — nouns over verbs:**

```ts
loginFulfilled(state, { payload: user })  // payload = user, reducers derive state
```

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

---

## 5. RTK Query (when data is remote)

- **For server state, prefer RTK Query endpoints over hand-managed thunk refetching:**

```ts
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({ query: (id) => `/user/${id}` }),
  }),
});
```

- **Invalidation/caching handled by the library** — declare `providesTags`/`invalidatesTags`, don't hand-roll refetch orchestration.

---

## 6. Store Setup

- **`configureStore` with `getDefaultMiddleware` (Immer, thunk, serializable-check):**

```ts
export const store = configureStore({
  reducer: { session: sessionReducer, api: api.reducer },
  middleware: (gdm) => gdm().concat(api.middleware),
});
```

- **Typed hooks (`useSelector`/`useDispatch` with `AppDispatch`/`RootState`).**
- **Devtools enabled in dev; the store is the single source of truth — no hidden globals.**

---

## 7. Testing

- **Unit-test reducers + selectors in isolation:**

```ts
it("loginFulfilled sets user", () => {
  const next = sessionReducer(initial, loginFulfilled({ id: "1", name: "ada" }));
  expect(next.user?.name).toBe("ada");
});
```

- **Thunks tested with a mocked `api`; reducer transitions + reject paths asserted.**
- **Store-integration tests with `configureStore` for effects-in-actions flows.**
- **Contract cases**: initial state, fulfilled/rejected, selector memoization behavior, unknown-action passthrough.

---

## General Rules of Thumb

- **`createSlice` per feature; reducers pure (Immer), actions as data.**
- **Selectors `createSelector` — the read boundary; components read via `useSelector`.**
- **Async via `createAsyncThunk` lifecycle; server state via RTK Query when remote.**
- **One store, typed hooks, devtools; no hidden globals.**
- **Reducer/selector/thunk tests; contract + reject paths covered.**

---

## Quick-Start Checklist

- [ ] `createSlice` per feature; pure reducers via Immer; no side effects
- [ ] Actions with serializable data payloads; `extraReducers` for thunk results
- [ ] `createSelector` memoized selectors; granular `useSelector`
- [ ] `createAsyncThunk` + lifecycle states (`pending`/`fulfilled`/`rejected`)
- [ ] RTK Query for remote server state; `providesTags`/`invalidatesTags`
- [ ] `configureStore` + typed hooks; devtools; serializable-check on
- [ ] Reducer/selector/thunk tests incl. reject paths