# VuePress Best Practices: Starter Template

A reusable starting point derived from the **3. Configuration** section of [VuePress Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
