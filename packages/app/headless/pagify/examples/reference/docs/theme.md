---
title: theme Package
description: Theme and template system
---

# theme Package

Owns every visual decision a pagify site makes: the HTML template, the
stylesheet and the progressive-enhancement scripts.

## Functions

### Default() (\*Theme, error)

Returns the theme embedded in the binary.

```go
theme, err := theme.Default()
```

## Theme

```go
type Theme struct {
    templates *template.Template
    assets    fs.FS
}
```

## AssetDir

The output-relative directory theme assets are written to. Templates
reference the same path, so the two cannot drift apart.

```go
const AssetDir = "assets"
```

## Embedded Assets

The default theme embeds:

- `template.html` — semantic document: header, nav, main, article, footer
- `styles.css` — design system built on CSS custom properties
- `script.js` — theme toggle, mobile drawer, code-block copy buttons
- `search.js` — client-side search over the generated index
- `favicon.ico` / `favicon.svg`

## Adding a Theme

A theme is a template plus an asset tree. Embed it the way `theme.Default`
does and resolve it by name in `build.Build`. Nothing in `internal/site` or
`internal/markdown` needs to change, because neither knows a theme exists.

## Related

- [build Package](build.md) — how themes are applied during a build
- [site Package](site.md) — content discovery and navigation
- [markdown Package](markdown.md) — parsing and rendering