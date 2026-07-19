# bootstrap: Workflow Checklist

A practical run sheet for applying [bootstrap](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Installation and Setup: CDN (quick start): <link> CSS + <script> bundle for components needing JS
- [ ] 1. Installation and Setup: npm: npm i bootstrap — import bootstrap/dist/css/bootstrap.min.css and the JS bundle
- [ ] 2. Grid System and Layout: 12-column flexbox-based grid: .container, .container-fluid, .row, .col, .col-md-6 etc
- [ ] 2. Grid System and Layout: Breakpoints: xs, sm, md, lg, xl, xxl (576/768/992/1200/1400px)
- [ ] 3. Components: Buttons, alerts, badges, cards, navs/navbar, forms, dropdowns, modals, toasts, tooltips, popovers, carousel
- [ ] 3. Components: Interaction components require JS: initialize with data-bs-* attributes for simplicity
- [ ] 4. Utilities and Theming: Rich utility classes: spacing (m-*, p-*), text (text-*), color (text-primary, bg-*), borders, shadows, opacity
- [ ] 4. Utilities and Theming: Customize via Sass variables (colors, spacing scale, border-radius) and $utilities map
- [ ] 5. Common Pitfalls: Importing JS but missing Popper for tooltips/popovers
- [ ] 5. Common Pitfalls: Overriding components by hacky class overrides instead of Sass variables

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
