# Docusaurus Best Practices: 1. Project Structure

## Source guidance

This example applies the **1. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`docs/` folder** — place all Markdown/MDX files under `docs/`, organized by category folders (`intro`, `api`, `guides`).
- **`theme/` folder** — customize the DaisyUI theme or add custom `src/css/custom.css` for branding overrides.
- **`sidebars.js`** — define sidebar navigation groups, labels, and collapsed state per folder.

## Example

A team applying **1. Project Structure** to a Docusaurus Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****`docs/` folder** — place all Markdown/MDX files under `docs/`, organized by category folders (`intro`, `api`, `guides`).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for docusaurus-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
