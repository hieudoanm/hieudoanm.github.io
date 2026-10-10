# Xcode: Basic Usage

Best practices for building Apple apps in Xcode — projects vs workspaces, xcconfig, schemes, signing, DerivedData hygiene, LLDB debugging, SwiftUI previews, and xcodebuild parity with CI. Use when setting up or debugging an Xcode project.

## Scenario

Use this example as a starting point when applying **xcode-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Build Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```xcconfig
// Base.xcconfig
SWIFT_VERSION = 6.0
IPHONEOS_DEPLOYMENT_TARGET = 17.0
SWIFT_STRICT_CONCURRENCY = complete
ALWAYS_SEARCH_USER_PATHS = NO
ENABLE_USER_SCRIPT_SANDBOXING = YES
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
