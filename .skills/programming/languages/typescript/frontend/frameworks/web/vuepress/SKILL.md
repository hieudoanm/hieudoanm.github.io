---
name: vuepress-best-practices
description: Best practices for building documentation sites with VuePress. Use when creating, structuring, or reviewing VuePress applications — covers content organization, theming, plugins, and deployment.
---

# VuePress Best Practices

VuePress is a Vue-powered static site generator optimized for writing technical documentation. Best practice is to organize content logically, use Markdown with Vue components, leverage VuePress plugins, and optimize for SEO and performance.

---

## 1. Core Stack

- VuePress **2.x** (latest stable)
- Vue **3.x**
- TypeScript **strict mode**
- Markdown for content
- Node.js **LTS**

```bash
npm init vuepress@latest my-docs
```

---

## 2. Project Structure

```text
docs/
├── .vuepress/            # VuePress configuration
│   ├── config.ts         # Main configuration
│   ├── client.ts         # Client enhancement
│   ├── public/           # Static assets
│   └── theme/            # Custom theme
├── guide/                # Documentation content
│   ├── getting-started.md
│   └── configuration.md
├── api/                  # API documentation
│   └── components.md
└── README.md             # Homepage

package.json
```

- **Content organization** — organize content by category
- **Configuration** — configure VuePress in `.vuepress/config.ts`
- **Custom theme** — create custom themes in `.vuepress/theme/`
- **Static assets** — place static assets in `.vuepress/public/`

---

## 3. Configuration

- **Main configuration** — configure VuePress in `config.ts`:

```typescript
import { defineUserConfig } from 'vuepress/cli'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'en-US',
  title: 'My Documentation',
  description: 'Documentation for my project',
  theme: defaultTheme({
    navbar: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' }
    ],
    sidebar: {
      '/guide/': [
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    }
  })
})
```

- **TypeScript** — use TypeScript for configuration:

```typescript
import { defineUserConfig } from 'vuepress/cli'
import type { DefaultThemeConfig } from '@vuepress/theme-default'

const themeConfig: DefaultThemeConfig = {
  navbar: [
    { text: 'Guide', link: '/guide/' }
  ]
}

export default defineUserConfig({
  theme: defaultTheme(themeConfig)
})
```

---

## 4. Content Organization

- **Markdown files** — write content in Markdown:

```markdown
# Getting Started

Welcome to the documentation. Here's how to get started.

## Installation

```bash
npm install my-package
```

## Usage

```typescript
import { myFunction } from 'my-package'

myFunction()
```
```

- **Frontmatter** — use frontmatter for page metadata:

```markdown
---
title: Getting Started
description: How to get started with my project
---
```

- **Vue components in Markdown** — use Vue components in Markdown:

```markdown
<MyComponent />

<script setup>
import MyComponent from './MyComponent.vue'
</script>
```

---

## 5. Navigation

- **Navbar** — configure navbar in theme config:

```typescript
navbar: [
  { text: 'Guide', link: '/guide/' },
  { text: 'API', link: '/api/' },
  { text: 'GitHub', link: 'https://github.com/myproject' }
]
```

- **Sidebar** — configure sidebar for navigation:

```typescript
sidebar: {
  '/guide/': [
    { text: 'Getting Started', link: '/guide/getting-started' },
    { text: 'Configuration', link: '/guide/configuration' }
  ]
}
```

- **Dropdown menus** — create dropdown menus:

```typescript
navbar: [
  {
    text: 'Guide',
    children: [
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Configuration', link: '/guide/configuration' }
    ]
  }
]
```

---

## 6. Theming

- **Default theme** — use the default theme:

```typescript
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  theme: defaultTheme({
    // theme configuration
  })
})
```

- **Custom theme** — create custom themes:

```typescript
// .vuepress/theme/index.ts
import { defineTheme } from 'vuepress'
import Layout from './Layout.vue'

export default defineTheme({
  name: 'my-theme',
  layouts: {
    Layout
  }
})
```

- **Theme components** — create theme components:

```vue
<template>
  <div class="my-theme">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Theme logic
</script>

<style scoped>
.my-theme {
  /* Theme styles */
}
</style>
```

---

## 7. Plugins

- **Official plugins** — use official VuePress plugins:

```typescript
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search'
        }
      }
    })
  ]
})
```

- **Custom plugins** — create custom plugins:

```typescript
import { defineUserConfig } from 'vuepress/cli'
import { myPlugin } from './myPlugin'

export default defineUserConfig({
  plugins: [myPlugin()]
})
```

- **Plugin options** — configure plugin options:

```typescript
plugins: [
  searchPlugin({
    hotKeys: ['/']
  })
]
```

---

## 8. Styling

- **Custom styles** — add custom styles:

```typescript
// .vuepress/styles/index.scss
:root {
  --c-brand: #3eaf7c;
  --c-bg: #ffffff;
}
```

- **Theme customization** — customize theme styles:

```typescript
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  theme: defaultTheme({
    // theme customization
  })
})
```

- **Responsive design** — implement responsive design:

```scss
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }
}
```

---

## 9. SEO

- **Meta tags** — configure meta tags:

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
