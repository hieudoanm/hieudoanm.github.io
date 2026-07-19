# Vue.js Best Practices: 2. Component Structure

## Source guidance

This example applies the **2. Component Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Single File Components (SFC)** — use `.vue` files with `<script setup>`:
- **Composition API** — prefer Composition API over Options API
- **TypeScript** — use TypeScript for type safety
- **Scoped styles** — use scoped styles to avoid CSS conflicts

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for vue-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
