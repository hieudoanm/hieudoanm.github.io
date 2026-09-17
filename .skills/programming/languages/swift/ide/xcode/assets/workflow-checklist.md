# Xcode: Workflow Checklist

A practical run sheet for applying [Xcode](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Versions & Compatibility: **Xcode 26.6 is the current stable; Xcode 27 is beta.** Stable ships the iOS/macOS 26 SDKs; the 27 beta carries the iOS 27 SDK. Do not build release binaries on a beta toolchain
- [ ] 1. Versions & Compatibility: **The compiler is Swift 6.2, and the language mode is a separate choice.** Swift 6 strict concurrency is opt-in per target via SWIFT_VERSION; Swift 5 mode still compiles under the 6.2 toolchain
- [ ] 2. Projects & Workspaces: **A .xcodeproj is a directory, not a file.** It appears as one item in Finder but is a package containing project.pbxproj. Never merge two projects by pasting that file
- [ ] 2. Projects & Workspaces: **A .xcworkspace can hold projects and packages together.** If you open the .xcodeproj instead of the .xcworkspace, your Swift packages and pods will appear to be missing. This is the most common Xcode confusion
- [ ] 3. Build Configuration: **Move settings into .xcconfig files.** Configuration that lives in the IDE is invisible to review and impossible to diff meaningfully
- [ ] 3. Build Configuration: **One base .xcconfig plus per-configuration overrides.** Settings cascade: project → target → xcconfig, and the more specific wins
- [ ] 4. Schemes: **A scheme is the unit of "what do I run".** Build action, test action, launch arguments, and which target is the entry point all live there
- [ ] 4. Schemes: **Share your schemes** (Product → Scheme → Manage Schemes → Shared). A personal scheme is invisible to your team, which is why "works on my machine" happens at the scheme level too
- [ ] 5. Signing: **Automatic signing needs a team and a bundle ID registered in the portal.** It handles development builds; distribution still needs a profile or App Store Connect
- [ ] 5. Signing: **Set DEVELOPMENT_TEAM in the xcconfig, not per-machine.** Otherwise CI machines and new hires cannot build

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
