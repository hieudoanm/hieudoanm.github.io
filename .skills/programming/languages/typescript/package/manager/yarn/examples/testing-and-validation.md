# Yarn Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `packageManager` pinned via corepack; `.yarnrc.yml` committed
- [ ] `yarn.lock` committed; `--immutable` in CI
- [ ] PnP/classic choice documented; tooling verified on that mode
- [ ] Workspaces layout; `yarn workspaces foreach` targeting
- [ ] `dlx` for one-off tools; `prepublishOnly` runs checks
- [ ] CI audit gate; `.yarn/cache` strategy; constraints lint active

## Example

A team applying **Quick-Start Checklist** to a Yarn Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `packageManager` pinned via corepack; `.yarnrc.yml` committed**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for yarn-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
