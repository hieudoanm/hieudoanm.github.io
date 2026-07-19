# Overview

Focused reference for **redux-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
