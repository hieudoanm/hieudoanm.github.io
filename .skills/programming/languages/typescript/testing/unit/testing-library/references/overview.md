# Overview

Focused reference for **testing-library-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
