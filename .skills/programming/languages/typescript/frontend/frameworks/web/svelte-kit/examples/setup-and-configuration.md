# SvelteKit: 2. Project Structure

## Source guidance

This example applies the **2. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Route files are `+page.svelte`, `+page.server.ts`, `+layout.svelte`, `+server.ts`.** The `.server` suffix is the security boundary: it never reaches the client.
- **Route groups `(marketing)` add layout without a URL segment.** Layouts do not re-render on navigation within their subtree.
- **Put data every page needs in a shared `+layout.server.ts`** and the rest in per-page `load`. A root layout that fetches everything makes every navigation pay for every request.
- **`src/lib/` for anything importable, `src/routes/` for route files.** The `$lib` alias is the only import-stable path.

## Example

A team applying **2. Project Structure** to a SvelteKit project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Route files are `+page.svelte`, `+page.server.ts`, `+layout.svelte`, `+server.ts`.** The `.server` suffix is the security boundary: it never reaches the client.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for sveltekit-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
