# Testing Library Best Practices: 2. Expect + User Events

## Source guidance

This example applies the **2. Expect + User Events** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Assert on visible, user-facing state:**
- **`userEvent` (higher fidelity: typing, click, tab, hover) over `fireEvent`** — `setup()` per test.
- **`fireEvent` only for events `userEvent` doesn't model** (e.g. `change` on the raw input when simulating a paste).

## Example

```tsx
await userEvent.click(screen.getByRole("button", { name: /submit/i }));
expect(await screen.findByText("Saved")).toBeInTheDocument();
expect(screen.getByText("Saved")).toBeVisible();
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for testing-library-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
