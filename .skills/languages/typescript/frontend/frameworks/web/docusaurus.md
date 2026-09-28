---
name: docusaurus-best-practices
description: Best practices for Docusaurus documentation sites. Use when creating, structuring, or maintaining a Docusaurus site for project documentation.
---

# Docusaurus Best Practices

Docusaurus is a modern static website generator focused on documentation. Following conventions ensures a consistent, maintainable, and searchable docs experience.

---

## 1. Project Structure

- **`docs/` folder** — place all Markdown/MDX files under `docs/`, organized by category folders (`intro`, `api`, `guides`).
- **`theme/` folder** — customize the DaisyUI theme or add custom `src/css/custom.css` for branding overrides.
- **`sidebars.js`** — define sidebar navigation groups, labels, and collapsed state per folder.

```txt
/
├── docs/
│   ├── intro/
│   │   └── intro.md
│   ├── api/
│   │   └── api-reference.md
│   └── guides/
│       └── getting-started.md
├── theme/
│   └── src/
│       └── css/
│           └── custom.css
├── sidebars.js
└── docusaurus.config.js
```

---

## 2. MDX & Content

- **Use MDX for interactive examples** — import React components directly in Markdown (`import Tabs from '@theme/Tabs'`).
- **Admonitions for callouts** — `:::tip`, `:::note`, `:::warning`, `:::danger` for structured emphasis.
- **`tabs` component for multi-language examples** — `import Tabs from '@theme/Tabs'` with `import CodeBlock from '@theme/CodeBlock'`.

```mdx
<Tabs defaultValue="js" values={[{ label: 'JavaScript', value: 'js' }, { label: 'TypeScript', value: 'ts' }]}>
<TabItem value="js">

```js
// JS example
```

</TabItem>
<TabItem value="ts">

```ts
// TS example
```

</TabItem>
</Tabs>
```

---

## 3. Versioning

- **`docker run` version bumps** — `npm run docusaurus docs:version 2.0` freezes a snapshot and creates a versioned docset.
- **`versioned docs/`** — each version gets its own `versioned_docs/...` directory; don't edit shared docs across versions.
- **`sidebar` per version** — `sidebars.js` can export different sidebar configs per version.

---

## 4. Configuration

- **`preset: 'github'`** — enables GitHub integration (Edit this page, version badges, release notes).
- **`title`, `url`, `favicon`** — set in `docusaurus.config.js`; keep `url` matching the repo hostname.
- **`theme.config`** — DaisyUI plugin provides `office-light` (default) and `office-dark` themes.

```js
module.exports = {
  title: 'My Project Docs',
  url: 'https://myproject.docs',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onUnusedIcons: 'warn',
  theme: {
    customCss: require('./theme/src/css/custom.css'),
  },
};
```

---

## 5. Quick-Start Checklist

- [ ] `docs/` folder with categorized Markdown/MDX files
- [ ] `sidebars.js` defining navigation groups
- [ ] `docusaurus.config.js` with title, url, and GitHub preset
- [ ] Custom CSS in `theme/src/css/custom.css` for branding
- [ ] MDX used for interactive examples and admonitions
- [ ] Versioning setup via `docs:version` script for releases