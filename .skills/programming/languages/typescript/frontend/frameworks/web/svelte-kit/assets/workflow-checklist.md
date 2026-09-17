# SvelteKit: Workflow Checklist

A practical run sheet for applying [SvelteKit](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: **Svelte 5 uses runes** — $state, $derived, $effect, $props. Runes work only in components, not in .svelte.js module scope, where stores remain the mechanism
- [ ] 1. Core Stack: **$state is deeply reactive via proxies; $state.raw opts out** for large arrays and objects that are reassigned rather than mutated. Reach for it when fine-grained updates get expensive
- [ ] 2. Project Structure: **Route files are +page.svelte, +page.server.ts, +layout.svelte, +server.ts.** The .server suffix is the security boundary: it never reaches the client
- [ ] 2. Project Structure: **Route groups (marketing) add layout without a URL segment.** Layouts do not re-render on navigation within their subtree
- [ ] 3. Rendering & Data Loading: **A +page.ts load runs on both server and client; a +page.server.ts load runs only on the server.** Secrets, database access, and privileged reads belong in the .server file
- [ ] 3. Rendering & Data Loading: **Return an authorisation-safe shape.** Serialising a whole row leaks fields the client has no business holding
- [ ] 4. Mutations & Form Actions: **Use a form action for every mutation.** <form method="POST"> works with JavaScript disabled, and use:enhance upgrades it in place when JS is available
- [ ] 4. Mutations & Form Actions: **Validate inside the action, never in the client.** A client check is a UX affordance; the action is the only enforcement point
- [ ] 5. Hooks & Middleware: **handle in hooks.server.ts runs on every request and can wrap it.** The returned resolve attaches locals to the event for downstream loads
- [ ] 5. Hooks & Middleware: **Populate event.locals in handle and read it in loads and actions.** It is the supported way to do request-scoped auth resolution without a global

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
