# 1. Core Ideas

Focused reference for **unocss**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
