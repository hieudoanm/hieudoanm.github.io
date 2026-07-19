# less: Workflow Checklist

A practical run sheet for applying [less](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Installation and Setup: Install: npm install -g less (CLI) or less as a devDependency for build pipelines
- [ ] 1. Installation and Setup: Compile: lessc input.less output.css (see lessc --help for all options)
- [ ] 2. Variables and Mixins: Variables: @brand: #4b8; .btn { color: @brand; } (lazy evaluation, scoped)
- [ ] 2. Variables and Mixins: Mixins: reusable style blocks with arguments, defaults, and ;variadic(...):
- [ ] 3. Nesting and Selectors: Nest selectors for readability; & refers to the current selector: .nav { &-item { ... } &--active { ... } }
- [ ] 3. Nesting and Selectors: Combine with media queries nested inside rules: .card { @media (max-width: 600px) { ... } }
- [ ] 4. Functions and Operations: Arithmetic: @width: (100% / 3); — works with compatible units
- [ ] 4. Functions and Operations: Built-ins: lighten(), darken(), fade(), mix(), percentage(), math(), unit()
- [ ] 5. Import and Modularity: @import "base.less"; @import "reset.less"; — use @import (reference) to pull in only definitions used
- [ ] 5. Import and Modularity: @import (css) for plain CSS files; once (default) prevents double-import

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
