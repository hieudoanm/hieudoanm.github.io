# Review checklist

Focused reference for **astro-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
