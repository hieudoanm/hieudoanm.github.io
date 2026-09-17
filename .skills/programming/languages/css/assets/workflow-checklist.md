# css: Workflow Checklist

A practical run sheet for applying [css](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Box Model and Units: Every element is a box: content + padding + border + margin
- [ ] 1. Box Model and Units: box-sizing: border-box includes padding/border in width/height — the default for modern resets
- [ ] 2. Layout Systems: **Flexbox** (display: flex) for one-dimensional distribution: alignment, wrapping, ordering
- [ ] 2. Layout Systems: **Grid** (display: grid) for two-dimensional layout: columns/rows, grid-template, auto-fit/auto-fill for responsiveness
- [ ] 3. Selectors and Specificity: Selector types: type, class, id, attribute, pseudo-class (:hover, :focus, :nth-child), pseudo-elements (::before, ::after)
- [ ] 3. Selectors and Specificity: Specificity: inline styles > IDs > classes/pseudo-classes > types. !important escapes the cascade — avoid overuse
- [ ] 4. Responsive Design: Media queries: @media (min-width: ...), @media (prefers-color-scheme: dark), @media (prefers-reduced-motion: reduce)
- [ ] 4. Responsive Design: Mobile-first: base styles then min-width queries; adapt with clamp(), minmax(), fr, and aspect-ratio
- [ ] 5. Typography, Colors, and Effects: Typography: font-family, font-size, line-height, font-weight; @font-face/font-display: swap for webfonts
- [ ] 5. Typography, Colors, and Effects: Colors: hex, rgb()/rgba(), hsl(), lab()/oklch(); custom properties centralize theming

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
