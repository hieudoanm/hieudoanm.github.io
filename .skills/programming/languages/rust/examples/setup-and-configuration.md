# Rust Best Practices: 1. Project Structure

## Source guidance

This example applies the **1. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Binary + library split:** if a binary has any reusable logic, put it in `lib.rs` and have `main.rs` just call into it — makes integration testing and future reuse trivial.
- **Workspaces** (`[workspace]` in a root `Cargo.toml`) for multi-crate projects — split by genuine boundary (core logic vs CLI vs FFI bindings), not arbitrarily.
- Module names: `snake_case`, matching file/directory names.

## Example

A team applying **1. Project Structure** to a Rust Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Binary + library split:** if a binary has any reusable logic, put it in `lib.rs` and have `main.rs` just call into it — makes integration testing and future reuse trivial.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for rust-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
