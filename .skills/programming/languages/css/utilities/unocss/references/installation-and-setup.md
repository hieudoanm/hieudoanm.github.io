# 2. Installation and Setup

Focused reference for **unocss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Installation and Setup

- Vite: `npm i -D unocss` + `import UnoCSS from 'unocss/vite'` → add plugin, then `import 'virtual:uno.css'`.
- Nuxt: use `@unocss/nuxt` module.
- Node/Vite-agnostic: use the tailwind-compatible `preset-wind` CLI / manual integrations.

```bash
npm i -D unocss
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  plugins: [UnoCSS()],
});
```
