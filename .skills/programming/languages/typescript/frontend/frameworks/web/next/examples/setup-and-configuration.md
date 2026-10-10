# Next.js Best Practices: 2. Project Structure

## Source guidance

This example applies the **2. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **App Router (`app/`)** for new projects — supports React Server Components, streaming, and better data fetching
- **Route groups `()`** for organization without affecting URL structure
- **Component colocation** — keep components close to where they're used
- **Server vs Client Components** — default to Server Components, use `"use client"` only when needed

## Example

A team applying **2. Project Structure** to a Next.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****App Router (`app/`)** for new projects — supports React Server Components, streaming, and better data fetching**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for nextjs-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
