# iPadOS Development: 9. Testing

## Scenario

A project is working on **9. testing** for iPadOS Development. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Use Xcode's resize mode** in the canvas or Device Hub to iterate through widths quickly, then confirm on hardware.
- **Add snapshot tests at several widths** — the failures that matter (clipped labels, overlapping toolbars) are width-dependent and invisible to logic tests.
- **Exercise each multitasking mode** in a scripted UI test, not just a manual pass.
- **Test keyboard-only navigation**; a layout that requires touch to reach a control is broken for a large share of iPad users.
- **Verify Dynamic Type at `accessibility3` and above** in every column — fixed column widths clip here before anything else does.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **9. Testing** section of [SKILL.md](../SKILL.md).
