# Implementation notes

Focused reference for **testing-library-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Anti-Patterns

- **Never grab internal state:**
  - no `getAttribute("aria-invalid")` when `getByRole("alert")` exists,
  - no `component.instance()`/`wrapped.find(...).prop("value")` (that's enzyme mindset),
  - no asserting a mock was called when a user-visible outcome proves it.
- **Keep tests DOM-based, not state-inspection-based** — the test's contract is the UI's promise.

---

## 5. Rendering & Cleanup

- **Setup/teardown wired once per framework** (`@testing-library/react` + jest/vitest globals; `cleanup` auto).
- **Wrapper providers (`AllTheProviders`) shared in a helper module to dry up setup:**

```tsx
const { getByRole } = render(<App />, { wrapper: Providers });
```

- **`screen.debug()`/`logRoles` for diagnosis only — not committed.**

---

## 6. Accessible-by-Design
