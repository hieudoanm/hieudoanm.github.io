# Ruby Best Practices: Workflow Checklist

A practical run sheet for applying [Ruby Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Object Model & Message Passing: **Objects answer messages; methods are contracts** — design around send-style intent, but never rely on it in prod paths:
- [ ] 1. Object Model & Message Passing: **attr_reader default, attr_writer/attr_accessor only deliberately** — public state surface is a decision
- [ ] 2. Immutability & Freeze: **Prefer immutable values; freeze what shouldn't change** — frozen containers can't be silently mutated from another stack frame:
- [ ] 2. Immutability & Freeze: **#dup/#clone before mutation of shared config** — a mutable default is the classic shared-state bug
- [ ] 3. Blocks, Enumerables & Composition: **Methods that yield use blocks with yield or &block** — blocks are the idiomatic composition tool:
- [ ] 3. Blocks, Enumerables & Composition: **Enumerable over hand-rolled loops** — map, select, reduce, each_with_object, group_by:
- [ ] 4. Nil Safety & Required Values: **Safe navigation &. and ||/nil? for defaulting:**
- [ ] 4. Nil Safety & Required Values: **Hash#dig/Array#dig for nested data without if a && a[:b] && a[:b][:c]:**
- [ ] 5. Error Handling: **Exceptions for genuine failures; custom exception classes per domain**:
- [ ] 5. Error Handling: **begin/rescue/else/ensure with narrow rescue classes** — rescue StandardError in prod is a smell; rescue => e only at the true boundary for conversion:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
