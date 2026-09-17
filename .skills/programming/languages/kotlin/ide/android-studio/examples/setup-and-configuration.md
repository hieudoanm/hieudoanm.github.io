# Android Studio: 3. Project & Module Structure

## Source guidance

This example applies the **3. Project & Module Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One `app` module, plus library modules only when the boundary earns it.** Every module costs build time, and Studio's indexer degrades as the module count grows.
- **Use `app/src/main`, `debug`, and `release` source sets deliberately.** `debug`-only manifest entries (cleartext traffic, the `applicationIdSuffix`) keep test config out of release.
- **Keep the `AndroidManifest.xml` minimal and let the manifest merger do its job.** Every module declaring `<application>` attributes is a merge-conflict source.

## Example

A team applying **3. Project & Module Structure** to a Android Studio project treats this guidance as a review gate. It checks whether the current implementation satisfies ****One `app` module, plus library modules only when the boundary earns it.** Every module costs build time, and Studio's indexer degrades as the module count grows.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for android-studio-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
