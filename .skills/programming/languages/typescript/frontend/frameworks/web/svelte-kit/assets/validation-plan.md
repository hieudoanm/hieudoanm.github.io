# SvelteKit: Validation Plan

Use this plan to verify work guided by [SvelteKit](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **adapter-auto is the default** and is fine for serverless and edge platforms. Choose a concrete adapter when you need control
- [ ] **adapter-node produces a plain Node server** — no serverless timeouts, no platform quirks, and you own the process, signals, and graceful shutdown
- [ ] **adapter-static produces pure static output** and requires every route to be prerenderable; a dynamic route without entries fails the build
- [ ] **BASE_PATH configures a subpath deployment.** Build URLs from $app/paths, never by hand, so a base path change is one edit
- [ ] **Set the adapter's out directory, then point the platform at it.** The adapter does not deploy anything
- [ ] **Turn on compress and write a real CSP** rather than leaving the defaults
- [ ] **prerender.entries and handleHttpError decide what a build failure means.** A route that throws during prerender should fail the build, not ship broken
- [ ] **Ship less JavaScript.** Every interactive +page.svelte is a hydration cost; a static page needs csr = false and no client runes
- [ ] **Prefer CSS and HTML over a client-side library** for anything that does not need state
- [ ] **Use $state.raw with explicit reassignment** to avoid proxy overhead on large collections

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
