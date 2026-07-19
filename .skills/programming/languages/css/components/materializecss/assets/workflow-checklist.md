# materializecss: Workflow Checklist

A practical run sheet for applying [materializecss](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup and Installation: CDN: include CSS + JS (choose the minified build from the official CDN)
- [ ] 1. Setup and Installation: npm: npm i materialize-css (import CSS; add JS bundle manually)
- [ ] 2. Grid and Layout: 12-column **flexbox row/col grid** with breakpoints (s/m/l/xl)
- [ ] 2. Grid and Layout: Utilities: container, section, divider, valign-wrapper, hide/show via hide-on-*
- [ ] 3. Components: Typography, buttons (btn, btn-flat, btn-floating), cards, navbars, side nav, tabs
- [ ] 3. Components: Forms: inputs with floating labels (validate, label), selects, switches, checkboxes/radios, range, datepickers
- [ ] 4. JavaScript Behaviors: Initialize via M.AutoInit() for data-* attributes or call constructors manually
- [ ] 4. JavaScript Behaviors: Examples: M.Modal.init(el), M.Sidenav.init(el), M.Dropdown.init(el)
- [ ] 5. Theming and Icons: Include Material Icons font (material-icons class) for iconography
- [ ] 5. Theming and Icons: Override variables ($primary-color, $secondary-color, $roboto-font-family) via Sass

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
