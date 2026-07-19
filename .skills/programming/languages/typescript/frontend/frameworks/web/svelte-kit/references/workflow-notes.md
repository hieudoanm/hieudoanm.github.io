# Workflow notes

Focused reference for **sveltekit-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
