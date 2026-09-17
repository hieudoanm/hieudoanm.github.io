# Notion design system: Workflow Checklist

A practical run sheet for applying [Notion design system](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] Provenance: what is verified and what is not: **Verified from the rendered notion.com page text:** section order, headlines, copy, nav groups, stats, footer groups
- [ ] Provenance: what is verified and what is not: **Cross-checked, third-party (two independent design catalogs for the marketing site, and an unofficial design-system package plus the react-notion-x stylesheet for the app):** most colors and sizes below. Where the sources agree, values are treated as likely; where they disagree it is flagged
- [ ] App anatomy: **Sidebar** (left, ~240px, --sidebar bg): workspace switcher, search/home/inbox rows, then sections (Favorites, Private, Shared) as a collapsible tree with ▸ toggles and emoji icons. Row height ~28px, 4px radius, hover fill
- [ ] App anatomy: **Topbar** (~45px): breadcrumb (🏠 Page / Sub page), share, star, more. Translucent over content
- [ ] Design rules: **Ink, not black.** Body #37352f; secondary at 60% alpha; hairlines at 9-16% alpha. Same family everywhere
- [ ] Design rules: **Hover is a translucent wash**, not a color change: rgba(55,53,47,.08). In dark mode use white at ~5.5%
- [ ] Files: references/tokens.css: marketing and app tokens (light/dark), block color palette, base styles
- [ ] Files: references/marketing-components.md, references/app-components.md: component recipes

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
