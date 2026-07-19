# Go Best Practices: 1. Project Structure

## Source guidance

This example applies the **1. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Standard layout for anything beyond a single-file tool:
- **`internal/` by default.** Only promote a package out of `internal/` when something outside the module genuinely needs to import it.
- **`main.go` stays thin** — parse flags/config, wire dependencies, call into `internal/` packages. No business logic in `main`.
- **Package names: short, lowercase, no underscores** (`config`, not `Config` or `config_utils`). Avoid stutter — `config.Config` is fine, `config.ConfigStruct` is not.
- One package per directory; don't split a logical package across multiple directories.

## Example

A team applying **1. Project Structure** to a Go Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****`internal/` by default.** Only promote a package out of `internal/` when something outside the module genuinely needs to import it.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for go-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
