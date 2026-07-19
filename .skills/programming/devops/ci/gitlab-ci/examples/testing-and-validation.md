# GitLab CI/CD Best Practices: 5. Quick-Start Checklist

## Source guidance

This example applies the **5. Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Stages defined in logical order
- [ ] Jobs use `image` and `tags` consistently
- [ ] Secrets stored in CI/CD Variables, not in YAML
- [ ] Artifacts configured with `expire_in`
- [ ] Include templates for reuse where applicable

## Example

A team applying **5. Quick-Start Checklist** to a GitLab CI/CD Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Stages defined in logical order**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for gitlab-ci-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
