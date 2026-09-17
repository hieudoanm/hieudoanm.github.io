# Rust Best Practices: Workflow Checklist

A practical run sheet for applying [Rust Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Structure: **Binary + library split:** if a binary has any reusable logic, put it in lib.rs and have main.rs just call into it — makes integration testing and future reuse trivial
- [ ] 1. Project Structure: **Workspaces** ([workspace] in a root Cargo.toml) for multi-crate projects — split by genuine boundary (core logic vs CLI vs FFI bindings), not arbitrarily
- [ ] 2. Ownership & Borrowing: **Borrow by default; own only when you must.** Take &str over String, &[T] over Vec<T> in function signatures unless the function needs to store or mutate the data
- [ ] 2. Ownership & Borrowing: **Don't reach for clone() to silence the borrow checker** without understanding why it's complaining first — often a lifetime annotation, restructuring, or Cow<'_, T> solves it more cheaply
- [ ] 3. Error Handling: **Libraries: thiserror** for a typed, structured error enum callers can match on:
- [ ] 3. Error Handling: **Binaries/applications: anyhow** for ergonomic propagation when callers don't need to match on error variants, just report them:
- [ ] 4. Traits & Generics: **Prefer trait objects (dyn Trait) for heterogeneous collections or plugin-style extensibility; generics (impl Trait / <T: Trait>) for performance-sensitive monomorphized code.** Default to generics unless you specifically need dynamic dispatch or to store different types in one collection
- [ ] 4. Traits & Generics: **impl Trait in argument position** (fn process(items: impl Iterator<Item = i32>)) for simple cases; named generic parameters when you need to reference the type elsewhere in the signature or bound multiple parameters together
- [ ] 5. Testing: **Unit tests in the same file**, in a #[cfg(test)] mod tests block — standard convention, keeps tests next to the code they cover:
- [ ] 5. Testing: **Integration tests in tests/** — these only see the crate's public API, good for catching API design issues unit tests miss

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
