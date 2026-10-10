# VuePress Best Practices: 3. Configuration

## Source guidance

This example applies the **3. Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Main configuration** — configure VuePress in `config.ts`:
- **TypeScript** — use TypeScript for configuration:

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for vuepress-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
