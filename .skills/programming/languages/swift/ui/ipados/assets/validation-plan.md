# iPadOS Development: Validation Plan

Use this plan to verify work guided by [iPadOS Development](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Resizing is an expensive layout event.** Avoid recomputing large data transformations in body; cache derived values in the model and invalidate on real data change
- [ ] **Regenerate image assets at the new size after the gesture**, per isInteractivelyResizing — re-decoding mid-drag is the classic iPad jank
- [ ] **Long lists in a detail column must be lazy** (List/LazyVStack); a window that can be 2000pt tall makes non-lazy stacks fatal
- [ ] **Prefer Instruments' SwiftUI template** and watch body evaluation counts while resizing, not just at rest
- [ ] **Use Xcode's resize mode** in the canvas or Device Hub to iterate through widths quickly, then confirm on hardware
- [ ] **Add snapshot tests at several widths** — the failures that matter (clipped labels, overlapping toolbars) are width-dependent and invisible to logic tests
- [ ] **Exercise each multitasking mode** in a scripted UI test, not just a manual pass
- [ ] **Test keyboard-only navigation**; a layout that requires touch to reach a control is broken for a large share of iPad users
- [ ] **Verify Dynamic Type at accessibility3 and above** in every column — fixed column widths clip here before anything else does
- [ ] **Branching on userInterfaceIdiom or hardcoding device widths.** It is no longer meaningful; iPhone apps run on iPad as fully resizable

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
