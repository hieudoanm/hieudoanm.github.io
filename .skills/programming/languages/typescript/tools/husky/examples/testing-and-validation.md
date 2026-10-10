# Husky: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `husky` pinned to an exact version in `devDependencies`
- [ ] `"prepare": "husky"` present in `package.json`
- [ ] No `.husky/_` or `.huskyrc` present (v9 cleanup done)
- [ ] Every hook starts with `set -e` and is committed executable
- [ ] `pre-commit` runs only staged files, and completes in under 5 seconds
- [ ] Full typecheck and test suite run in `pre-push` and in CI
- [ ] CI re-runs every check the hooks enforce

## Example

A team applying **Quick-Start Checklist** to a Husky project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `husky` pinned to an exact version in `devDependencies`**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for husky-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
