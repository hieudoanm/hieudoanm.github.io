# Makefile Best Practices: 6. Quick-Start Checklist

## Source guidance

This example applies the **6. Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `.PHONY` declared for non-file targets
- [ ] `help` target with `##` comments
- [ ] Variables defined at top with `:=` or `?=`
- [ ] Tab-indented recipe lines
- [ ] No reliance on implicit rules

## Example

A team applying **6. Quick-Start Checklist** to a Makefile Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `.PHONY` declared for non-file targets**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for makefile-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
