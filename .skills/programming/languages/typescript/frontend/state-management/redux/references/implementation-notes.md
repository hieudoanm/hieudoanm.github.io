# Implementation notes

Focused reference for **redux-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
