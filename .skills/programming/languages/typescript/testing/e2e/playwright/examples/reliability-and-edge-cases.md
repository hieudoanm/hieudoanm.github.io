# Playwright Best Practices: 2. Assertions & Auto-Waiting

## Source guidance

This example applies the **2. Assertions & Auto-Waiting** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Assertions auto-retry — never `waitForTimeout`:**
- **`expect` (matchers: `toBeVisible`, `toHaveText`, `toBeEnabled`, `toHaveValue`, `toHaveURL`)** describe user-visible state.
- **`page.waitForResponse`/`waitForRequest` for network-gated flows; `Promise.all` for click + wait:**
- **Timeouts configured (`timeout` in `test.use`) generously; assertions own precision, not sleeps.**

## Example

```ts
await expect(page.getByText("Saved")).toBeVisible();   // retries up to timeout
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for playwright-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
