---
title: API Reference
language: en
theme: light
footer: '© 2024 API Reference'
---

# API Reference

Complete API reference for pagify's internal packages.

## Packages

- [build](build.md) — Site building pipeline
- [markdown](markdown.md) — Markdown rendering
- [site](site.md) — Content discovery and navigation
- [theme](theme.md) — Theme and template system
- [server](server.md) — Local development server

## Quick Reference

| Function        | Package  | Description              |
| --------------- | -------- | ------------------------ |
| `Build()`       | build    | Main build entry point   |
| `NewRenderer()` | markdown | Create Markdown renderer |
| `Discover()`    | site     | Find all content files   |
| `Default()`     | theme    | Get default theme        |
| `Serve()`       | server   | Start dev server         |

## Version

Current version: **v0.1.0**

## Related

- [build](build.md)
- [markdown](markdown.md)
- [site](site.md)
- [theme](theme.md)
- [server](server.md)