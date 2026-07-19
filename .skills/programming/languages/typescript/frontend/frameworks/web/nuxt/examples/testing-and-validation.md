# Nuxt Best Practices: 12. Testing

## Source guidance

This example applies the **12. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Component testing** — test components with Vitest:
- **E2E testing** — use Playwright for E2E testing:

## Example

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '~/components/Button.vue'

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' }
    })
    expect(wrapper.text()).toContain('Click me')
  })
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for nuxt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
