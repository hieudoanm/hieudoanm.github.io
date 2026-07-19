# Workflow notes

Focused reference for **astro-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **File-based routing** — create routes with files:

```text
src/pages/
├── index.astro           # /
├── about.astro           # /about
└── blog/
    ├── index.astro       # /blog
    └── [slug].astro      # /blog/:slug
```

- **Dynamic routes** — use bracket notation for dynamic routes:

```astro
---
const { slug } = Astro.params
const post = await getPost(slug)
---
<h1>{post.title}</h1>
```

- **Redirects** — configure redirects in `astro.config.mjs`:

```javascript
export default defineConfig({
  redirects: [
    { source: '/old', destination: '/new', status: 301 }
  ]
})
```

---

## 5. Data Fetching

- **Server-side data fetching** — fetch data in the frontmatter:

```astro
---
const response = await fetch('https://api.example.com/data')
const data = await response.json()
---
<div>{data.title}</div>
```

- **Content collections** — use content collections for structured content:

```typescript
// astro.config.mjs
export default defineConfig({
  build: {
    format: 'file'
  }
})

// src/content/config.ts
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
  })
})

export const collections = { blog }
```

- **Static generation** — data is fetched at build time by default

---

## 6. Framework Integration

- **React components** — use React for interactive components:

```astro
---
import InteractiveCard from '../components/InteractiveCard.jsx'
---
<InteractiveCard client:load />
```

- **Vue components** — use Vue for interactive components:
