# Lynx Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **React Native Testing Library** — test components:
- **Web-specific testing** — test web-specific functionality:

## Example

```typescript
import { render, fireEvent } from '@testing-library/react-native'

test('handles button press', () => {
  const { getByText } = render(<Button />)
  fireEvent.press(getByText('Click me'))
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for lynx-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
