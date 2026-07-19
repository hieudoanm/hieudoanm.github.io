# npm Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] package.json minimal: `engines`, `type`, honest deps vs dev
- [ ] `package-lock.json` committed; `npm ci` in CI
- [ ] `npm run` scripts standard (build/test/lint/typecheck)
- [ ] Workspaces layout coherent; per-package dependency honesty
- [ ] `files` whitelist + `prepublishOnly` set before publish
- [ ] CI `npm audit` gate; scoped versions pinned where shared

## Example

A team applying **Quick-Start Checklist** to a npm Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] package.json minimal: `engines`, `type`, honest deps vs dev**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for npm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
