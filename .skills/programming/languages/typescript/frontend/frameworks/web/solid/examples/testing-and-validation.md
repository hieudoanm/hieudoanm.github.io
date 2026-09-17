# SolidJS Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Solid Testing Library** — test components with Solid Testing Library:
- **Unit tests** — test reactive logic separately
- **Integration tests** — test component interactions

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

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for solidjs-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
