# Electron Best Practices: 2. Project Structure

## Source guidance

This example applies the **2. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Clear separation** — main process, renderer process, and preload scripts
- **IPC organization** — organize IPC handlers by domain
- **Type safety** — share types between main and renderer processes
- **Security boundaries** — preload scripts act as secure bridges

## Example

A team applying **2. Project Structure** to a Electron Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Clear separation** — main process, renderer process, and preload scripts**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for electron-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
