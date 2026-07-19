# Claude design system: Workflow Checklist

A practical run sheet for applying [Claude design system](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] Provenance: what is verified and what is not: **Verified from Anthropic's own published CSS (claude.ai app stylesheet):** the semantic token scheme (--bg-000..500, --text-000..500, --border-100..400, --accent-brand/main/pro/secondary-*), and the base HSL values for the clay accent, the warm gray ramp, violet and blue accents, for both light and dark modes. These are in references/tokens.css and are exact. The claude.com marketing site shares the brand colors, but the stylesheet checked was the claude.ai app one, not claude.com's own
- [ ] Provenance: what is verified and what is not: **Verified from the rendered claude.com page text:** section order, all headline and plan copy, nav groups, footer groups, the hero looping video, the sign-up options
- [ ] Design rules: **Use the semantic tokens, not raw grays.** --bg-000 is the page, --bg-100/--bg-200 step toward raised or recessed panels, --text-000 for headings, --text-200 body, --text-400 captions, --border-* at low alpha for hairlines. Dark mode just swaps the variable values
- [ ] Design rules: **Gray hue is always 60.** Never introduce cool grays or pure black text on pure white; it breaks the paper feel
- [ ] Files: references/tokens.css: semantic color tokens (light and dark) from official values, plus proposed type, spacing, radius and base styles
- [ ] Files: references/components.md: component recipes

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
