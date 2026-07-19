# Java Best Practices: Workflow Checklist

A practical run sheet for applying [Java Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Structure: **Package names: lowercase reverse-domain** (com.example.myapp); no java/javax/sun segments
- [ ] 1. Project Structure: **Layering by package**: domain (pure business logic, no frameworks) → application (use cases, services) → infrastructure (persistence, HTTP, config). Dependencies point inward; domain never imports infrastructure
- [ ] 2. Records, Sealed Types & Pattern Matching: **record for data carriers** — immutable, equals/hashCode/toString for free:
- [ ] 2. Records, Sealed Types & Pattern Matching: **Compact constructors + validation in records** — validate in the compact form, keep fields final:
- [ ] 3. Immutability & Values First: **Prefer final fields and constructor initialization** — treat every mutable field as a smell that needs justification
- [ ] 3. Immutability & Values First: **record/immutable value objects over mutable POJOs** — return copies or new records instead of mutating shared state
- [ ] 4. Null Handling: **Design "non-null by default"** — JDK annotations (@NotNull/@Nullable via JSpecify/org.jetbrains.annotations) plus tooling (NullAway, checker-framework) give compile-time null checking without a null-checking dependency in the language
- [ ] 4. Null Handling: **Optional for _return values that may sensibly be absent_** — never for parameters (a null or absent param is a caller bug → fail fast), never as a field type, never as a container to run streams through
- [ ] 5. Error Handling: **Checked exceptions for recoverable, caller-must-handle conditions; unchecked for programming bugs** — don't wrap every failure in RuntimeException and don't throw checked exceptions just to be symmetrical
- [ ] 5. Error Handling: **Custom exception types when callers need to distinguish** — a few domain exceptions (ConfigException, RetryableException) with clear messages, not a dump of the JDK catalog

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
