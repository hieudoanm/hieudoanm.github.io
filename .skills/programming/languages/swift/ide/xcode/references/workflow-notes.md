# Workflow notes

Focused reference for **xcode-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Build Configuration

- **Move settings into `.xcconfig` files.** Configuration that lives in the IDE is invisible to review and impossible to diff meaningfully.
- **One base `.xcconfig` plus per-configuration overrides.** Settings cascade: project → target → xcconfig, and the more specific wins.
- **Set `SWIFT_VERSION`, deployment target, and signing mode in the xcconfig**, not through the GUI. The GUI writes into `project.pbxproj` where it will conflict.
- **`$(inherited)` is what lets the project-level value flow through.** Omitting it in a target-level override silently discards everything above it — a frequent source of "why is my other flag gone".
- **Debug vs Release is not just optimisation.** Release enables whole-module optimisation and strips symbols; Debug keeps `-Onone` and full debug info. Never ship a Release build that was compiled with Debug settings.

```xcconfig
// Base.xcconfig
SWIFT_VERSION = 6.0
IPHONEOS_DEPLOYMENT_TARGET = 17.0
SWIFT_STRICT_CONCURRENCY = complete
ALWAYS_SEARCH_USER_PATHS = NO
ENABLE_USER_SCRIPT_SANDBOXING = YES
```

- **Add a `.xcconfig` to the project with `Set Configuration Base` per configuration**, otherwise the file exists but does nothing.
- **Keep secrets out of xcconfig.** It is committed; use an uncommitted local override or CI environment variables.

---

## 4. Schemes

- **A scheme is the unit of "what do I run".** Build action, test action, launch arguments, and which target is the entry point all live there.
- **Share your schemes** (`Product → Scheme → Manage Schemes → Shared`). A personal scheme is invisible to your team, which is why "works on my machine" happens at the scheme level too.
- **Name schemes after workflows, not targets** (`MyApp-Staging`), so a build variant is an explicit choice.
- **Use `.xcscheme` launch arguments for configuration.** It is the cleanest way to switch a staging backend or a mock data source without a compile flag.
- **Do not commit `xcuserdata`.** It holds personal window layout, breakpoints, and per-user state; it is regenerated and is a common source of diff noise.

---

## 5. Signing

- **Automatic signing needs a team and a bundle ID registered in the portal.** It handles development builds; distribution still needs a profile or App Store Connect.
- **Set `DEVELOPMENT_TEAM` in the xcconfig, not per-machine.** Otherwise CI machines and new hires cannot build.
- **Choose a bundle ID you control early.** Changing it after release creates a second app identity; you cannot rename an existing App Store record.
- **Entitlements are a file, not a checkbox.** Push, App Groups, HealthKit, and Keychain sharing each require the capability in the portal *and* the entitlement in the build. A capability in Xcode that is not provisioned fails at install, not at build.
- **Never commit the `.mobileprovision` you pulled from a colleague's machine.** Profiles are per-team and regenerate; key material is not.
- **Keychain access groups must be a prefix of the App ID** or the entitlement is rejected at submission with a confusing message.

---

## 6. DerivedData
