# SvelteKit: 10. Testing

## Scenario

A project is working on **10. testing** for SvelteKit. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **`+page.server.ts` loads and form actions are unit-testable without a browser.** This is where the real behaviour lives.
- **Use `@testing-library/svelte`** with the Svelte 5 runes-compatible setup, and avoid asserting on implementation details.
- **`vitest` with `@sveltejs/vite-plugin-svelte` in the app's own Vite config,** so transforms match the build.
- **Playwright for the few flows that need a real server** — login, form submission, redirect chains. A full E2E suite here is expensive for little return.
- **Test the `fail(400)` branch explicitly.** It is the path users hit and the one that goes untested.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **10. Testing** section of [SKILL.md](../SKILL.md).
