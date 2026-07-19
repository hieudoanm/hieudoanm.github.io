# SolidStart Best Practices: 11. Testing

## Source guidance

This example applies the **11. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Component testing** — test components with Solid Testing Library:
- **E2E testing** — use Playwright for E2E testing:

## Example

```typescript
import { render, screen, fireEvent } from 'solid-testing-library'

test('increments counter', () => {
  render(() => <Counter />)
  const button = screen.getByText('Increment')
  fireEvent.click(button)
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for solid-start-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
