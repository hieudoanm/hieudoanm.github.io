# Review checklist

Focused reference for **sveltekit-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`+page.server.ts` loads and form actions are unit-testable without a browser.** This is where the real behaviour lives.
- **Use `@testing-library/svelte`** with the Svelte 5 runes-compatible setup, and avoid asserting on implementation details.
- **`vitest` with `@sveltejs/vite-plugin-svelte` in the app's own Vite config,** so transforms match the build.
- **Playwright for the few flows that need a real server** — login, form submission, redirect chains. A full E2E suite here is expensive for little return.
- **Test the `fail(400)` branch explicitly.** It is the path users hit and the one that goes untested.

## 11. Common Pitfalls

- **Privileged data in a universal `+page.ts` load,** which serialises it to the client.
- **A `+page.ts` load that mutates,** producing an uncacheable, unbookmarkable state-changing GET.
- **Re-fetching in a child page that should `await parent()`.**
- **`prerender = true` on a dynamic route with no `entries`,** which yields an empty build.
- **Assuming `handle` guards a prerendered page.**
- **Client-side-only validation,** which is a suggestion rather than a control.
- **A root layout that loads everything,** making every navigation wait on every request.
- **Hand-built absolute URLs,** which break under a `BASE_PATH` deployment.
- **Disabling the CSRF check** without knowing what it protected.
- **Using a store in a runes component out of habit,** when `$state` fits.

## General Rules of Thumb

- Server first: `+page.server.ts` for data and privileged reads, `+page.ts` only for what the client needs.
- Form actions for every mutation, with server-side validation and explicit `fail`/`redirect`/`error`.
- `handle` populates `event.locals`; downstream loads and actions read it from there.
- Explicit `ssr`/`csr`/`prerender` per route; the no-JavaScript path is a requirement, not a fallback.
- `$lib/server` for secrets — the bundler enforces it, so trust the boundary.
- `adapter-auto` by default, `adapter-node` for control, `adapter-static` for pure static.
- Prerender what matters for SEO, return real status codes, keep the root layout lean.
- Unit-test actions and server loads; spend Playwright budget only on critical flows.

## Quick-Start Checklist

- [ ] `strict: true` in the TypeScript config; route types used via `./$types`
- [ ] Server-only code under `$lib/server`; no secrets returned from a universal `load`
- [ ] Every mutation is a form action, validated server-side, failing with `fail`
- [ ] `await parent()` used where a page needs a layout's data
- [ ] `ssr`, `csr`, and `prerender` set deliberately on each route
- [ ] Prerendered entries verified as actually protected, not assumed
- [ ] `handle` is lean and populates `event.locals`
- [ ] CSP written in `svelte.config.js` rather than left at defaults
- [ ] Adapter chosen deliberately; base path handled via `$app/paths`
- [ ] `{#each}` blocks use stable keys; large state uses `$state.raw`
- [ ] Metadata rendered from `load`; 404s and redirects use real status codes
- [ ] Form errors wired with `aria-describedby`; async results announced
- [ ] Server loads and actions unit-tested; Playwright limited to critical flows
- [ ] `pnpm build` passes with no unhandled prerender errors
