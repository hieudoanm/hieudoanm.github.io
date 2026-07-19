# Workflow notes

Focused reference for **nuxt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **useFetch** — use useFetch for data fetching:

```vue
<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/data')
</script>
```

---

## 5. Routing

- **File-based routing** — create routes with files:

```text
pages/
├── index.vue             # /
├── about.vue             # /about
└── blog/
    ├── index.vue         # /blog
    └── [slug].vue        # /blog/:slug
```

- **Dynamic routes** — use bracket notation for dynamic routes:

```vue
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const { data } = await useFetch(`/api/blog/${slug}`)
</script>
```

- **Navigation** — use navigateTo for navigation:

```vue
<script setup lang="ts">
const router = useRouter()

const goToAbout = () => {
  router.push('/about')
}
</script>
```

---

## 6. Server-Side Rendering

- **SSR by default** — Nuxt renders on the server by default
- **Client components** — use `ClientOnly` for client-only components:

```vue
<ClientOnly>
  <HeavyComponent />
</ClientOnly>
```

- **Hydration** — Nuxt handles hydration automatically
- **SEO** — leverage SSR for SEO benefits

---

## 7. State Management

- **Pinia stores** — use Pinia for state management:

```typescript
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  return { user, setUser }
})
```

- **useState** — use useState for shared state:

```typescript
const sharedState = useState('shared', () => ({
  value: 0
}))
```

- **Local state** — use ref for component-local state
