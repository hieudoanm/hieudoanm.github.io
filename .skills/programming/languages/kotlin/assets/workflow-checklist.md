# Kotlin Best Practices: Workflow Checklist

A practical run sheet for applying [Kotlin Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Structure: **gradle/libs.versions.toml for dependency versions** — never scatter version strings across build.gradle.kts files; catalogs keep upgrades and review in one place
- [ ] 1. Project Structure: **build.gradle.kts, not build.gradle** — the Kotlin DSL is type-checked, and your IDE/AI can follow it reliably
- [ ] 2. Null Safety: **val by default, var only when state genuinely changes.** Every var is a place where a bug can hide; each one should have a reason
- [ ] 2. Null Safety: **Model nullable state with T? and force handling with ?. / ?: / !! at the boundary.** Prefer safe calls and the Elvis operator in normal flow:
- [ ] 3. Classes & Type Design: **data class for value-bearing models** — you get equals/hashCode/toString/copy/destructuring for free. Prefer immutable val fields throughout
- [ ] 3. Classes & Type Design: **sealed class / sealed interface for restricted hierarchies** — every when over them is exhaustive at compile time, so the compiler verifies you handled all cases:
- [ ] 4. Error Handling: **Expected, recoverable failures → sealed result types or Result<T>.** Code that can fail in ways callers should handle returns a value you when over, not an exception you pray gets caught
- [ ] 4. Error Handling: **runCatching / Result for wrapping unexpected exceptions** — convert to a domain type quickly; don't let Result instances pile up across layers
- [ ] 5. Coroutines & Structured Concurrency: **Never launch without a scope.** Coroutines must belong to a lifecycle-aware scope (viewModelScope, a custom CoroutineScope, or coroutineScope {}); GlobalScope is almost never correct
- [ ] 5. Coroutines & Structured Concurrency: **Structure by default: coroutineScope { } / supervisorScope { }.** Children complete before the parent returns; failure in one cancels the parent (or, with supervisorScope, only itself). Cancellation and scoping become automatic

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
