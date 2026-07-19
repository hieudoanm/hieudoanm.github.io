# Next.js Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Playwright** for E2E testing:
- **Jest + React Testing Library** for component testing:

## Example

```tsx
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Home/)
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for nextjs-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
