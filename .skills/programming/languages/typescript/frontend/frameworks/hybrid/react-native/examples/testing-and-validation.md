# React Native Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **React Native Testing Library** — test components:
- **Detox for E2E testing** — use Detox for end-to-end testing:

## Example

```typescript
import { render, fireEvent } from '@testing-library/react-native'

test('increments counter', () => {
  const { getByText } = render(<Counter />)
  fireEvent.press(getByText('Increment'))
  expect(getByText('Count: 1')).toBeTruthy()
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for react-native-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
