# Overview

Focused reference for **claude-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
