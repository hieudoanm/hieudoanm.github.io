# nvm: 9. Common Pitfalls

## Source guidance

This example applies the **9. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Running `nvm` from `sh`, a Makefile, or a non-interactive shell**, where the function was never defined.
- **Using a production daemon on an nvm Node** — the service user cannot reach `~/.nvm`.
- **Depending on global packages** that exist only under one version.
- **No `.nvmrc`, or one holding an exact patch** that you then have to bump by hand forever.
- **Floating to `node` or Current** instead of the LTS line.
- **`.nvmrc` in a subdirectory of a monorepo** while CI reads the root one.
- **Trusting the `nvm run` fallback** when no `.nvmrc` resolved, in 0.40.

## Example

A team applying **9. Common Pitfalls** to a nvm project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Running `nvm` from `sh`, a Makefile, or a non-interactive shell**, where the function was never defined.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for nvm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
