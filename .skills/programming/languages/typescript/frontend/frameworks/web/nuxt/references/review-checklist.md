# Review checklist

Focused reference for **nuxt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Scoped styles** — use scoped styles for component isolation

---

## 11. Middleware

- **Route middleware** — use middleware for route protection:

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')
  if (!user.value) {
    return navigateTo('/login')
  }
})
```

- **Named middleware** — apply middleware to routes:

```vue
<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>
```

---

## 12. Testing

- **Component testing** — test components with Vitest:

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

- **E2E testing** — use Playwright for E2E testing:

```typescript
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Home/)
})
```

---

## 13. General Rules of Thumb

- **Auto-imports** — leverage Nuxt's auto-imports
- **File-based routing** — use file-based routing
- **Server-side rendering** — leverage SSR for SEO
- **TypeScript** — use TypeScript for type safety
- **Performance** — optimize images and fonts
- **Convention over configuration** — follow Nuxt's conventions

---

## Quick-Start Checklist

- [ ] Nuxt 3 with TypeScript strict mode
- [ ] Auto-imported components and composables
- [ ] File-based routing in `pages/`
- [ ] Pinia stores for state management
- [ ] Server routes in `server/api/`
- [ ] useState for shared state
- [ ] useFetch for data fetching
- [ ] Nuxt Image for image optimization
- [ ] TailwindCSS or CSS Modules
- [ ] Testing setup with Vitest/Playwright
