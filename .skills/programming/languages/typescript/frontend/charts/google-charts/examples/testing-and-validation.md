# Google Charts Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Google Charts Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `google.charts.load` + `setOnLoadCallback` wired
- [ ] DataTable with typed columns + roles styled deliberately
- [ ] Chart class per semantics; options explicit
- [ ] Events via `addListener`; `getSelection` read-backs
- [ ] Resize redraw debounced; `clearChart()` on unmount
- [ ] Lazy-load packages; rows aggregated; loader version pinned

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
