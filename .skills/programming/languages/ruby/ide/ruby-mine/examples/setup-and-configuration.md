# RubyMine: 1. Editions & Project Setup

## Scenario

A project is working on **1. editions & project setup** for RubyMine. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **RubyMine is commercial, with free student, open-source, and 30-day trial licences.** No Community edition.
- **Select the interpreter through a version manager, not a hard-coded path** — RVM, rbenv, asdf, or mise. A path like `~/.rvm/rubies/ruby-3.4.1` in the IDE but `ruby` in the shell is a mismatch waiting to happen.
- **`.ruby-version` should be committed** and the IDE should honour it. Without it, the editor indexes one Ruby while CI runs another, and a version-specific construct looks invalid in the editor.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Editions & Project Setup** section of [SKILL.md](../SKILL.md).
