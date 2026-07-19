# sass: Workflow Checklist

A practical run sheet for applying [sass](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Installation and Setup: Modern setup: npm install -D sass (Dart Sass). Legacy: Ruby Sass (deprecated)
- [ ] 1. Installation and Setup: Cli: sass input.scss output.css; watch mode: sass --watch
- [ ] 2. Syntax: SCSS vs Sass: **SCSS** (recommended): CSS-compatible syntax @mixin, @use, .card { color: $color; }
- [ ] 2. Syntax: SCSS vs Sass: **Sass** (indented): significant whitespace, no braces/semicolons; legacy but still supported
- [ ] 3. Variables, Maps, and Functions: Variables: $color: #4b8; — scope per module/{}
- [ ] 3. Variables, Maps, and Functions: Maps: $breakpoints: (sm: 576px, md: 768px); with map-get($m, key), map-merge, iteration via @each
- [ ] 4. Mixins and Include: Reusable styles: @mixin card($radius: 4px) { ... } consumed with @include card()
- [ ] 4. Mixins and Include: Content blocks: @content inside mixins for slot-style overriding
- [ ] 5. Nesting, `&`, and Extending: & refers to the current selector context; common for BEM modifiers: .btn &:hover, &--primary
- [ ] 5. Nesting, `&`, and Extending: @extend inherits a selector's styles — prefer mixins over @extend (cleaner, no selector bloat)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
