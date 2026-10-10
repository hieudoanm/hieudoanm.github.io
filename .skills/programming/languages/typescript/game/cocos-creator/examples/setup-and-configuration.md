# Cocos Creator Best Practices: 1. Project & Directory Structure

## Source guidance

This example applies the **1. Project & Directory Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Cap-everything kinds cleanly** — assets by functional folder, scripts colocated with their scene/prefab:
- **One component per file; name it after behavior** (`PlayerController.ts`, `WaveSpawner.ts`), not `Update1.ts`.
- **Pure TS logic (math, state machines, services) in `scripts/` without `cc` imports** — unit-testable separate from the engine.
- **`resources`/`bundle` discipline** — everything referenced by prefab should be a serialized asset reference, not `resources.load` last-minute.

## Example

A team applying **1. Project & Directory Structure** to a Cocos Creator Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Cap-everything kinds cleanly** — assets by functional folder, scripts colocated with their scene/prefab:**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for cocos-creator-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
