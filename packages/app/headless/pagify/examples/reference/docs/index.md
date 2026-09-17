---
title: API Reference
language: en
theme: light
footer: '© 2024 API Reference'
---

# API Reference

Complete API reference for pagify's internal packages.

## Packages

- [build](./build/) — Site building pipeline
- [markdown](./markdown/) — Markdown rendering
- [site](./site/) — Content discovery and navigation
- [theme](./theme/) — Theme and template system
- [server](./server/) — Local development server

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
