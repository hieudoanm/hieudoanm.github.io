# Compose Multiplatform Best Practices: Validation Plan

Use this plan to verify work guided by [Compose Multiplatform Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Always pass key =** to items/itemsIndexed. Without it, Compose identifies rows by index, so inserting or deleting one recomposes and re-animates every row below it — visibly janky on a long list
- [ ] **Give items a stable identity** (a database key), not the list index
- [ ] **Extract each row into its own composable** taking only the fields it needs, so a change to one row does not recompose its siblings
- [ ] **Keep composables restartable and skippable** — no equals/hashCode overrides on @Composable types, no side effects in default arguments
- [ ] **Do not nest scrollables** (a LazyColumn inside a scrollable Column). Use a single lazy container with item headers, or a fixed-height inner list
- [ ] **Defer expensive derivation to remember(derivedStateOf(...))** so it survives recomposition
- [ ] **Test the reducer, not the composable.** State transitions are plain Kotlin — fast, headless, no Skiko
- [ ] **Test composables only for what a reducer cannot express:** that a row renders, that a click emits the right event, that a dialog appears
- [ ] **Inject the clock** for anything time-dependent; Compose tests with real delays are flaky
- [ ] **Use stable test tags** (Modifier.testTag("row-apple")) over visible text, which is exactly what a copy change will break

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
