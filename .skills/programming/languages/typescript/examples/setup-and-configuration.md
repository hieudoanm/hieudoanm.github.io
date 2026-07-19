# TypeScript Best Practices: 1. Project Structure & Tooling

## Source guidance

This example applies the **1. Project Structure & Tooling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`pnpm` over `npm`/`yarn`** — strict, fast, and its content-addressed store makes installs deterministic and CI-friendly; commit `pnpm-lock.yaml`.
- **`src/` layout, `moduleResolution: "bundler"`** with modern tooling (Vite/Vitest/tsx); each module has one clear responsibility.
- **ESLint flat config + Prettier** in CI — format and lint are gates, not suggestions; run both on every PR.
- One public entrypoint per package (`src/index.ts` re-exporting), explicit `exports` map in `package.json`.

## Example

A team applying **1. Project Structure & Tooling** to a TypeScript Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****`pnpm` over `npm`/`yarn`** — strict, fast, and its content-addressed store makes installs deterministic and CI-friendly; commit `pnpm-lock.yaml`.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for typescript-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
