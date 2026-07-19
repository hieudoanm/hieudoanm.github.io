# Android Studio: Validation Plan

Use this plan to verify work guided by [Android Studio](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Building only in Studio**, with a sync setting or plugin version that no CI job has
- [ ] **A local gradle/sdk version outside the wrapper**, so the build server fails
- [ ] **Committing local.properties**, which hard-codes one machine's SDK path
- [ ] **Profiling the Debug build**, where overhead makes CPU numbers meaningless — use profile
- [ ] **Only ever testing on an emulator** and shipping a startup or graphics regression
- [ ] **Testing release without R8 shrinking enabled**, then discovering a ClassNotFoundException or stripped reflection in production
- [ ] **Forgetting applicationIdSuffix on debug**, so a locally signed build cannot coexist with the Play-installed one
- [ ] **One AVD used to represent every form factor**, missing cutouts, foldables, and tablets
- [ ] **Relying on @Preview alone**, where Compose renders but lint in CI does not run
- [ ] **Flipping Studio channels in place** and losing the stable installation's settings

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
