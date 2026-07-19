# Unity Best Practices: 1. Project & Folder Structure

## Source guidance

This example applies the **1. Project & Folder Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Folders as categories, names as contracts:**
- **One component per file, named after behavior** (`Health.cs`, `PlayerMovement.cs`), never `Manager(Script)2.cs`.
- **Pure C# (`Core/`) without `UnityEngine` types where possible** — unit-testable, engine-independent logic.
- **`Resources/` used sparingly** — build-time references and bundles preferred; `Resources.Load` is a last resort (globally copied + unmanaged).

## Example

A team applying **1. Project & Folder Structure** to a Unity Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Folders as categories, names as contracts:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for unity-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
