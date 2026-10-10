# Workflow notes

Focused reference for **solid-start-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```text
src/routes/
├── index.tsx             # /
├── about.tsx             # /about
└── blog/
    ├── index.tsx         # /blog
    └── [slug].tsx        # /blog/:slug
```

- **Dynamic routes** — use bracket notation for dynamic routes:

```typescript
import { useParams } from 'solid-start'

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug

  return <div>Blog post: {slug}</div>
}
```

- **Navigation** — use useNavigate for navigation:

```typescript
import { useNavigate } from 'solid-start'

export default function Home() {
  const navigate = useNavigate()
  return <button onClick={() => navigate('/about')}>Go to About</button>
}
```

---

## 5. Data Fetching

- **Server functions** — use server functions for data fetching:

```typescript
import { createServerData$ } from 'solid-start/server'

export const useData = createServerData$(async () => {
  const response = await fetch('https://api.example.com/data')
  return response.json()
})
```

- **Route data** — use route data for page-specific data:

```typescript
import { useRouteData } from 'solid-start'

export function routeData() {
  return createServerData$(async () => {
    return await fetchData()
  })
}

export default function Page() {
  const data = useRouteData()
  return <div>{data()?.title}</div>
}
```

- **Client-side fetching** — use createResource for client-side fetching:

```typescript
import { createResource } from 'solid-js'

const [data] = createResource(() => fetchData())
```

---

## 6. Server-Side Rendering

- **SSR by default** — SolidStart renders on the server by default
- **Hydration** — SolidStart handles hydration automatically
- **Client components** — use 'client' directive for client-only components:

```typescript
export default function ClientComponent() {
  'client'
  // Client-only code
}
```

---

## 7. API Routes

- **API routes** — create API routes in `src/routes/api/`:
