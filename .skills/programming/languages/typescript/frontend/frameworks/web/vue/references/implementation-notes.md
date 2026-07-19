# Implementation notes

Focused reference for **vue-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
