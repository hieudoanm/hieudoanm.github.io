# ArtCraft design system: Workflow Checklist

A practical run sheet for applying [ArtCraft design system](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] Read this first: what is verified and what is not: **Verified** (seen on the site): page structure, section order, numbering scheme, component inventory, copy tone, nav and footer content, the theme color #0b0b0c, that the site is dark, that feature demos are looping .webm videos, that community proof uses YouTube thumbnails with a Play affordance
- [ ] Read this first: what is verified and what is not: **Proposed** (not measured): every other color, font, size, radius and spacing value in references/tokens.css. They are chosen to be consistent with the verified facts. Treat them as sensible defaults, not as a pixel-accurate clone
- [ ] Design rules: **Dark only.** Background is --bg. Do not introduce a light theme unless asked
- [ ] Design rules: **Hierarchy through type, not color.** Headlines are large, tight and sentence-case, ending with a period. Labels are small, uppercase or monospaced, and muted
- [ ] Files: references/tokens.css: color, type, spacing, radius, motion variables plus base styles
- [ ] Files: references/components.md: component-by-component recipes

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
