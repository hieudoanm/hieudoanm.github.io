# Compose Multiplatform Best Practices: Workflow Checklist

A practical run sheet for applying [Compose Multiplatform Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Gradle Setup: **Always apply kotlin("plugin.compose")** — since Kotlin 2.0 the Compose compiler ships as a Kotlin plugin, and the old composeOptions { kotlinCompilerExtensionVersion } is gone
- [ ] 1. Core Stack & Gradle Setup: **google() is required.** Compose pulls androidx.lifecycle and androidx.savedstate; resolution fails without it even for a pure-desktop target
- [ ] Color: **Pick one primary accent and use it sparingly** — primary actions, selection, focus. Not decoration
- [ ] Color: **Semantic roles over literal colors** — MaterialTheme.colorScheme.error survives a theme change; Color.Red does not
- [ ] Typography: **Line up hierarchy with the ramp, not with ad-hoc sizes.** If a value is not on the ramp, it is a design decision, not a style
- [ ] Typography: **Give every Text an overflow policy** on a fixed-width layout: maxLines plus overflow = TextOverflow.Ellipsis. Unbounded text in a row is the single most common cause of a broken desktop layout
- [ ] Shape: One corner-radius family, used consistently. Mixing 2/6/12/20dp radii looks accidental
- [ ] 3. Spacing & Layout: Use the 4dp Grid: **One parent owns padding; children own none.** Nesting padding() three deep multiplies into accidental 20dp gaps. Apply padding once at the container
- [ ] 3. Spacing & Layout: Use the 4dp Grid: **Modifier.weight is scope-bound** — it only resolves inside RowScope/ColumnScope. Calling it in a sibling composable is a compile error, which is the compiler doing you a favor
- [ ] Hoist everything: **Compose should not be where business rules live.** A reducer over an immutable state class is plain Kotlin: no composition, no coroutine, trivially unit-testable. Push logic there and let composables render it

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
