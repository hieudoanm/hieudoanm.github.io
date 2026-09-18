---
name: jsr-best-practices
description: Best practices for publishing and consuming JavaScript packages on JSR (jsr.io) — the modern JS/TS registry conventions. Use when writing, structuring, or reviewing JSR packages — covers scope/name, deno assert/browser interop, publish flow, and CI.
---

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

- **JSR publishes TS/JS source (compiled at use) — no build artifact worship:**

```text
mod.ts            # public entry
lib/*.ts          # modules
mod_test.ts       # tests peer entry (excluded from publish)
```

- **Explicit `publish.exclude` keeps tests/docs private to the package.**
- **Dependency specifiers `jsr:` (other JSR) or `npm:` (npm interop) both valid — JSR resolves at install.**

---

## 3. Runtime Compatibility

- **Target runtime deltas tested: Deno (default), Node (`node:` modules), Browser (no `Deno.` globals):**
- **Guard feature-detects (`typeof Deno !== "undefined"`) at the seams; avoid unconditional `Deno.*` in public entry.**
- **`npx -y jsr publish --dry-run` for the guard check; `deno task check` before any release.**

---

## 4. Publishing & CI

- **Publish idempotent from CI on tags:**

```bash
npx jsr publish --allow-dirty    # newer versions ask clean tree
```

- **`deno publish` with `--token`/login flow; CI secrets host the JSR token.**

```yaml
- run: npx jsr publish
  env:
    JSR_TOKEN: ${{ secrets.JSR_TOKEN }}
```

- **Version bump + tag aligned (`v1.2.3` ↔ package version); CI is the only publisher.**

---

## 5. Consuming JSR

- **Consumers add via `jsr add @myorg/lib` (Deno) or `npx jsr add @myorg/lib` for Node-style:**

```ts
import { thing } from "jsr:@myorg/lib";   // Deno specifier
import { thing } from "npm:@myorg/lib";   // Node interop via npm-compat
```

- **Lock-graph (`deno.lock`/package-lock) covers JSR deps — integrity verified at install.**
- **Version ranges follow `@std` conventions (JSR versions in the specifier).**

---

## 6. Hygiene & Security

- **Token least-privilege; never commit `.env`/tokens.**
- **`jsr publish` provenance-updated for hardening (`SAST` in CI).**
- **Deprecate versions deliberately; keep exports stable (semver discipline).**
- **Docs meta (readme/`deno task doc`) shipped with the package.**

---

## General Rules of Thumb

- **`deno.json`/`jsr.json` defines name/exports/version; source-first publish.**
- **Test cross-runtime (Deno/Node/browser) at the seams.**
- **CI-only publishing on tags; `--dry-run` first.**
- **`jsr:`/`npm:` specifiers resolved at install; lockfile integrity.**
- **Least-priv tokens; semver + stable exports.**

---

## Quick-Start Checklist

- [ ] `deno.json` with name/version/exports; publish.exclude set
- [ ] Source-only package; no dist artifact in the tarball
- [ ] Cross-runtime compatibility tested (feature-detects at seams)
- [ ] CI tag-driven publish with `JSR_TOKEN` secret; `--dry-run` gate
- [ ] Version/tag alignment; changelog per release
- [ ] Lockfiles cover JSR deps; tokens least-privilege