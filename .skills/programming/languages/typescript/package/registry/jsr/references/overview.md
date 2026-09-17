# Overview

Focused reference for **jsr-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# JSR Best Practices

JSR (`jsr.io`) is **a modern registry for TypeScript-first packages, designed to work with Deno, Node, and the browser** — publishing via `jsr publish` with `deno.json`/`jsr.json` metadata and a source-driven package (JSR is native to JSR-typed Deno; interop via `npm:` and `jsr:` specifiers). Practical JSR leans on **a clean scope/name, an explicit `deno.json` `{ exports, name, version }`, publishing from CI with `--allow-dirty` gates, and compatibility tested across runtimes** — the package is source-first; the registry verifies metadata.

---

## 1. Package Metadata

- **`deno.json` (or `jsr.json`) defines the JSR package surface:**

```json
{
  "name": "@myorg/lib",
  "version": "1.0.0",
  "exports": "./mod.ts",
  "publish": { "exclude": ["tests/", "dist/"] }
}
```

- **`exports` explicit entry points; excluded dirs keep the package lean/source-clean.**
- **Name/scope relevant (`@org/pkg`); keep `version` aligned with tags.**

---

## 2. Source-First Structure
