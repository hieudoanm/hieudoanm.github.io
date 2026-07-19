---
name: testing-library-best-practices
description: Best practices for React/DOM testing with Testing Library — the user-centric testing conventions. Use when writing, structuring, or reviewing Testing Library suites — covers queries, roles, userEvent/fireEvent, async, and anti-patterns.
---

# Testing Library Best Practices

Testing Library tests the **behavior users experience — roles, labels, text — not implementation details** (`getByRole` over class/state assertions). Practical Testing Library leans on **accessible queries (`*ByRole`, `*ByLabelText`, `*ByText`), `userEvent` for interaction (over `fireEvent`), `screen.getByX` in preference to destructured queries, and `waitFor`/`findBy` for async settling** — the "don't test implementation" rule keeps the suite stepping with refactors.

---

## 1. Queries & the User's Eye

- **Accessible by default: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`, `getByTestId` as last resort:**

```tsx
render(<Signup />);
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText("Email");
```

- **Prefer role/label — they map to user perception and to a11y; `testid` only where no accessible name exists.**
- **`screen` bindings over destructuring** — always reads from the same (latest) container.

---

## 2. Expect + User Events

- **Assert on visible, user-facing state:**

```tsx
await userEvent.click(screen.getByRole("button", { name: /submit/i }));
expect(await screen.findByText("Saved")).toBeInTheDocument();
expect(screen.getByText("Saved")).toBeVisible();
```

- **`userEvent` (higher fidelity: typing, click, tab, hover) over `fireEvent`** — `setup()` per test.
- **`fireEvent` only for events `userEvent` doesn't model** (e.g. `change` on the raw input when simulating a paste).

---

## 3. Async & Waiting

- **`findBy*` auto-waits (async); `waitFor` for custom conditions:**

```tsx
expect(await screen.findByRole("alert")).toHaveTextContent("Invalid email");
await waitFor(() => expect(saveSpy).toHaveBeenCalled());
```

- **Avoid `waitForElementToBeRemoved` overuse; `act`-wrapped async resolves itself:**
- **No `sleep` — polling via `findBy`/`waitFor` with a useful timeout message.**

---

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

- **Queries double as a11y lint** — something role-queryable is overridable semantics (real `<button>`, real `<label for>`).
- **Mismatch caught by the tests are the point** — the suite enforces semantic HTML.
- **Respect user flows: keyboard (`Tab`/`Enter`) with `userEvent`; skip links/aria live regions verified as users perceive them.**

---

## General Rules of Thumb

- **Query as the user (role/label/text); `testid` last.**
- **`userEvent` over `fireEvent`; assertions on visible state.**
- **Async via `findBy`/`waitFor`; no sleeps, no `act` micro-management.**
- **No internal-state probing — the DOM is the contract.**
- **Tests enforce semantic markup; providers wrapper-dried.**

---

## Quick-Start Checklist

- [ ] `getByRole`/`getByLabelText` queries; `screen` bindings
- [ ] `userEvent.setup()` interactions; visible-state assertions
- [ ] `findBy`/`waitFor` async handling; no sleeps
- [ ] No state/internals probing (`instance`, props, `aria-invalid` gouging)
- [ ] Shared `Providers` wrapper; cleanup wired
- [ ] Accessible semantics enforced by role queries