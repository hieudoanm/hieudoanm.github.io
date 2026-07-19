# iPadOS Development: 1. Target Setup

## Source guidance

This example applies the **1. Target Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Enable the iPad device family** (`TARGETED_DEVICE_FAMILY = "1,2"`) and verify the provisioning profile covers it.
- **Treat the universal target as the default.** A separate iPad-only target duplicates code and doubles maintenance for a layout you can express in SwiftUI.
- **Declare all four orientations** in `Info.plist`; iPad apps are expected to rotate into every one.
- **Set `UIRequiresFullscreen` to `false`** — the key is deprecated in iOS 26 and full-screen opt-out is no longer respected.
- **Verify window resizing on a real iPad early**, not at release. Simulator window drag is a partial substitute, never a complete one.

## Example

A team applying **1. Target Setup** to a iPadOS Development project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Enable the iPad device family** (`TARGETED_DEVICE_FAMILY = "1,2"`) and verify the provisioning profile covers it.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for ipados-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
