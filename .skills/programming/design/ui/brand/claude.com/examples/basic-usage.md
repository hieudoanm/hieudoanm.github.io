# Claude design system: Worked Scenario

Design system and page-building guide for the Claude (claude.com) look: warm off-white and warm-charcoal surfaces, a single terracotta "clay" accent, literary serif headlines, calm benefit-led copy, hairline-bordered plan cards, and light/dark themes that follow the OS. Use whenever the user asks to build, mock up, restyle or write copy for a landing page, pricing page, sign-up block, app UI or component "in the Claude style", "like claude.com", "Anthropic-style", or "warm, editorial, friendly AI product site", even if they never name Claude.

## Scenario

A project needs to apply **claude-design** to a real design or implementation decision. Start from this context: Reproduces the visual and verbal style of claude.com, the public home page of Claude by Anthropic. Be explicit with the user about this split.

## Apply the guidance

- **Verified from Anthropic's own published CSS (claude.ai app stylesheet):** the semantic token scheme (`--bg-000..500`, `--text-000..500`, `--border-100..400`, `--accent-brand/main/pro/secondary-*`), and the base HSL values for the clay accent, the warm gray ramp, violet and blue accents, for both light and dark modes. These are in `references/tokens.css` and are exact. The claude.com marketing site shares the brand colors, but the stylesheet checked was the claude.ai app one, not claude.com's own.
- **Verified from the rendered claude.com page text:** section order, all headline and plan copy, nav groups, footer groups, the hero looping video, the sign-up options.
- **Proposed (not measured):** fonts, type scale, spacing, radii, border alpha, shadows, motion, button dimensions. A third-party design catalog describes a serif display face, 8px button radius and 1200px max width; it states its own values are interpretations, and its clay hex (`#cd6f47`) disagrees with the official `#d97757`, so it was used only as loose guidance. Everything from it is marked `proposed`.
- Anthropic's brand typefaces are proprietary and not available. The template uses Georgia/system fallbacks. Say so to the user, because fonts change the feel substantially.

## Expected outcome

Choose an approach that follows the skill’s recommendations, fits the project constraints, and can be reviewed against its quality and safety requirements.

## Source

Based on the guidance in [SKILL.md](../SKILL.md).
