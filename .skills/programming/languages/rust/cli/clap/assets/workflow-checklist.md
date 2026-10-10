# clap.rs CLI Design Best Practices: Workflow Checklist

A practical run sheet for applying [clap.rs CLI Design Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Crates: clap (with derive feature) — argument parsing, subcommands, help generation
- [ ] 1. Core Crates: clap_complete — shell completion generation
- [ ] 2. Command Structure: **Noun-verb or verb-noun — pick one.** cargo add, cargo build (verb-first) vs git remote add (noun-first). Stay consistent across your whole tree
- [ ] 2. Command Structure: **Keep nesting to 2 levels** (app noun verb) unless the domain truly needs more
- [ ] 4. Help Text: about / #[command(about = "...")]: one line, no trailing period
- [ ] 4. Help Text: long_about: a real paragraph if the tool needs more context than the one-liner
- [ ] 6. Error Handling: Use anyhow::Result in the binary crate for ergonomic error propagation with ?; use thiserror for a library crate's typed error enum if the CLI wraps a reusable library
- [ ] 6. Error Handling: Error messages should be **actionable**: say what went wrong and how to fix it ("config file not found at ~/.config/app/config.toml — run 'app init' first"), not just "error: not found"
- [ ] 7. Progress & Feedback: Any operation >300ms: use indicatif::ProgressBar (determinate) or a spinner (indeterminate) — silent hangs read as broken
- [ ] 7. Progress & Feedback: Respect --quiet to suppress progress bars in scripted/CI contexts (check !std::io::stdout().is_terminal() too)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
