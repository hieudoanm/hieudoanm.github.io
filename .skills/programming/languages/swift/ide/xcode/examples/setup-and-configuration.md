# Xcode: 3. Build Configuration

## Source guidance

This example applies the **3. Build Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Move settings into `.xcconfig` files.** Configuration that lives in the IDE is invisible to review and impossible to diff meaningfully.
- **One base `.xcconfig` plus per-configuration overrides.** Settings cascade: project → target → xcconfig, and the more specific wins.
- **Set `SWIFT_VERSION`, deployment target, and signing mode in the xcconfig**, not through the GUI. The GUI writes into `project.pbxproj` where it will conflict.
- **`$(inherited)` is what lets the project-level value flow through.** Omitting it in a target-level override silently discards everything above it — a frequent source of "why is my other flag gone".

## Example

This excerpt is from the cited **3. Build Configuration** section.

```xcconfig
// Base.xcconfig
SWIFT_VERSION = 6.0
IPHONEOS_DEPLOYMENT_TARGET = 17.0
SWIFT_STRICT_CONCURRENCY = complete
ALWAYS_SEARCH_USER_PATHS = NO
ENABLE_USER_SCRIPT_SANDBOXING = YES
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for xcode-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
