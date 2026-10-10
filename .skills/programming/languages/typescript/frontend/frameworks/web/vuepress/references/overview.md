# Overview

Focused reference for **vuepress-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

````markdown
# Getting Started

Welcome to the documentation. Here's how to get started.

## Installation

```bash
npm install my-package
```

## Usage

```typescript
import { myFunction } from 'my-package'
```
````
