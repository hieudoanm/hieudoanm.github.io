# Claude design system: Provenance: what is verified and what is not

## Scenario

A project is working on **provenance: what is verified and what is not** for Claude design system. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Be explicit with the user about this split.
- **Verified from Anthropic's own published CSS (claude.ai app stylesheet):** the semantic token scheme (`--bg-000..500`, `--text-000..500`, `--border-100..400`, `--accent-brand/main/pro/secondary-*`), and the base HSL values for the clay accent, the warm gray ramp, violet and blue accents, for both light and dark modes. These are in `references/tokens.css` and are exact. The claude.com marketing site shares the brand colors, but the stylesheet checked was the claude.ai app one, not claude.com's own.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Provenance: what is verified and what is not** section of [SKILL.md](../SKILL.md).
