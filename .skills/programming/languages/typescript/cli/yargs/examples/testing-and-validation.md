# Yargs CLI Design Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test the `handler` directly** with a built `argv` object (`{ key: "x", output: "json" }`), or invoke the full `.parseAsync()` against a fixture argv array with `.exitProcess(false)` and assert on output/`process.exitCode`.
- **Parametrize cases** for format combos and bad input (unknown flag, missing positional, `choices` violation) — each asserts a stable `stderr`/exit code.
- **Assert machine output** — `--output json` must parse with `JSON.parse` and match the documented shape; this is the scripting contract.

## Example

A team applying **9. Testing** to a Yargs CLI Design Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Test the `handler` directly** with a built `argv` object (`{ key: "x", output: "json" }`), or invoke the full `.parseAsync()` against a fixture argv array with `.exitProcess(false)` and assert on output/`process.exitCode`.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for yargs-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
