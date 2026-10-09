---
name: claude-design
description: Design system and page-building guide for the Claude (claude.com) look: warm off-white and warm-charcoal surfaces, a single terracotta "clay" accent, literary serif headlines, calm benefit-led copy, hairline-bordered plan cards, and light/dark themes that follow the OS. Use whenever the user asks to build, mock up, restyle or write copy for a landing page, pricing page, sign-up block, app UI or component "in the Claude style", "like claude.com", "Anthropic-style", or "warm, editorial, friendly AI product site", even if they never name Claude.
---

# Claude design system

Reproduces the visual and verbal style of claude.com, the public home page of Claude by Anthropic.

## Provenance: what is verified and what is not

Be explicit with the user about this split.

- **Verified from Anthropic's own published CSS (claude.ai app stylesheet):** the semantic token scheme (`--bg-000..500`, `--text-000..500`, `--border-100..400`, `--accent-brand/main/pro/secondary-*`), and the base HSL values for the clay accent, the warm gray ramp, violet and blue accents, for both light and dark modes. These are in `references/tokens.css` and are exact. The claude.com marketing site shares the brand colors, but the stylesheet checked was the claude.ai app one, not claude.com's own.
- **Verified from the rendered claude.com page text:** section order, all headline and plan copy, nav groups, footer groups, the hero looping video, the sign-up options.
- **Proposed (not measured):** fonts, type scale, spacing, radii, border alpha, shadows, motion, button dimensions. A third-party design catalog describes a serif display face, 8px button radius and 1200px max width; it states its own values are interpretations, and its clay hex (`#cd6f47`) disagrees with the official `#d97757`, so it was used only as loose guidance. Everything from it is marked `proposed`.
- Anthropic's brand typefaces are proprietary and not available. The template uses Georgia/system fallbacks. Say so to the user, because fonts change the feel substantially.

## The look in one paragraph

A warm, paper-like interface. Backgrounds are slightly yellow off-whites (`#f9f9f8` and white for raised surfaces) in light mode and warm near-blacks (`#2c2c28` down to `#0b0b0b`) in dark mode; grays all share hue 60 so nothing looks blue or cold. One accent, the terracotta clay `#d97757`, is used sparingly for the brand mark, key emphasis and rare CTAs, while the main call to action is a dark neutral button. Headlines read like an essay title (serif, light weight, generous size), supported by quiet sans-serif UI text. Separation comes from hairline borders and value contrast, not shadows. The tone is calm, capable and warm.

## Page anatomy (in order)

1. **Nav**: logo wordmark; mega-menu groups Product, Developers, Enterprise, Resources; plain link Pricing; right side "Login" and "Contact sales".
2. **Hero**: headline "Think fast, build faster", subhead "Brainstorm in chat, build in Cowork.", with a looping muted product video beside or beneath it.
3. **Sign-up block**: stacked full-width buttons "Continue with Google", divider "or", "Continue with email", "Continue with SSO", then a small privacy acknowledgement and an opt-in line for promotional emails.
4. **Explore plans**: a segmented toggle (Individual | Team and Enterprise) above three plan cards: Free ($0, "Free for everyone"), Pro ($17/month billed annually or $20 monthly, "For everyday productivity"), Max (From $100/month, "5-20x more usage than Pro"). Each card has a name, price, one-line audience, a primary button, and a checklist of features. Small usage-limit disclaimers below.
5. **FAQ**: three accordion questions ("What is Claude and how does it work?", "What should I use Claude for?", "How much does it cost to use?").
6. **Footer**: many link groups (Products, Capabilities, Extensions, Models, Enterprise, Departments, Industries, Programs, Developers, Platform, Resources, Help and security, Company, Terms and policies), copyright "© 2026 Anthropic PBC", social links (X, Threads, LinkedIn, YouTube, Instagram) and a language selector.

## Design rules

- **Use the semantic tokens, not raw grays.** `--bg-000` is the page, `--bg-100`/`--bg-200` step toward raised or recessed panels, `--text-000` for headings, `--text-200` body, `--text-400` captions, `--border-*` at low alpha for hairlines. Dark mode just swaps the variable values.
- **Gray hue is always 60.** Never introduce cool grays or pure black text on pure white; it breaks the paper feel.
- **Clay is a seasoning.** Use `--accent-brand` for the logo glyph, a badge, a link underline or one emphasis per screen. The default primary button is the dark neutral (`--text-000` fill with `--bg-000` text). Pro uses violet and secondary uses blue only for product-tier badges, never as page color.
- **Hairlines over shadows.** 1px low-alpha borders, 12-16px radius on cards, no heavy shadows, no gradients except an optional very faint warm wash.
- **Serif headlines, sans UI.** Headline in a serif at light-to-regular weight, sentence case, no terminal period. Body and controls in a clean sans. If proprietary faces are unavailable, use Georgia for headlines and system-ui for the rest.
- **Generous, calm spacing.** Large vertical bands (about 96px) between sections, a narrow reading column for prose, a 1200px max container.
- **Full-width, plain buttons.** Auth options are stacked, equal-width, outlined buttons with a text label only (no logos drawn inline).
- **Icons.** Text glyphs (`✻`, `→`, `✓`, `+`) and CSS shapes. Do not inline SVG in generated code. Load logos as external image files or use a text wordmark.
- **Motion.** Short fades and translates (100-360ms); disable under `prefers-reduced-motion`.
- **Follow the OS theme** via `prefers-color-scheme`, scoping tokens on `:root` and optionally `[data-mode]` for a manual override.

## Voice

Calm, warm, capable, benefit-led. Headlines are short imperatives or paired phrases ("Think fast, build faster"). Plain feature lists, transparent pricing with honest caveats about usage limits. Buttons use verbs ("Try Claude", "Start building", "Continue with email"). Avoid hype, exclamation marks, "revolutionary", and fear-based urgency.

## How to use this skill

1. Copy `references/tokens.css` into the project; reference only the semantic variables.
2. Start from `assets/template.html` (hero, sign-up block, plans, FAQ, footer) and replace copy.
3. For single components read `references/components.md`.
4. Before finishing, run the Design rules checklist and tell the user which values were proposed rather than verified, and that the brand fonts were substituted.

## Files

- `references/tokens.css`: semantic color tokens (light and dark) from official values, plus proposed type, spacing, radius and base styles.
- `references/components.md`: component recipes.
- `assets/template.html`: single-file landing page template, no inline SVG, no external dependencies.
