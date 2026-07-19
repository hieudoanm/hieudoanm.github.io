# Overview

Focused reference for **sveltekit-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# SvelteKit

SvelteKit is the application framework for Svelte: it provides **file-based routing, server-side load functions, form actions, and progressive enhancement**, with a build step that splits server code from client code for you. Its defining trait is that a page is a **server component first and a client component second** — data loading, mutations, and rendering all default to the server. Practical SvelteKit work is about **choosing the narrowest privilege for each route, keeping server-only code out of the client bundle, and treating the no-JavaScript path as a real requirement**. Component-level conventions live in svelte.md.

_Verified against Svelte 5.57.1, SvelteKit 2.70.3, Vite 8, adapter-node 5.5.7, adapter-auto 7.0.1. Svelte 5 is runes-based._

---

## 1. Core Stack

- **Svelte 5 uses runes** — `$state`, `$derived`, `$effect`, `$props`. Runes work only in components, not in `.svelte.js` module scope, where stores remain the mechanism.
- **`$state` is deeply reactive via proxies; `$state.raw` opts out** for large arrays and objects that are reassigned rather than mutated. Reach for it when fine-grained updates get expensive.
- **`$derived` replaces `$:`,** and `$derived.by` takes a function for anything non-trivial.
- **`$effect` is for synchronisation with the outside world,** not for derived state. An effect that only reads and writes local state should be `$derived`.
- **TypeScript with `strict: true`.** SvelteKit generates route types, so `./$types` supplies `PageData` and `PageProps` with no hand-written interfaces.

## 2. Project Structure

- **Route files are `+page.svelte`, `+page.server.ts`, `+layout.svelte`, `+server.ts`.** The `.server` suffix is the security boundary: it never reaches the client.
- **Route groups `(marketing)` add layout without a URL segment.** Layouts do not re-render on navigation within their subtree.
- **Put data every page needs in a shared `+layout.server.ts`** and the rest in per-page `load`. A root layout that fetches everything makes every navigation pay for every request.
- **`src/lib/` for anything importable, `src/routes/` for route files.** The `$lib` alias is the only import-stable path.
- **Co-locate a feature's components, server modules, and types** under `src/lib/<feature>/`.
- **Use `+error.svelte` for cross-cutting error chrome** rather than repeating a shell in every page.

```text
src/
  hooks.server.ts              # handle() on every request, server-only
  lib/
    server/                    # db, secrets, external APIs
    components/
  routes/
    (marketing)/+layout.svelte
    (app)/+layout.server.ts
    dashboard/[id]/+page.server.ts
```
