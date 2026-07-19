# Cobra CLI Design Best Practices: Workflow Checklist

A practical run sheet for applying [Cobra CLI Design Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: github.com/spf13/cobra — command tree, flags, help/usage generation
- [ ] 1. Core Stack: github.com/spf13/viper — config file + env var + flag merging (pairs naturally with Cobra)
- [ ] 2. Command Structure: **Noun-verb or verb-noun, pick one and stay consistent.** kubectl get pods (verb-noun) vs git remote add (noun-verb) — both work, mixing them within one CLI doesn't
- [ ] 2. Command Structure: **Keep the tree shallow.** 2 levels (app noun verb) is usually enough; avoid 3+ levels unless the domain genuinely needs it
- [ ] 4. Help Text: Short: one line, no trailing period, imperative or noun phrase ("Get a configuration value", not "This command gets a config value.")
- [ ] 4. Help Text: Long: 1–3 sentences of real explanation, not a restatement of Short
- [ ] 6. Error Handling: Return errors from RunE, not Run + manual os.Exit inside the command body — let Cobra propagate and format them, and let main() decide the exit code
- [ ] 6. Error Handling: Error messages should be **actionable**: state what went wrong and, where possible, how to fix it ("config file not found at ~/.app/config.yaml — run 'app init' first"), not just "error: not found"
- [ ] 7. Progress & Feedback: Any operation >300ms: show a spinner or progress bar — a silently hanging CLI reads as broken
- [ ] 7. Progress & Feedback: Long-running commands should support --quiet to suppress progress output when scripted

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
