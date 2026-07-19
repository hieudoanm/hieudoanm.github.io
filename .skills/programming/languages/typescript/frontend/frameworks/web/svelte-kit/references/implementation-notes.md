# Implementation notes

Focused reference for **sveltekit-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
