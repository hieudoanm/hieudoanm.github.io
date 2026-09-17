# Google Design System (Material Design 3): Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Inherit-vs-derive decision recorded with reasons
- [ ] Role palette defined per theme, each ground paired with its ink
- [ ] Contrast verified ≥ 4.5:1 body, ≥ 3:1 large/non-text, per theme
- [ ] Type scale defined as named roles with line-height and tracking
- [ ] Radius and elevation scales set; shadow reserved for floating surfaces
- [ ] Interaction states expressed as opacity layers on existing tokens
- [ ] Touch targets ≥ 48×48dp; focus ring visible on every interactive element

## Example

A team applying **Quick-Start Checklist** to a Google Design System (Material Design 3) project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Inherit-vs-derive decision recorded with reasons**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for google-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
