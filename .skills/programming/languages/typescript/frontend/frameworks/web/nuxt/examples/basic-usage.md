# Nuxt Best Practices: Basic Usage

Best practices for building Vue.js applications with Nuxt. Use when creating, structuring, or reviewing Nuxt applications — covers server-side rendering, routing, state management, performance, and deployment.

## Scenario

Use this example as a starting point when applying **nuxt-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Components** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
