# Astro Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Unit testing** — test components with Vitest:
- **E2E testing** — use Playwright for E2E testing:

## Example

```typescript
import { test, expect } from 'vitest'
import { render } from '@testing-library/vue'

test('renders card', () => {
  const { getByText } = render(Card, { props: { title: 'Test' } })
  expect(getByText('Test')).toBeInTheDocument()
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for astro-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
