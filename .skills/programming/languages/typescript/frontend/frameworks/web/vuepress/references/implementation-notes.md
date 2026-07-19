# Implementation notes

Focused reference for **vuepress-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
