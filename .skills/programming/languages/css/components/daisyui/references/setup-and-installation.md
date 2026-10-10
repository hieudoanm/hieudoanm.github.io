# 1. Setup and Installation

Focused reference for **daisyui**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Setup and Installation

- Requirements: Tailwind CSS v3/v4.
- Install: `npm i daisyui` then add `require('daisyui')` to `tailwind.config.js` `plugins` (or `@plugin "daisyui"` for v4).
- Import `daisyui/dist/full.css` (or use JIT via class detection when enabled).

```bash
npm i -D daisyui
```

```javascript
// tailwind.config.js (daisyUI v4 + Tailwind v3)
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
    darkTheme: 'dark',
  },
};
```
