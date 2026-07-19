# Ionic Framework Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Ionic Testing** — test Ionic components:
- **E2E testing** — use Detox or Appium for E2E testing
- **Unit testing** — test services and business logic

## Example

```typescript
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders home page', () => {
  render(<App />)
  expect(screen.getByText('Home')).toBeInTheDocument()
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for ionic-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
