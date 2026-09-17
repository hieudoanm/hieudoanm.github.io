# Review checklist

Focused reference for **testing-library-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
