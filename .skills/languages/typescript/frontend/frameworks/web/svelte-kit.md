---
name: sveltekit-best-practices
description: Best practices for building SvelteKit applications — server-first load functions, form actions, streaming, route groups, adapters, and the runes/SSR boundaries. Use when creating, structuring, or debugging a SvelteKit app.
---

# SvelteKit

SvelteKit is the application framework for Svelte: it provides **file-based routing, server-side load functions, form actions, and progressive enhancement**, with a build step that splits server code from client code for you. Its defining trait is that a page is a **server component first and a client component second** — data loading, mutations, and rendering all default to the server. Practical SvelteKit work is about **choosing the narrowest privilege for each route, keeping server-only code out of the client bundle, and treating the no-JavaScript path as a real requirement**. Component-level conventions live in [svelte.md](./svelte.md).

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

- **`$lib/server` is enforced by the bundler.** Importing it from client code is a build error, which is what makes the boundary trustworthy.

## 3. Rendering & Data Loading

- **A `+page.ts` `load` runs on both server and client; a `+page.server.ts` `load` runs only on the server.** Secrets, database access, and privileged reads belong in the `.server` file.
- **Return an authorisation-safe shape.** Serialising a whole row leaks fields the client has no business holding.
- **Return data, not functions, from a universal `load`** unless the function is genuinely client-side. A returned function behaves differently depending on where it is defined.
- **Use `depends` in a universal `load`** so navigating back refetches instead of serving stale data.
- **Streaming with promises is the default:** return promises from `load` and await them in the component, so the page renders as each resolves.
- **`await parent()` composes layouts and pages.** Ignoring it and re-fetching in a child is the most common N+1 in a SvelteKit app.
- **Set `ssr`, `csr`, and `prerender` per route explicitly.** A static shell wants `csr = false`; a fully static page wants `prerender = true`.
- **Set `trailingSlash` once in the root config,** matched to the hosting platform.

```ts
// +page.server.ts — secrets stay here, never serialised
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
  if (!locals.user) error(401, 'Sign in required');
  const project = await db.projects.find(params.id);
  if (!project || project.ownerId !== locals.user.id) error(404, 'Not found');
  return { project };
};
```

## 4. Mutations & Form Actions

- **Use a form action for every mutation.** `<form method="POST">` works with JavaScript disabled, and `use:enhance` upgrades it in place when JS is available.
- **Validate inside the action, never in the client.** A client check is a UX affordance; the action is the only enforcement point.
- **`fail(400, data)` returns validation errors** so submitted values repopulate the form without a reload.
- **Throw `redirect(...)` and `error(...)`** rather than returning a value — a returned value leaves a `200` on the page with no navigation.
- **Set `use:enhance` options deliberately:** reset on success, show failures inline, disable submit while in flight to prevent double submission.
- **Use `+server.ts` only for non-HTML endpoints** — webhooks, JSON APIs for other clients. Using it for your own pages discards progressive enhancement.

```ts
// +page.server.ts
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals }) => {
    const data = await request.formData();
    const name = String(data.get('name') ?? '').trim();
    if (!name) return fail(400, { name, error: 'Name is required' });
    await db.projects.create({ name, ownerId: locals.user.id });
    redirect(303, '/dashboard');
  },
};
```

## 5. Hooks & Middleware

- **`handle` in `hooks.server.ts` runs on every request and can wrap it.** The returned `resolve` attaches locals to the event for downstream loads.
- **Populate `event.locals` in `handle` and read it in loads and actions.** It is the supported way to do request-scoped auth resolution without a global.
- **Use the second `handle` argument to short-circuit** by returning a `Response` directly.
- **Order the cheapest check first.** A redirect for an unauthenticated user belongs before a database call.
- **Keep `handle` lean.** Anything slow there delays every request, including navigation that looks static.
- **`config.kit.csrf.checkOrigin` is on by default.** Keep it unless a cross-origin form genuinely requires disabling it, and know what that removes.
- **`handle` does not protect prerendered entries,** which can be served without the hook running. Never put an authorisation check only in `handle` and assume a prerendered page is guarded.

## 6. Adapters & Deployment

- **`adapter-auto` is the default** and is fine for serverless and edge platforms. Choose a concrete adapter when you need control.
- **`adapter-node` produces a plain Node server** — no serverless timeouts, no platform quirks, and you own the process, signals, and graceful shutdown.
- **`adapter-static` produces pure static output** and requires every route to be prerenderable; a dynamic route without entries fails the build.
- **`BASE_PATH` configures a subpath deployment.** Build URLs from `$app/paths`, never by hand, so a base path change is one edit.
- **Set the adapter's `out` directory, then point the platform at it.** The adapter does not deploy anything.
- **Turn on `compress` and write a real CSP** rather than leaving the defaults.
- **`prerender.entries` and `handleHttpError` decide what a build failure means.** A route that throws during prerender should fail the build, not ship broken.

## 7. Performance

- **Ship less JavaScript.** Every interactive `+page.svelte` is a hydration cost; a static page needs `csr = false` and no client runes.
- **Prefer CSS and HTML over a client-side library** for anything that does not need state.
- **Use `$state.raw` with explicit reassignment** to avoid proxy overhead on large collections.
- **Give `{#each}` a stable key** (`(item.id)`) to avoid re-creating DOM and preserve component state.
- **Do not wrap a cheap derived value in a template that reads a large list** without checking the cost per dependency change.
- **Use `$app/state` or `$app/stores` for navigation state** rather than wiring your own `popstate` and `afterNavigate` listeners.

## 8. Styling

- **Svelte's scoped styles are the default and they work.** Keep component CSS in the component unless a style is genuinely shared.
- **`:global()` is an escape hatch, not a default.** Reaching for it signals a shared stylesheet that should be extracted.
- **Prefer Tailwind/DaisyUI utilities in markup** over mixing them with `@apply` inside components — the two fight when the design system changes.
- **CSS custom properties for theme values,** so dark mode is a variable change rather than a class sweep.

## 9. SEO & Accessibility

- **Metadata lives in `<svelte:head>`;** return `title` and `description` from a universal `load` so the root layout renders them once.
- **Return real HTTP status codes.** `error(404, ...)` and `redirect(301, ...)` are how a crawler sees a missing page; a client-side message does not.
- **Prerender what matters for SEO,** and generate the sitemap from the same source of truth as the routes.
- **Svelte's a11y warnings catch a real class of defects** but do not replace keyboard testing.
- **Label every control and wire action errors with `aria-describedby`** — the `fail` data is already in the component, so the wiring is cheap.
- **Announce async state changes** with a `role="status"` region so a screen-reader user learns a save succeeded.

## 10. Testing

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
