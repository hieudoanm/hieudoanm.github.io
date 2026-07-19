# Implementation notes

Focused reference for **nuxt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
