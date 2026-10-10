# Notion design system: Worked Scenario

Design system for Notion, covering both the notion.com marketing site (white canvas, strong blue CTA, pastel tint cards, dark campaign bands, big bold Inter-style headlines, product mockups) and the Notion app UI (warm-ink text on white or near-black, translucent hover fills, hairline alpha borders, tiny radii, emoji page icons, sidebar tree, block editor, callouts, toggles, to-dos, database tables, slash menu, popovers). Use whenever the user asks to build, mock up or restyle a landing page, docs/wiki page, knowledge base, notes app, workspace, database table view, sidebar layout or components "like Notion", "in the Notion style", "notion-like editor", or "clean minimal workspace app", even if they never name Notion.

## Scenario

A project needs to apply **notion-design** to a real design or implementation decision. Start from this context: Two related but different surfaces. Pick the one that matches the request: They share the ink color family, the hairline philosophy and the Inter-based type, so mixed work (a marketing page that embeds an app mockup) should reuse the app tokens inside the mockup.

## Apply the guidance

- **Marketing** (notion.com): a light, confident product site. Start from `assets/marketing-template.html`.
- **App** (the workspace UI): a calm, document-first interface. Start from `assets/app-template.html`.
- **Verified from the rendered notion.com page text:** section order, headlines, copy, nav groups, stats, footer groups.
- **Cross-checked, third-party (two independent design catalogs for the marketing site, and an unofficial design-system package plus the react-notion-x stylesheet for the app):** most colors and sizes below. Where the sources agree, values are treated as likely; where they disagree it is flagged.

## Expected outcome

Choose an approach that follows the skill’s recommendations, fits the project constraints, and can be reviewed against its quality and safety requirements.

## Source

Based on the guidance in [SKILL.md](../SKILL.md).
