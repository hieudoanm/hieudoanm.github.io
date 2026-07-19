# OpenCode design system: Worked Scenario

Design system and page-building guide for the OpenCode (opencode.ai) look: an all-monospace, terminal-flavoured marketing site with hairline-divided sections, near-black/near-white themes that follow the OS, a pale yellow-lime accent, tiny radii, and blunt developer copy. Use whenever the user asks to build, mock up, restyle or write copy for a landing page, docs-style page, CLI/dev-tool product page or component "in the OpenCode style", "like opencode.ai", or "terminal-style, mono-font, minimal dev tool site", even if they never name OpenCode.

## Scenario

A project needs to apply **opencode-design** to a real design or implementation decision. Start from this context: Reproduces the visual and verbal style of opencode.ai, the marketing site for the open source AI coding agent. Values below were read from the site's published source (the marketing app's `routes/index.css`, `style/token/font.css`, `style/base.css`) through a text-extraction tool, plus the rendered page text. So:

## Apply the guidance

- **Verified from source:** color tokens (light and dark), font stack, `--padding` and `--vertical-padding`, content max-width, breakpoint, button radius and padding, section divider rule, card/tab/dock radii, hero video rules, heading sizes called out below, body line-height.
- **Verified from page text:** section order, copy, nav and footer contents, stats, FAQ questions.
- **Not verified (proposed):** exact font sizes for things the source did not state (nav, tabs, labels), hover/transition timings, the footer's exact column widths, how the `Fig 1-3` figures are drawn. These are marked `proposed` in `references/tokens.css` and `references/components.md`.
- The extractor summarizes rather than quotes, so treat numeric values as very likely correct but re-check against DevTools if pixel accuracy matters.

## Expected outcome

Choose an approach that follows the skill’s recommendations, fits the project constraints, and can be reviewed against its quality and safety requirements.

## Source

Based on the guidance in [SKILL.md](../SKILL.md).
