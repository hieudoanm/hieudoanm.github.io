# C++ Best Practices: Workflow Checklist

A practical run sheet for applying [C++ Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. RAII & Resource Ownership: **Every resource is owned by an object whose destructor releases it** — files (fstream, unique_ptr<FILE>), mutexes (std::scoped_lock), memory (unique_ptr):
- [ ] 1. RAII & Resource Ownership: **No raw new/delete in application code** — make_unique/make_shared or stack objects
- [ ] 2. Move Semantics & Value Types: **std::move = cast to rvalue; use it only to enable move into a new owner** — not to "optimize" a copy that isn't there:
- [ ] 2. Move Semantics & Value Types: **&& (rvalue reference) members are for move-construct/assign**, not a style flourish; define Rule-of-5 compilers or use the defaults
- [ ] 3. Const Correctness: **const on anything you don't mutate** — parameter, variable, member function (std::string_view params over const std::string& where a subscription of a sequence):
- [ ] 3. Const Correctness: **const reference/member means "I won't mutate"—let the compiler guarantee it.**
- [ ] 4. Error Handling: **Exceptions for failures and a deliberate no-exceptions policy** — pick one per project (embedded/lifetime-critical may go -fno-exceptions), write it down, apply it consistently:
- [ ] 4. Error Handling: **Expected-domain outcomes use std::optional/std::expected/std::variant**, not exceptions for "not found"
- [ ] 5. Types & Interfaces: **Prefer strong types over bare primitives** for units and IDs — a UserId, Amount, Temperature (with operator semantics) is a contract:
- [ ] 5. Types & Interfaces: **std::string_view over const std::string& for read-only views** (cheap substring, accepts literals); mind lifetime and null-termination across API boundaries

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
