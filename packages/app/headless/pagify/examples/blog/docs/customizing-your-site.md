---
title: Customizing Your Site
description: How to customize themes, configuration, and more
date: 2024-01-25
category: tutorials
author: hieudoanm
---

# Customizing Your pagify Site

pagify is designed to work out of the box, but you can customize it when needed.

## Site Configuration

Add frontmatter to your `index.md` for site-wide settings:

```yaml
---
title: My Documentation
language: en
basePath: /my-repo # For GitHub Pages project sites
theme: auto # light | dark | auto
footer: '© 2024 My Project'
---
```

## Theme Colors

pagify uses CSS custom properties. Create a custom CSS file and override variables:

```css
:root {
  --primary: #2563eb;
  --secondary: #7c3aed;
  --radius: 8px;
}
```

## Navigation

Navigation is generated from your file structure automatically. Use `order` in frontmatter to control sorting:

```yaml
---
order: 1
label: Quick Start
---
```

## Custom Templates

For advanced customization, you can override the embedded templates (requires rebuilding from source).

## Base Path

For GitHub Pages project sites, set `basePath`:

```yaml
basePath: /my-repo
```

This prefixes all URLs and asset paths.

## Footer

Add a footer with Markdown support:

```yaml
footer: '© 2024 [My Project](https://example.com) — Built with pagify'
```

---

_More customization options coming soon!_
