# iPadOS Development: Workflow Checklist

A practical run sheet for applying [iPadOS Development](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Target Setup: **Enable the iPad device family** (TARGETED_DEVICE_FAMILY = "1,2") and verify the provisioning profile covers it
- [ ] 1. Target Setup: **Treat the universal target as the default.** A separate iPad-only target duplicates code and doubles maintenance for a layout you can express in SwiftUI
- [ ] 2. Windowing & Scenes: **Every scene is a resizable window.** Assume multiple simultaneous windows, arbitrary sizes, and the user moving your app to an external display mid-interaction
- [ ] 2. Windowing & Scenes: **Do not cache a size at launch.** Read the current size from the view, and re-read on every layout pass. UIScreen.main is actively wrong here
- [ ] 3. Adaptive Navigation: **NavigationSplitView is the primary container.** It renders 2–3 columns on iPad and collapses to a NavigationStack on compact width, with no size-class branching
- [ ] 3. Adaptive Navigation: **Drive navigation with selection bindings, not NavigationLinks between columns.** That single choice is what makes the same code adapt across iPhone, iPad, and Mac
- [ ] 4. Adaptive Layout: **Size classes and the view's own size are the only inputs.** Never userInterfaceIdiom, never UIScreen, never a hardcoded device model
- [ ] 4. Adaptive Layout: **Use ViewThatFits** to declare a preferred arrangement and a fallback — it is clearer than nested if sizeClass trees and resizes continuously rather than snapping
- [ ] 5. Input & Interaction: **Support three input methods in one layout**: touch, pointer, and keyboard. Assume any of them at any moment
- [ ] 5. Input & Interaction: **Add keyboard shortcuts and a CommandMenu** — iPad users have hardware keyboards, and iPadOS 26 surfaces a real menu bar

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
