# SvelteKit: 11. Common Pitfalls

## Scenario

A project is working on **11. common pitfalls** for SvelteKit. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Privileged data in a universal `+page.ts` load,** which serialises it to the client.
- **A `+page.ts` load that mutates,** producing an uncacheable, unbookmarkable state-changing GET.
- **Re-fetching in a child page that should `await parent()`.**
- **`prerender = true` on a dynamic route with no `entries`,** which yields an empty build.
- **Assuming `handle` guards a prerendered page.**
- **Client-side-only validation,** which is a suggestion rather than a control.
- **A root layout that loads everything,** making every navigation wait on every request.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **11. Common Pitfalls** section of [SKILL.md](../SKILL.md).
