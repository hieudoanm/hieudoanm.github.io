# macOS Development: Validation Plan

Use this plan to verify work guided by [macOS Development](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Store tokens in the Keychain**, not UserDefaults or files. Use the data-protection keychain (kSecUseDataProtectionKeychain) so items sync through the modern path
- [ ] **Choose the tightest kSecAttrAccessible class** that still lets your background work run
- [ ] **UserDefaults is for preferences, not data or caches.** It is world-readable to other processes in some configurations and is plist-merged on sync
- [ ] **Respect TCC prompts** (camera, mic, screen recording, automation) and only trigger them from a real user action
- [ ] **Ship a Privacy Manifest** (PrivacyInfo.xcprivacy) and make App Store privacy labels match it
- [ ] **Isolate untrusted input.** If you parse files or render untrusted HTML, use a subprocess or a strict, well-tested parser
- [ ] **Mark the app and UI models @MainActor.** SwiftUI bodies are main-actor isolated; annotating them explicitly avoids isolation churn
- [ ] **Move I/O, parsing, and file walks off the main actor** into an actor or a detached task with Sendable inputs
- [ ] **Long lists in a resizable window must be lazy**, and images downsampled to display size — a Mac display makes the memory bug far more visible than a phone
- [ ] **Profile with Instruments on real hardware.** A Mac app runs on the user's fastest machine, so jank reads as unpolished rather than fatal

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
