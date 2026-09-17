# Testing Library Best Practices: 5. Rendering & Cleanup

## Source guidance

This example applies the **5. Rendering & Cleanup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Setup/teardown wired once per framework** (`@testing-library/react` + jest/vitest globals; `cleanup` auto).
- **Wrapper providers (`AllTheProviders`) shared in a helper module to dry up setup:**
- **`screen.debug()`/`logRoles` for diagnosis only — not committed.**

## Example

```tsx
const { getByRole } = render(<App />, { wrapper: Providers });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for testing-library-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
