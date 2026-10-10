# uikit: Workflow Checklist

A practical run sheet for applying [uikit](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Installation and Setup: CDN: uikit CSS/JS from CDN (unbundled builds for production)
- [ ] 1. Installation and Setup: npm: npm i uikit — import uikit/dist/css/uikit.css, uikit/dist/js/uikit.min.js (+ .uikit-icons.min.js if using icons)
- [ ] 2. Layout Primitives: Flexbox utilities: uk-flex, uk-flex-center, uk-flex-between, uk-flex-wrap
- [ ] 2. Layout Primitives: Grid: uk-grid, uk-grid-small/large, uk-child-width-*, uk-grid-divider
- [ ] 3. Components: Elements: buttons (uk-button-*), badges, icons, labels, progress, cards, tables, forms
- [ ] 3. Components: Complex: navbar, dropdown, modal, off-canvas, slider, tabs, accordion, lightbox, notification (UIkit.notification)
- [ ] 4. JavaScript and Initialization: Components initialize automatically via data attributes (uk-modal, uk-offcanvas)
- [ ] 4. JavaScript and Initialization: Programmatic API: UIkit.modal('.modal').show(), UIkit.offcanvas('.oc').toggle(), etc
- [ ] 5. Theming and Customization: Sass variables ($global-color, $primary-*, $card-*, etc.) to theme without CSS overrides
- [ ] 5. Theming and Customization: Compile only needed modules with a custom Sass build for a smaller bundle

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
