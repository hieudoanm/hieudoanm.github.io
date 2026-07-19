# Workflow notes

Focused reference for **vue-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
