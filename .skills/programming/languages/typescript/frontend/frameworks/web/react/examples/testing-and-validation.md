# React Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **React Testing Library** — test components as users interact with them:
- **Test behavior, not implementation** — test what users see and do
- **Integration testing** — test component interactions together

## Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react'

test('increments counter', () => {
  render(<Counter />)
  const button = screen.getByText('Increment')
  fireEvent.click(button)
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for react-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
