# 1. Installation and Setup (v3)

Focused reference for **tailwindcss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Installation and Setup (v3)

- Install: `npm i -D tailwindcss postcss autoprefixer`, `npx tailwindcss init -p`.
- Configure `content` globs in `tailwind.config.js` to watch your source files for class extraction.
- Add `@tailwind base; @tailwind components; @tailwind utilities;` to your CSS entry.
- PostCSS plugin ties it into the build (`postcss.config.js → tailwindcss + autoprefixer`).

```bash
npm i -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

```css
/* src/index.css — v3 layers */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
