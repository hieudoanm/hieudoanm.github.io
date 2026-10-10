# Redux Best Practices: Starter Template

A reusable starting point derived from the **6. Store Setup** section of [Redux Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
export const store = configureStore({
  reducer: { session: sessionReducer, api: api.reducer },
  middleware: (gdm) => gdm().concat(api.middleware),
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
