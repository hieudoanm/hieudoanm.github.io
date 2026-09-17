# css: Validation Plan

Use this plan to verify work guided by [css](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] Use **CSS custom properties** (variables) for tokens: :root { --color-primary: ... }
- [ ] content-visibility: auto, will-change (sparingly), and contain reduce paint cost for heavy pages
- [ ] Reduce specificity wars: BEM or utility classes keep the cascade predictable
- [ ] Critical CSS inline; defer full stylesheets for long pages
- [ ] !important/high-specificity sneak attacks making overrides painful
- [ ] position: absolute stacks without room; collapsing margins without overflow context
- [ ] Neglecting prefers-reduced-motion/color contrast/accessibility
- [ ] Non-performant animations (animating width/height instead of transforms)

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
