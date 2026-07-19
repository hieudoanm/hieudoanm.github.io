# Vue.js Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Vue Test Utils** — test components with Vue Test Utils:
- **Vitest for unit testing** — use Vitest for fast unit testing
- **Playwright for E2E testing** — use Playwright for end-to-end testing

## Example

```typescript
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

test('increments count', async () => {
  const wrapper = mount(Counter)
  await wrapper.find('button').trigger('click')
  expect(wrapper.text()).toContain('Count: 1')
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for vue-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
