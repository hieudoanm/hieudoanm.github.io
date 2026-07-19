# Tauri Best Practices: 2. Project Structure

## Source guidance

This example applies the **2. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Clear separation** — Rust backend in `src-tauri/`, web frontend in `src/`
- **Command modules** — organize Tauri commands by domain
- **State management** — centralize application state in Rust
- **Type safety** — share types between Rust and frontend via generated types

## Example

A team applying **2. Project Structure** to a Tauri Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Clear separation** — Rust backend in `src-tauri/`, web frontend in `src/`**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for tauri-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
