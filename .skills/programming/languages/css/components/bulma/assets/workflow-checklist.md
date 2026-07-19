# bulma: Workflow Checklist

A practical run sheet for applying [bulma](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Installation and Setup: CDN: include bulma CSS from CDN in HTML
- [ ] 1. Installation and Setup: npm: npm i bulma — import bulma.min.css in your JS/CSS entry
- [ ] 2. Layout Primitives: Columns: .columns / .column flexbox grid; size via .is-1….is-12, offsets .is-offset-*
- [ ] 2. Layout Primitives: Next: containers .container, sections .section, and spacing helpers
- [ ] 3. Components: Elements: buttons (.button.is-primary), forms, icons, boxes, tables, notification, tag
- [ ] 3. Components: Components: card, navbar (with burger toggle), tabs, modal, message, dropdown, breadcrumb, pagination
- [ ] 4. Helpers/Utilities: Spacing: m-*, p-*, mb-*, mt-* scale
- [ ] 4. Helpers/Utilities: Text/color helpers, is-flex, is-hidden-* responsive toggles
- [ ] 5. Customization: Theme from variables by compiling the Sass ($primary, $link, $family-sans-serif, etc.)
- [ ] 5. Customization: Use modular Sass (@use "bulma/sass") to import only needed components

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
