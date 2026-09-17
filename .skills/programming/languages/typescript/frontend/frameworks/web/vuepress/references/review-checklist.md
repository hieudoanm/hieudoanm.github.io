# Review checklist

Focused reference for **vuepress-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```typescript
export default defineUserConfig({
  head: [
    ['meta', { name: 'description', content: 'My documentation' }],
    ['meta', { name: 'keywords', content: 'vuepress, documentation' }]
  ]
})
```

- **Sitemap** — generate sitemap:

```typescript
import { sitemapPlugin } from '@vuepress/plugin-sitemap'

export default defineUserConfig({
  plugins: [
    sitemapPlugin({
      hostname: 'https://mywebsite.com'
    })
  ]
})
```

- **Robots.txt** — configure robots.txt:

```typescript
import { robotsPlugin } from '@vuepress/plugin-robots'

export default defineUserConfig({
  plugins: [
    robotsPlugin({
      allow: '/'
    })
  ]
})
```

---

## 10. Deployment

- **Static generation** — build static site:

```bash
npm run docs:build
```

- **Deployment** — deploy to various platforms:

```bash
# Deploy to GitHub Pages
npm run docs:build

# Deploy to Netlify
npm run docs:build
netlify deploy --prod --dir=docs/.vuepress/dist
```

- **CI/CD** — set up CI/CD for automatic deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: npm run docs:build
      - name: Deploy
        run: npm run docs:deploy
```

---

## 11. General Rules of Thumb

- **Content organization** — organize content logically
- **Markdown** — use Markdown for content
- **Vue components** — use Vue components for interactivity
- **Plugins** — leverage VuePress plugins
- **SEO** — optimize for search engines
- **Performance** — optimize for performance

---

## Quick-Start Checklist

- [ ] VuePress 2 with TypeScript
- [ ] Content organized by category
- [ ] Navbar and sidebar configured
- [ ] Markdown with frontmatter
- [ ] Vue components in Markdown
- [ ] Default theme or custom theme
- [ ] Official plugins installed
- [ ] Custom styles configured
- [ ] SEO meta tags configured
- [ ] Deployment workflow set up
