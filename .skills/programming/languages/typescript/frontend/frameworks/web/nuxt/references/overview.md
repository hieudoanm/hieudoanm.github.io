# Overview

Focused reference for **nuxt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Nuxt Best Practices

Nuxt is a Vue.js meta-framework that provides server-side rendering, static site generation, and full-stack capabilities. Best practice is to leverage Nuxt's auto-imports, use server-side rendering for SEO, optimize performance, and follow Nuxt's conventions.

---

## 1. Core Stack

- Nuxt **3.x** (latest stable)
- Vue **3.x**
- TypeScript **strict mode**
- Pinia for state management
- Nuxt CLI for tooling

```bash
npx nuxi@latest init my-app
```

---

## 2. Project Structure

```text
src/
├── components/           # Auto-imported components
│   ├── Button.vue
│   └── Card.vue
├── composables/          # Auto-imported composables
│   ├── useAuth.ts
│   └── useApi.ts
├── pages/                # File-based routing
│   ├── index.vue
│   └── about.vue
├── layouts/              # Layout components
│   └── default.vue
├── middleware/           # Route middleware
│   └── auth.ts
├── server/               # Server routes
│   └── api/
├── stores/               # Pinia stores
│   └── user.ts
├── public/               # Static assets
└── assets/               # Asset files
```

- **Auto-imports** — components and composables are auto-imported
- **File-based routing** — pages in `pages/` become routes
- **Server routes** — API routes in `server/api/`
- **Convention over configuration** — follow Nuxt's conventions

---

## 3. Components

- **Auto-imported components** — components are auto-imported:

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

- **Component organization** — organize components by feature
- **TypeScript** — use TypeScript for type safety:

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})
</script>
```

---

## 4. Composables

- **Auto-imported composables** — composables are auto-imported:

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const user = useState('user', () => null)

  const login = async (credentials: Credentials) => {
    // Login logic
  }

  return { user, login }
}
```

- **useState** — use useState for reactive state:

```typescript
const count = useState('count', () => 0)
```
