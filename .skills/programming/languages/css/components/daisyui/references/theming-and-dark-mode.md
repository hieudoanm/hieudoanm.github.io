# 3. Theming and Dark Mode

Focused reference for **daisyui**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Theming and Dark Mode

- Prefix themes: `data-theme="light|dark|cupcake|cyberpunk|..."` on `<html>` for instant theming.
- When using Tailwind config, set `themes: ["light", "dark", ...]`; use `themes: false` to use a single dark/base theme.
- Custom theme: define colors per the DaisyUI color scale (base, content, primary, secondary, accent, neutral, info, success, warning, error).
- Dark mode: set `darkTheme: "dark"` and toggle `data-theme` / `class`.

```html
<!-- Switch the whole app by setting data-theme on <html> -->
<html data-theme="dark">
  <body class="bg-base-100 text-base-content">
    <button class="btn btn-primary">Dark by default</button>
  </body>
</html>
```

```javascript
// tailwind.config.js — a custom theme on the DaisyUI color scale
module.exports = {
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        brand: {
          primary: '#6d28d9',
          'primary-content': '#ffffff',
          secondary: '#f59e0b',
          accent: '#0ea5e9',
          neutral: '#1f2937',
          'base-100': '#ffffff',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#facc15',
          error: '#ef4444',
        },
      },
      'dark',
    ],
    darkTheme: 'dark',
  },
};
```
