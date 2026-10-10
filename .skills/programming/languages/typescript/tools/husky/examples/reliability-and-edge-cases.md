# Husky: 10. Common Pitfalls

## Source guidance

This example applies the **10. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pre-v9 boilerplate left in `.husky/`** (`_/husky.sh`), which either errors or silently does nothing on v9.
- **Missing `"prepare": "husky"`**, so hooks work for the developer who set them up and nobody else.
- **A whole-repo lint in `pre-commit`**, which trains the team to use `--no-verify`.
- **Fixing but not aborting** — a hook without `set -e` reports problems and commits anyway.
- **Losing the executable bit**, especially across a Windows checkout or a `core.fileMode=false` clone.
- **Relying on a hook to enforce something CI does not also check**, which makes it a suggestion rather than a control.

## Example

A team applying **10. Common Pitfalls** to a Husky project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Pre-v9 boilerplate left in `.husky/`** (`_/husky.sh`), which either errors or silently does nothing on v9.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for husky-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
