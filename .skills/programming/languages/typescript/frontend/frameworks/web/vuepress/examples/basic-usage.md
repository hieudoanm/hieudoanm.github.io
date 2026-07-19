# VuePress Best Practices: Basic Usage

Best practices for building documentation sites with VuePress. Use when creating, structuring, or reviewing VuePress applications — covers content organization, theming, plugins, and deployment.

## Scenario

Use this example as a starting point when applying **vuepress-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
