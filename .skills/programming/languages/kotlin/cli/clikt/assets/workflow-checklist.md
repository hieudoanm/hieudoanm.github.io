# Clikt Best Practices: Workflow Checklist

A practical run sheet for applying [Clikt Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Gradle Setup
- [ ] 2. Command Hierarchies: **A command class must be constructible with zero arguments.** Tests build it with Kevin().subcommands(ServeCommand()); a constructor that requires live resources cannot be tested. Inject side effects instead (see §7)
- [ ] 2. Command Hierarchies: **Parse eagerly, act once.** Reading delegated properties inside run() forces parsing at that moment. Reading them in a Pair/config object first makes the parse phase a single, obvious step
- [ ] 3. Options, Flags & Arguments: **Long flag first, short second.** --port / -p renders the help text in that order and matches every other CLI your users know
- [ ] 3. Options, Flags & Arguments: **Always write help =.** It is the entire discoverability surface of the tool. A missing help is a bug, not a style choice
- [ ] 6. Prompting: **Never prompt in a command that is meant to run unattended.** A server that blocks on stdin in CI is worse than one that fails fast
- [ ] 6. Prompting: **Always pass default** when a sensible value exists, so the user can accept with Enter
- [ ] 7. Testable Command Construction: **Pass an immutable config object across the boundary.** launch(ServeConfig(...)) gives the test one value to assert on instead of a pile of captured variables, and it keeps the command from knowing how the work is executed
- [ ] 7. Testable Command Construction: **Use echo for user-facing output**, not println. echo writes through the context, so test() captures it in .stdout; a bare println bypasses the harness and leaks into the real console during tests
- [ ] 8. Help Formatting: Set help on the command class and on every parameter. Clikt infers the command name from the class name, but pass name = explicitly for anything user-visible

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
