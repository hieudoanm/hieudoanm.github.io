# IntelliJ IDEA: Workflow Checklist

A practical run sheet for applying [IntelliJ IDEA](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & the Unified Release: **One IntelliJ IDEA, two tiers.** The free tier requires a non-commercial licence; the paid tier is for commercial use. Feature gating between tiers is narrower than the old Community/Ultimate split
- [ ] 1. Editions & the Unified Release: **Check the licence state before relying on a feature.** A free-tier IDE running in a commercial context is a licensing problem, not a configuration problem
- [ ] 2. Gradle Project Model: **The IDE must delegate the build to Gradle** (Settings → Build Tools → Gradle → Build and run using: Gradle). Delegating to IntelliJ's own builder is the most common cause of "works in IDEA, fails in CI"
- [ ] 2. Gradle Project Model: **Never commit .idea/ wholesale.** Commit codeStyles/, inspectionProfiles/, and .run/; ignore the rest. The gitignore must re-include those paths explicitly, because git will not descend into an ignored directory
- [ ] 3. Refactoring & Inspections: **IDEA's refactorings are the reference implementation for Java and Kotlin** — extract, inline, introduce parameter, change signature, and the Kotlin-specific idioms. Use them; they are backed by the same index as inspection
- [ ] 3. Refactoring & Inspections: **Refactor before you review.** Rename, extract, and move are safer at the IDE's confidence level than by hand, because the index knows every reference including generated and reflection-assisted ones
- [ ] 4. Debugging: **Use the debugger's "Evaluate Expression" in the frame where the value is still meaningful,** not where the crash surfaced
- [ ] 4. Debugging: **Set an exception breakpoint on throw** to find the origin, and use "Any exception" sparingly — it fires on caught exceptions too and floods the session
- [ ] 5. Spring, Jakarta, and Frameworks: **The Spring plugin is the reason Ultimate-tier features are worth it,** and it is now bundled in the unified IDE. It resolves beans, understands DI, and offers a visual navigation that is faster than grep for a large graph
- [ ] 5. Spring, Jakarta, and Frameworks: **The plugin reads the actual application context**, so a missing bean is a real error at startup — run the context, do not guess

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
