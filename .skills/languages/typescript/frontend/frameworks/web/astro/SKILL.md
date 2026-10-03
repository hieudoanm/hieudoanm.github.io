---
name: astro-best-practices
description: Best practices for building content-driven websites with Astro. Use when creating, structuring, or reviewing Astro applications — covers components, routing, data fetching, optimization, and performance.
---

# Astro Best Practices

Astro is a modern static site builder that delivers lightning-fast performance. Best practice is to leverage Astro's island architecture, use zero-JS by default, optimize for performance, and follow Astro's component patterns.

---

## 1. Core Stack

- Astro **latest stable**
- TypeScript **strict mode**
- Frameworks (React, Vue, Svelte, etc.) for interactive components
- Vite for build tooling

```bash
npm create astro@latest my-app
```

---

## 2. Project Structure

```text
src/
├── components/           # Astro components
│   ├── Card.astro
│   └── Layout.astro
├── layouts/              # Layout components
│   └── MainLayout.astro
├── pages/                # File-based routing
│   ├── index.astro
│   └── blog/
│       └── [slug].astro
├── styles/               # Global styles
│   └── global.css
└── content/              # Content collections
    └── blog/
```

- **File-based routing** — pages in `src/pages/` become routes
- **Components** — reusable Astro components
- **Layouts** — shared layouts for pages
- **Content collections** — structured content management

---

## 3. Astro Components

- **Astro components** — use `.astro` files for components:

```astro
---
const { title } = Astro.props
---
<div class="card">
  <h2>{title}</h2>
  <slot />
</div>

<style>
  .card {
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
</style>
```

- **Server-side only** — Astro components run on the server by default
- **Zero JavaScript** — components ship zero JavaScript by default
- **TypeScript** — use TypeScript in the frontmatter:

```astro
---
interface Props {
  title: string
  description?: string
}
const { title, description = '' } = Astro.props
---
```

---

## 4. Routing

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

```astro
---
import VueComponent from '../components/VueComponent.vue'
---
<VueComponent client:visible />
```

- **Directives** — use directives to control hydration:

```astro
<ReactComponent client:load />      // Load on page load
<ReactComponent client:idle />      // Load when browser is idle
<ReactComponent client:visible />   // Load when visible
<ReactComponent client:media="(max-width: 768px)" /> // Load on media query
```

---

## 7. Performance

- **Zero JavaScript by default** — Astro ships zero JavaScript by default
- **Island architecture** — hydrate only interactive components
- **Image optimization** — use Astro's image component:

```astro
---
import { Image } from 'astro:assets'
import myImage from '../images/my-image.png'
---
<Image src={myImage} alt="My image" width={800} height={600} />
```

- **Code splitting** — Astro automatically code-splits routes
- **Lazy loading** — use lazy loading for heavy components

---

## 8. Styling

- **Scoped styles** — use scoped styles in components:

```astro
<style>
  .card {
    padding: 16px;
  }
</style>
```

- **Global styles** — import global styles in layouts:

```astro
---
import '../styles/global.css'
---
```

- **TailwindCSS** — use TailwindCSS for utility-first styling:

```bash
npx astro add tailwind
```

```astro
<div class="px-4 py-2 bg-blue-500 text-white rounded">
  Button
</div>
```

---

## 9. SEO

- **Meta tags** — set meta tags in layouts:

```astro
---
const title = 'My Page'
const description = 'Page description'
---
<html>
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
</html>
```

- **Sitemap** — generate sitemap automatically

```bash
npx astro add sitemap
```

- **Robots.txt** — configure robots.txt for SEO

---

## 10. Testing

- **Unit testing** — test components with Vitest:

```typescript
import { test, expect } from 'vitest'
import { render } from '@testing-library/vue'

test('renders card', () => {
  const { getByText } = render(Card, { props: { title: 'Test' } })
  expect(getByText('Test')).toBeInTheDocument()
})
```

- **E2E testing** — use Playwright for E2E testing:

```typescript
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Home/)
})
```

---

## 11. General Rules of Thumb

- **Zero JavaScript by default** — only hydrate interactive components
- **Server-side rendering** — leverage Astro's server-side rendering
- **Performance first** — optimize for Core Web Vitals
- **Content collections** — use content collections for structured content
- **Framework integration** — use frameworks only when needed
- **SEO optimization** — optimize for search engines

---

## Quick-Start Checklist

- [ ] Astro with TypeScript strict mode
- [ ] File-based routing in `src/pages/`
- [ ] Astro components for static content
- [ ] Framework components for interactivity
- [ ] Client directives for hydration
- [ ] Image optimization with Astro images
- [ ] Content collections for structured content
- [ ] TailwindCSS or scoped styles
- [ ] SEO meta tags configured
- [ ] Testing setup with Vitest/Playwright
