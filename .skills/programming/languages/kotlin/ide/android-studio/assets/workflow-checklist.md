# Android Studio: Workflow Checklist

A practical run sheet for applying [Android Studio](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Channels & Version Compatibility: **Four channels: stable, beta, canary, and (since Narwhal) RC.** Stable is what you ship. Canaries are for testing a new SDK; do not release from one
- [ ] 1. Channels & Version Compatibility: **Install a preview alongside stable, not over it.** They are separate bundles with separate settings, and switching means re-running a full Gradle sync
- [ ] 2. JDK, Gradle & Sync: **JDK 17+ is required; JDK 21 is the practical target** for current AGP. A mismatched JDK is the most common cause of a project that will not open on a new machine
- [ ] 2. JDK, Gradle & Sync: **Set the Gradle JDK in gradle.properties or the wrapper properties**, not only in Studio's settings — otherwise a terminal build silently uses a different JVM
- [ ] 3. Project & Module Structure: **One app module, plus library modules only when the boundary earns it.** Every module costs build time, and Studio's indexer degrades as the module count grows
- [ ] 3. Project & Module Structure: **Use app/src/main, debug, and release source sets deliberately.** debug-only manifest entries (cleartext traffic, the applicationIdSuffix) keep test config out of release
- [ ] 4. Editor & Inspections: **The Layout Editor is a genuine WYSIWYG editor**, but the XML is the source of truth — know how to fix a constraint by hand
- [ ] 4. Editor & Inspections: **Compose previews are live and typed.** A preview that will not compile is a real error in that composable; @Preview bodies are compiled by default in debug builds
- [ ] 5. Emulator & Devices: **Use a physical device for anything performance-related.** The emulator runs on your host CPU and its timing, thermal behaviour, and graphics driver are not representative
- [ ] 5. Emulator & Devices: **Create AVDs per API level you support and keep a hardware profile per form factor** (phone, foldable, tablet). One "Pixel 8" AVD does not cover a foldable's posture changes

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
