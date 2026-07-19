# JSR Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `deno.json` with name/version/exports; publish.exclude set
- [ ] Source-only package; no dist artifact in the tarball
- [ ] Cross-runtime compatibility tested (feature-detects at seams)
- [ ] CI tag-driven publish with `JSR_TOKEN` secret; `--dry-run` gate
- [ ] Version/tag alignment; changelog per release
- [ ] Lockfiles cover JSR deps; tokens least-privilege

## Example

A team applying **Quick-Start Checklist** to a JSR Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `deno.json` with name/version/exports; publish.exclude set**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for jsr-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
