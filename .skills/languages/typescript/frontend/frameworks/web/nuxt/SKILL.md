---
name: nuxt-best-practices
description: Best practices for building Vue.js applications with Nuxt. Use when creating, structuring, or reviewing Nuxt applications — covers server-side rendering, routing, state management, performance, and deployment.
---

# Nuxt Best Practices

Nuxt is a Vue.js meta-framework that provides server-side rendering, static site generation, and full-stack capabilities. Best practice is to leverage Nuxt's auto-imports, use server-side rendering for SEO, optimize performance, and follow Nuxt's conventions.

---

## 1. Core Stack

- Nuxt **3.x** (latest stable)
- Vue **3.x**
- TypeScript **strict mode**
- Pinia for state management
- Nuxt CLI for tooling

```bash
npx nuxi@latest init my-app
```

---

## 2. Project Structure

```text
src/
├── components/           # Auto-imported components
│   ├── Button.vue
│   └── Card.vue
├── composables/          # Auto-imported composables
│   ├── useAuth.ts
│   └── useApi.ts
├── pages/                # File-based routing
│   ├── index.vue
│   └── about.vue
├── layouts/              # Layout components
│   └── default.vue
├── middleware/           # Route middleware
│   └── auth.ts
├── server/               # Server routes
│   └── api/
├── stores/               # Pinia stores
│   └── user.ts
├── public/               # Static assets
└── assets/               # Asset files
```

- **Auto-imports** — components and composables are auto-imported
- **File-based routing** — pages in `pages/` become routes
- **Server routes** — API routes in `server/api/`
- **Convention over configuration** — follow Nuxt's conventions

---

## 3. Components

- **Auto-imported components** — components are auto-imported:

```vue
<template>
  <div>
    <Button @click="handleClick">Click me</Button>
    <Card title="My Card" />
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('Button clicked')
}
</script>
```

- **Component organization** — organize components by feature
- **TypeScript** — use TypeScript for type safety:

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})
</script>
```

---

## 4. Composables

- **Auto-imported composables** — composables are auto-imported:

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const user = useState('user', () => null)

  const login = async (credentials: Credentials) => {
    // Login logic
  }

  return { user, login }
}
```

- **useState** — use useState for reactive state:

```typescript
const count = useState('count', () => 0)
```

- **useFetch** — use useFetch for data fetching:

```vue
<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/data')
</script>
```

---

## 5. Routing

- **File-based routing** — create routes with files:

```text
pages/
├── index.vue             # /
├── about.vue             # /about
└── blog/
    ├── index.vue         # /blog
    └── [slug].vue        # /blog/:slug
```

- **Dynamic routes** — use bracket notation for dynamic routes:

```vue
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const { data } = await useFetch(`/api/blog/${slug}`)
</script>
```

- **Navigation** — use navigateTo for navigation:

```vue
<script setup lang="ts">
const router = useRouter()

const goToAbout = () => {
  router.push('/about')
}
</script>
```

---

## 6. Server-Side Rendering

- **SSR by default** — Nuxt renders on the server by default
- **Client components** — use `ClientOnly` for client-only components:

```vue
<ClientOnly>
  <HeavyComponent />
</ClientOnly>
```

- **Hydration** — Nuxt handles hydration automatically
- **SEO** — leverage SSR for SEO benefits

---

## 7. State Management

- **Pinia stores** — use Pinia for state management:

```typescript
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  return { user, setUser }
})
```

- **useState** — use useState for shared state:

```typescript
const sharedState = useState('shared', () => ({
  value: 0
}))
```

- **Local state** — use ref for component-local state

---

## 8. API Routes

- **Server routes** — create API routes in `server/api/`:

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from server!' }
})
```

- **Dynamic API routes** — use bracket notation for dynamic routes:

```typescript
// server/api/users/[id].ts
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  return { id }
})
```

- **HTTP methods** — define different HTTP methods:

```typescript
// server/api/users/[id].patch.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Update user
})
```

---

## 9. Performance

- **Lazy loading** — components are lazy-loaded by default
- **Image optimization** — use Nuxt Image:

```vue
<NuxtImg
  src="/image.jpg"
  alt="My image"
  width="800"
  height="600"
/>
```

- **Font optimization** — use Nuxt Fonts:

```vue
<NuxtFont family="Inter" />
```

- **Code splitting** — Nuxt automatically code-splits routes

---

## 10. Styling

- **CSS Modules** — use CSS Modules for scoped styles:

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

- **TailwindCSS** — use TailwindCSS:

```bash
npx nuxi@latest module add tailwindcss
```

```vue
<template>
  <button class="px-4 py-2 bg-blue-500 text-white rounded">
    Click me
  </button>
</template>
```

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
