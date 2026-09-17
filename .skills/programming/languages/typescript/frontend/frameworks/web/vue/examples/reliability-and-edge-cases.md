# Vue.js Best Practices: 7. Performance Optimization

## Source guidance

This example applies the **7. Performance Optimization** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **v-once for static content** — use `v-once` for content that doesn't change:
- **v-memo for conditional rendering** — use `v-memo` to skip updates:
- **Lazy loading routes** — lazy load route components:
- **Async components** — use async components for code splitting:

## Example

```vue
<div v-once>{{ staticContent }}</div>
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for vue-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
