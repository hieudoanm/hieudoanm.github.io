# Workflow notes

Focused reference for **vuepress-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- Keep dynamic page data in VuePress content loaders or page data; use a Vue component for interactive, client-side behavior.

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
