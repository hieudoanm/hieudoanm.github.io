# Nuxt Best Practices: 9. Performance

## Source guidance

This example applies the **9. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Lazy loading** — components are lazy-loaded by default
- **Image optimization** — use Nuxt Image:
- **Font optimization** — use Nuxt Fonts:
- **Code splitting** — Nuxt automatically code-splits routes

## Example

```vue
<NuxtImg
  src="/image.jpg"
  alt="My image"
  width="800"
  height="600"
/>
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for nuxt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
