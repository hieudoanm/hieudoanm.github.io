# Jotai Best Practices: 6. Providers & Testability

## Source guidance

This example applies the **6. Providers & Testability** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`<Provider>` scopes atoms; per-test stores isolate state:**
- **Default global store for real pages; providers for multi-store/segmented pages or tests.**
- **Testing derived/async atoms** — read getters with a mocked store; assert derived outputs.

## Example

```tsx
function TestHarness({ children }) {
  return <Provider>{children}</Provider>;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for jotai-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
