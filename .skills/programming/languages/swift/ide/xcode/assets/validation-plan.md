# Xcode: Validation Plan

Use this plan to verify work guided by [Xcode](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **SwiftUI previews are a live compile, not a screenshot.** A type error in the previewed view is a real error in that view
- [ ] **Use #Preview and keep previews at the bottom of a file**, or in a Previews folder excluded from the release target
- [ ] **Preview sample data in one place.** A SampleData enum or a PreviewProvider shared across views stops each preview inventing its own inconsistent model
- [ ] **The refactor menu is Roslyn-backed and reliable** for rename (it updates strings, XIB outlets, and Swift name references), extract, and convert closures to async
- [ ] **A project-wide rename touches project.pbxproj too.** Expect the generated file to churn; with a project generator it does not matter
- [ ] **Do not use "Find and Replace" for a type rename.** It misses storyboard XML and localised strings that the refactor tool handles
- [ ] **Opening the .xcodeproj instead of the .xcworkspace**, making packages and pods appear missing
- [ ] **Committing xcuserdata**, which produces per-user diff noise on every machine
- [ ] **Configuration set in the IDE instead of an .xcconfig**, invisible to review and lost in merge conflicts
- [ ] **Forgetting $(inherited)** in a target-level override, silently dropping inherited flags

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
