# Redux Best Practices: 6. Store Setup

## Source guidance

This example applies the **6. Store Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`configureStore` with `getDefaultMiddleware` (Immer, thunk, serializable-check):**
- **Typed hooks (`useSelector`/`useDispatch` with `AppDispatch`/`RootState`).**
- **Devtools enabled in dev; the store is the single source of truth — no hidden globals.**

## Example

```ts
export const store = configureStore({
  reducer: { session: sessionReducer, api: api.reducer },
  middleware: (gdm) => gdm().concat(api.middleware),
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for redux-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
