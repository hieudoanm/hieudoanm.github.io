# Mordant Best Practices: Workflow Checklist

A practical run sheet for applying [Mordant Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Gradle Setup
- [ ] 2. Terminal & Capability Detection: **Check inputInteractive before entering raw mode.** It is the honest test for "is there a human attached", and it fails fast in CI instead of blocking on a read
- [ ] 2. Terminal & Capability Detection: **Use Terminal(width = .., height = ..) to pin the size** in tests and when embedding; the constructor takes ansiLevel, theme, width, height, terminalWidth, terminalHeight, interactive, and a terminalInterface
- [ ] 3. Colors & Styled Output: **Prefer the named colors over raw 24-bit literals.** TextColors.red degrades predictably; a hardcoded "\u001B[38;2;…m" does not
- [ ] 3. Colors & Styled Output: **Style words, not whole lines.** A fully bold paragraph reads as noise; a bold label reads as structure
- [ ] 6. Cursor & Screen Control: **Hide the cursor for the whole session and restore it in a finally.** A program that exits with the cursor hidden makes the user's shell unusable until they run reset
- [ ] 6. Cursor & Screen Control: **Prefer clearScreenBeforeCursor() per frame** over clearScreen(). It avoids the full-screen flash and the scrollback pollution that a full clear produces
- [ ] 12. General Rules of Thumb: Detect with terminal.terminalInfo; never sniff TERM or NO_COLOR yourself
- [ ] 12. General Rules of Thumb: Construct one Terminal and pass it down; the probe result is cached per instance

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
