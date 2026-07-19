# Swift Best Practices: Workflow Checklist

A practical run sheet for applying [Swift Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Structure: **SwiftPM for anything reusable** — one Package.swift per module layout; keep a binary/library split (Sources/MyLibrary + a thin Sources/mycli/main.swift) so logic is testable
- [ ] 1. Project Structure: One top-level type per file, named after the file — a file is a unit of discoverability, not just of code
- [ ] 2. Value Types vs Reference Types: **struct by default.** Value types give you let-immutability, no aliasing surprises, and value semantics that snapshot predictably:
- [ ] 2. Value Types vs Reference Types: **class only when identity or shared mutable state is genuinely required** — a UIViewController, a cache, a connection pool. Mark such classes final unless you actually design for subclassing
- [ ] 3. Optionals & Flow Control: **Model absence explicitly with Optional** — the compiler forces you to handle "could be nil" at every use site; prefer if let/guard let over ! force-unwrapping
- [ ] 3. Optionals & Flow Control: **guard for early exit** on preconditions — keeps the happy path flat and left-aligned:
- [ ] 4. Enums & State Machines: **enum with associated values models state explicitly** — the compiler knows every state, and switch is exhaustive:
- [ ] 4. Enums & State Machines: **switch over if/else chains** for state — exhaustive, flat, and self-documenting; Swift's switch handles ranges, patterns, and where clauses for free
- [ ] 5. Error Handling: **throws + try for normal error paths** — Swift's do/catch is the idiomatic mechanism; don't smuggle failures out through Optional or global state:
- [ ] 5. Error Handling: **Custom error enums with readable descriptions** — conform to LocalizedError/CustomStringConvertible so messages are actionable:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
