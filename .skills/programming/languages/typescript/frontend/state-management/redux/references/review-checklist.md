# Review checklist

Focused reference for **redux-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
