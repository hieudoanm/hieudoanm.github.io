# Swift Argument Parser Best Practices: 5. Quick-Start Checklist

## Source guidance

This example applies the **5. Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `@main` struct conforming to `ParsableCommand`
- [ ] `@Argument` for positional params, `@Option` for named flags, `@Flag` for booleans
- [ ] Validation with `require()` for preconditions
- [ ] `env` for environment variable fallbacks
- [ ] Shell completions configured via `.custom` or `.list()`
- [ ] `--version` flag present (use `VersionOption`)
- [ ] Help text filled in for all properties

## Example

A team applying **5. Quick-Start Checklist** to a Swift Argument Parser Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `@main` struct conforming to `ParsableCommand`**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for swift-argument-parser-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
