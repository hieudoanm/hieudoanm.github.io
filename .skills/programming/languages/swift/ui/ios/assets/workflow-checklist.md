# iOS Development: Workflow Checklist

A practical run sheet for applying [iOS Development](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Target Setup & Configuration: **One universal target** (TARGETED_DEVICE_FAMILY = "1,2") unless iPad is genuinely out of scope — see ipados.md for what universal costs you
- [ ] 1. Target Setup & Configuration: **Every capability change edits the .entitlements file and the App ID**, in that order. A capability enabled in Xcode but not provisioned fails at runtime, not build time
- [ ] 2. Scene Lifecycle: **Adopt UIScene now.** Building with the iOS 27 SDK _requires_ the scene lifecycle; apps still on UIApplicationDelegate will not launch
- [ ] 2. Scene Lifecycle: **SwiftUI's App protocol is the scene definition** — WindowGroup per window type, Settings/MenuBarExtra where applicable
- [ ] 3. Adaptive Layout: **Size classes, not device checks.** UIDevice.current.userInterfaceIdiom is no longer meaningful for layout, and an iPhone app on iPad keeps the phone idiom while being fully resizable
- [ ] 3. Adaptive Layout: **Orientation is a preference, not a constraint.** supportedInterfaceOrientations is ignored in resizable environments; never compute layout from it
- [ ] 4. Permissions & Privacy: **Request in context**, at the moment the user taps the feature that needs it, with a one-line rationale. A cold prompt on first launch is the fastest route to denial and a bad review
- [ ] 4. Permissions & Privacy: **Handle all three outcomes** — granted, denied, and _limited_. Photos returns .limited, which is a success state that also needs a "manage selection" affordance
- [ ] 5. Background Execution: **iOS gives you seconds, not minutes.** There is no general background thread; anything long-running must be deferrable work
- [ ] 5. Background Execution: **Schedule with BGTaskScheduler**: BGAppRefreshTaskRequest for opportunistic sync, BGProcessingTaskRequest for battery/network-gated heavy work. Both need BGTaskSchedulerPermittedIdentifiers in Info.plist

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
