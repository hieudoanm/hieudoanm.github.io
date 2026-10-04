---
name: vue-best-practices
description: Best practices for building web applications with Vue.js. Use when creating, structuring, or reviewing Vue applications — covers components, composition API, state management, performance, and testing.
---

# Vue.js Best Practices

Vue.js is a progressive JavaScript framework for building user interfaces. Best practice is to leverage the Composition API, use TypeScript for type safety, maintain clear component structure, and follow Vue's reactivity system properly.

---

## 1. Core Stack

- Vue **3.x** (Composition API preferred)
- TypeScript **strict mode**
- Vite for build tooling
- Pinia for state management
- Vue Router for routing

```bash
npm create vue@latest my-app
# or
npm init vite@latest my-app -- --template vue-ts
```

---

## 2. Component Structure

- **Single File Components (SFC)** — use `.vue` files with `<script setup>`:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>

<style scoped>
button {
  padding: 8px 16px;
}
</style>
```

- **Composition API** — prefer Composition API over Options API
- **TypeScript** — use TypeScript for type safety
- **Scoped styles** — use scoped styles to avoid CSS conflicts

---

## 3. Reactivity System

- **ref for primitives** — use `ref` for primitive values:

```typescript
const count = ref(0)
const name = ref<string>('')
```

- **reactive for objects** — use `reactive` for objects:

```typescript
const user = reactive({
  name: 'John',
  age: 30
})
```

- **computed for derived state** — use `computed` for derived values:

```typescript
const fullName = computed(() => `${user.firstName} ${user.lastName}`)
```

- **watch for side effects** — use `watch` for side effects:

```typescript
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})
```

---

## 4. Component Design

- **Props with TypeScript** — define props with TypeScript:

```typescript
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})
```

- **Emits with TypeScript** — define emits with TypeScript:

```typescript
interface Emits {
  (e: 'update', value: number): void
  (e: 'delete', id: string): void
}

const emit = defineEmits<Emits>()
```

- **Slots for composition** — use slots for component composition:

```vue
<template>
  <div class="card">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

---

## 5. State Management

- **Pinia for global state** — use Pinia for app-wide state:

```typescript
// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const setUser = (newUser: User) => {
    user.value = newUser
  }
  return { user, setUser }
})
```

- **Local state for component-specific data** — use `ref`/`reactive` for component-local state
- **Provide/Inject for deep component trees** — use provide/inject for passing data through component trees

---

## 6. Routing

- **Vue Router for routing** — set up routes with Vue Router:

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
})
```

- **Programmatic navigation** — use router for programmatic navigation:

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/about')
```

- **Route guards** — use route guards for navigation control:

```typescript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

---

## 7. Performance Optimization

- **v-once for static content** — use `v-once` for content that doesn't change:

```vue
<div v-once>{{ staticContent }}</div>
```

- **v-memo for conditional rendering** — use `v-memo` to skip updates:

```vue
<div v-memo="[value]">{{ expensiveComputation }}</div>
```

- **Lazy loading routes** — lazy load route components:

```typescript
const routes = [
  {
    path: '/about',
    component: () => import('./views/About.vue')
  }
]
```

- **Async components** — use async components for code splitting:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)
</script>
```

---

## 8. Forms

- **v-model for two-way binding** — use `v-model` for form inputs:

```vue
<input v-model="name" type="text" />
<input v-model="email" type="email" />
```

- **Form validation** — use validation libraries like VeeValidate or VueUse:

```typescript
import { useForm } from 'vee-validate'

const { handleSubmit, errors } = useForm({
  validationSchema: schema
})
```

- **Custom v-model** — create custom v-model for complex components:

```vue
<script setup>
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input :value="modelValue" @input="updateValue" />
</template>
```

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
