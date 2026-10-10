# Review checklist

Focused reference for **lightning-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## General Rules of Thumb

- Global styling hooks (`--slds-g-*`) for all new styling; tokens are legacy.
- Hook grammar is regular — navigate by category instead of searching everything.
- Lightning base components over copied blueprint markup.
- Never read or write hooks at runtime; substitution is compile-time.
- Match token scope to the component you are building.
- Brand color via accent-category hooks and Themes and Branding, never hard-coded.
- WCAG 2.1 contrast, and accessible names on record actions.
- Linter and Validator before you ship, especially on migrated code.

---

## Quick-Start Checklist

- [ ] New styles use global styling hooks, not SLDS 1 design tokens
- [ ] Hooks work under both SLDS 1 and SLDS 2 themes
- [ ] No runtime `getPropertyValue` / `setPropertyValue` on styling hooks
- [ ] Interactive elements are Lightning base components, not copied blueprint markup
- [ ] Token/hook scope matches the component using it
- [ ] Brand color comes from accent-category hooks + Themes and Branding
- [ ] No hard-coded brand hex values in component CSS
- [ ] Accessible names present on icon-only and record-level actions
- [ ] SLDS Linter and Validator clean
- [ ] Layout handles both adaptive and responsive breakpoints intentionally

---

## Sources

- Salesforce Lightning Design System — https://www.lightningdesignsystem.com/
- SLDS 1 vs SLDS 2 comparison — https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-slds1-slds2.html
- Using design tokens (deprecated) — https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-design-tokens.html
- SLDS blueprints — https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-slds-blueprint
- Getting started with SLDS 2 (styling hook grammar) — https://trailhead.salesforce.com/content/learn/modules/salesforce-lightning-design-system-2-for-developers/explore-salesforce-lightning-design-system-2
- SLDS best practices (token scope) — https://trailhead.salesforce.com/content/learn/modules/lightning-design-system-development-for-designers/understand-slds-best-practices
- Historical SLDS 1 source (archived, read-only) — https://github.com/salesforce-ux/design-system

Note: `developer.salesforce.com` may reject automated requests; if it does, use the
Trailhead modules or the archived repository above as the source for the same facts.
