# iOS Development: 1. Target Setup & Configuration

## Source guidance

This example applies the **1. Target Setup & Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One universal target** (`TARGETED_DEVICE_FAMILY = "1,2"`) unless iPad is genuinely out of scope — see ipados.md for what universal costs you.
- **Every capability change edits the `.entitlements` file and the App ID**, in that order. A capability enabled in Xcode but not provisioned fails at runtime, not build time.
- **Ship an `Info.plist` usage description for every permission you request.** A missing `NSCameraUsageDescription` is an instant crash on first access, not a review rejection.

## Example

A team applying **1. Target Setup & Configuration** to a iOS Development project treats this guidance as a review gate. It checks whether the current implementation satisfies ****One universal target** (`TARGETED_DEVICE_FAMILY = "1,2"`) unless iPad is genuinely out of scope — see ipados.md for what universal costs you.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for ios-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
