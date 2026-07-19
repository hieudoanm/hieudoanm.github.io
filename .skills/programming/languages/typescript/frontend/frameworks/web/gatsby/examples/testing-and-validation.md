# Gatsby Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Component testing** — test components with Jest:
- **E2E testing** — use Cypress for E2E testing:

## Example

```javascript
import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

test('renders header', () => {
  const { getByText } = render(<Header />)
  expect(getByText('Header')).toBeInTheDocument()
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for gatsby-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
