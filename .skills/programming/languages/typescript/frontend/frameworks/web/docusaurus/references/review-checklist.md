# Review checklist

Focused reference for **docusaurus-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
