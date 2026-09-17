# Svelte Best Practices: 11. Testing

## Source guidance

This example applies the **11. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Testing Library** — test components with Testing Library:
- **Unit tests** — test reactive logic separately
- **E2E tests** — use Playwright for E2E testing

## Example

```typescript
import { render, fireEvent } from '@testing-library/svelte'
import Counter from './Counter.svelte'

test('increments counter', async () => {
  const { getByText } = render(Counter)
  const button = getByText('Increment')
  await fireEvent.click(button)
  expect(getByText('Count: 1')).toBeInTheDocument()
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for svelte-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
