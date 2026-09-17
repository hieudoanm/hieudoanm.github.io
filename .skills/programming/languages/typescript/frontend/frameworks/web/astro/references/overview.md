# Overview

Focused reference for **astro-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Astro Best Practices

Astro is a modern static site builder that delivers lightning-fast performance. Best practice is to leverage Astro's island architecture, use zero-JS by default, optimize for performance, and follow Astro's component patterns.

---

## 1. Core Stack

- Astro **latest stable**
- TypeScript **strict mode**
- Frameworks (React, Vue, Svelte, etc.) for interactive components
- Vite for build tooling

```bash
npm create astro@latest my-app
```

---

## 2. Project Structure

```text
src/
├── components/           # Astro components
│   ├── Card.astro
│   └── Layout.astro
├── layouts/              # Layout components
│   └── MainLayout.astro
├── pages/                # File-based routing
│   ├── index.astro
│   └── blog/
│       └── [slug].astro
├── styles/               # Global styles
│   └── global.css
└── content/              # Content collections
    └── blog/
```

- **File-based routing** — pages in `src/pages/` become routes
- **Components** — reusable Astro components
- **Layouts** — shared layouts for pages
- **Content collections** — structured content management

---

## 3. Astro Components

- **Astro components** — use `.astro` files for components:

```astro
---
const { title } = Astro.props
---
<div class="card">
  <h2>{title}</h2>
  <slot />
</div>

<style>
  .card {
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
</style>
```

- **Server-side only** — Astro components run on the server by default
- **Zero JavaScript** — components ship zero JavaScript by default
- **TypeScript** — use TypeScript in the frontmatter:

```astro
---
interface Props {
  title: string
  description?: string
}
const { title, description = '' } = Astro.props
---
```

---

## 4. Routing
