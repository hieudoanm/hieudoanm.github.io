# clap.rs CLI Design Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Consistent noun-verb or verb-noun structure across the whole tree
- [ ] Doc comments on every command/subcommand (become help text)
- [ ] `after_help` examples added for non-trivial commands
- [ ] Constrained choices use `value_enum`, not free strings
- [ ] `--output`/`-o` supports at least `table` and `json`
- [ ] Errors go to stderr via `eprintln!`, human output to stdout
- [ ] Color via `anstream`/`anstyle`, respecting `NO_COLOR` and TTY detection

## Example

A team applying **Quick-Start Checklist** to a clap.rs CLI Design Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Consistent noun-verb or verb-noun structure across the whole tree**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for clap-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
