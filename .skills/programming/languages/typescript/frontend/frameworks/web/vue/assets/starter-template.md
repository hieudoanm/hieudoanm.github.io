# Vue.js Best Practices: Starter Template

A reusable starting point derived from the **2. Component Structure** section of [Vue.js Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
