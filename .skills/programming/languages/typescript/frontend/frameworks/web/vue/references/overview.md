# Overview

Focused reference for **vue-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
