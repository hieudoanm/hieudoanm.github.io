# Ratatui Design Best Practices: Workflow Checklist

A practical run sheet for applying [Ratatui Design Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Crates: ratatui — core rendering, widgets, layout
- [ ] 1. Core Crates: crossterm (or termion) — terminal backend
- [ ] 2. Color Palette: Prefer Color::Rgb (truecolor) but provide a fallback Color::Indexed palette for 256-color terminals if broad compatibility matters
- [ ] 2. Color Palette: Don't hardcode Color::White/Color::Black for text — use terminal-default (Color::Reset) or your theme's foreground so it respects the user's terminal background where sensible
- [ ] 3. Layout Constraints: Always leave 1 row for a status/help bar at the bottom — huge usability win for near-zero cost
- [ ] 3. Layout Constraints: Recompute layout every frame from frame.area() — never cache terminal size
- [ ] 4. Borders & Blocks: Pick BorderType::Rounded for a modern look, Plain for density/technical tools — use one consistently
- [ ] 4. Borders & Blocks: Pad title text with a leading/trailing space (" Files ") — bare text against the border looks cramped
- [ ] 6. Widgets: Use List with .highlight_style() and .highlight_symbol("▶ ") for selectable items rather than manually rendering Paragraph per row
- [ ] 6. Widgets: Use Table for tabular data with .header() styled distinctly (bold, different background) from body rows

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
