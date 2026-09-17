# GitHub Packages Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `@myorg/pkg` + `publishConfig` registry/access set
- [ ] `.npmrc` scope → `npm.pkg.github.com`; tokens via env/secrets
- [ ] CI publish workflow with tag trigger + `packages: write`
- [ ] `GITHUB_TOKEN`/PAT scopes minimal (read/write split appropriately)
- [ ] `npm ci` + build + publish gated; `files` whitelist present
- [ ] Version bump via git tags; release notes per version

## Example

A team applying **Quick-Start Checklist** to a GitHub Packages Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `@myorg/pkg` + `publishConfig` registry/access set**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for github-packages-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
