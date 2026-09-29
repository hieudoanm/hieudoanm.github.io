---
name: unocss
description: UnoCSS — instant, atomic CSS engine with on-demand utility generation, preset system, and JavaScript-free config file.
---

UnoCSS is an **instant, on-demand atomic CSS engine** (by Anthony Fu) that generates **utility classes as you type**, with an extremely efficient **preset + variant system** and no runtime JS. It powers Vite/Vue/Nuxt projects with near-zero CSS output initially.

## 1. Core Ideas

- **Utility detection**: scans source (`content`) for class names, generating only used CSS (JIT-like, ultra-fast).
- **Presets**: `unocss/preset-uno`, `preset-wind`, `preset-attributify`, `preset-icons`, `preset-typography`, etc.
- **CSS variables**: Tokens combine into computed declarations at build time.
- Zero config defaults work out of the box; easily extended with custom rules/shortcuts.

```ts
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({ scale: 1.2 }),
  ],
});
```

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

## 3. Utilities & Variants

- Work like Tailwind-ish atomic classes: `p-4`, `flex`, `text-red-500`, `w-1/2`, `hover:` states.
- Variants: `hover:`, `focus:`, `dark:`, `md:`; media/dark via `preset-wind`.
- Attribution mode: `preset-attributify` for Vue/JSX (`<div p-4 text-red-500 />`).
- Icons: `preset-icons` → `i-mdi-home`, `i-carbon-logo-github` mapped from your set of icon packages.

```html
<div class="flex items-center gap-2 p-4 text-brand hover:bg-brand/10">
  <span class="i-mdi-home text-xl" />
  <span class="hidden md:inline">Dashboard</span>
</div>
```

```vue
<!-- attributify mode: utilities become HTML attributes -->
<button bg-brand text-white px-4 py-2 rounded>Save</button>
```

## 4. Extending

- Custom rules: `shortcuts: { btn: 'px-4 py-2 rounded' }` and `rules: [[/^bg-(.*)$/, m => ({ background: m[1] })]]`.
- Use `safelist` / `preflights` for runtime-driven classes.
- Combine presets; write your own preset via `defineConfig`.

```ts
// uno.config.ts — tokens, shortcuts and rules on top of the presets
export default defineConfig({
  theme: {
    colors: { brand: '#6d28d9' },
  },
  shortcuts: {
    btn: 'px-4 py-2 rounded font-semibold',
    'btn-primary': 'btn bg-brand text-white',
  },
  rules: [
    ['tab-4', { 'tab-size': '4' }],
    [
      /^grid-cols-(\d+)$/,
      ([, columns]) => ({
        'grid-template-columns': `repeat(${columns}, minmax(0, 1fr))`,
      }),
    ],
  ],
  safelist: ['text-brand'],
});
```

## 5. Performance Notes

- Effective content scanning keeps bundles at ~1-10 KB for typical apps.
- Cache (`.cache` folder) to avoid re-scan; scan `content` vectors precisely.
- Use the browser DevTools preflight to inspect generated CSS.

```ts
// Restrict scanning to source files — fewer files, faster rebuilds
export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|html)($|\?)/],
    },
  },
});
```

## 6. Common Pitfalls

- Missing `content` configuration → icons/classes not generated for dynamic markup.
- Preset conflicts when mixing `preset-uno` and `preset-wind` variants.
- Dynamic class names (`text-${color}`) can't be extracted — use safelist.

```ts
// Bad: the extractor never sees `text-success` or `text-danger`
const tone = (status: string) => `text-${status}`;

// Good: map to full class names the extractor can find
const tone = { success: 'text-success', danger: 'text-danger' } as const;
```

## General Rules of Thumb

- Start with `preset-wind` for Tailwind-like base; layer presets as needed.
- Define tokens & shortcuts in UnoCSS config; avoid ad-hoc arbitrary values where possible.
- Keep the class vocabulary stable — safelist what must exist at runtime.

## Quick-Start Checklist

- [ ] Install and register UnoCSS (Vite/Nuxt); import `virtual:uno.css`.
- [ ] Configure `content` globs and presets (`preset-wind`, `preset-icons`, etc.).
- [ ] Define theme tokens, rules, shortcuts.
- [ ] Build UI with atomic classes.
- [ ] Verify icon preset requires your icon-package (`@iconify-json/...`).
- [ ] Confirm production CSS size and used-content correctness.
