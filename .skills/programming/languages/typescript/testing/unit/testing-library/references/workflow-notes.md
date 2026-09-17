# Workflow notes

Focused reference for **testing-library-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
