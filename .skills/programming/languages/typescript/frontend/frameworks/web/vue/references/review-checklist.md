# Review checklist

Focused reference for **vue-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 9. Styling

- **Scoped styles** — use scoped styles to avoid CSS conflicts:

```vue
<style scoped>
.button {
  padding: 8px 16px;
}
</style>
```

- **CSS Modules** — use CSS Modules for better scoping:

```vue
<style module>
.button {
  padding: 8px 16px;
}
</style>

<template>
  <button :class="$style.button">Click me</button>
</template>
```

- **TailwindCSS** — use TailwindCSS for utility-first styling:

```vue
<template>
  <button class="px-4 py-2 bg-blue-500 text-white rounded">
    Click me
  </button>
</template>
```

---

## 10. Testing

- **Vue Test Utils** — test components with Vue Test Utils:

```typescript
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

test('increments count', async () => {
  const wrapper = mount(Counter)
  await wrapper.find('button').trigger('click')
  expect(wrapper.text()).toContain('Count: 1')
})
```

- **Vitest for unit testing** — use Vitest for fast unit testing
- **Playwright for E2E testing** — use Playwright for end-to-end testing

---

## 11. General Rules of Thumb

- **Composition API** — prefer Composition API over Options API
- **TypeScript** — use TypeScript for type safety
- **Single File Components** — use SFC for component organization
- **Pinia for state** — use Pinia for global state management
- **Vue Router for routing** — use Vue Router for navigation
- **Scoped styles** — use scoped styles to avoid CSS conflicts
- **Performance optimization** — use lazy loading and memoization
- **Testing** — test components with Vue Test Utils

---

## Quick-Start Checklist

- [ ] Vue 3 with Composition API and TypeScript
- [ ] Single File Components with `<script setup>`
- [ ] Proper reactivity usage (ref, reactive, computed, watch)
- [ ] TypeScript for props and emits
- [ ] Pinia for state management
- [ ] Vue Router for routing
- [ ] Scoped styles or CSS Modules
- [ ] Performance optimization techniques
- [ ] Vue Test Utils for testing
- [ ] ESLint and Prettier for code quality
