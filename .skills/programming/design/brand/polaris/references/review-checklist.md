# Review checklist

Focused reference for **polaris-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 9. Declaring Divergence

1. Express divergence as a token override in `tokens.css`, never as a component
   restyle.
2. Re-check contrast after any color override.
3. Record which overrides exist and why — an undocumented token override is
   indistinguishable from a bug.
4. If you are overriding interaction patterns rather than values, you are no longer
   using Polaris; say so explicitly and manage that surface separately.

---

## General Rules of Thumb

- Reference `--p-*` tokens; never hard-code a Polaris color or spacing value.
- Stacking surfaces beats stacking shadows.
- Density tuned per surface — admin is not checkout, POS is not admin.
- Name every icon-only control.
- Keep all overrides in one token file.
- Treat WCAG 2.1 AA as a gate, not a goal.
- Prefer the current web-components target over legacy React examples.
- Write down every divergence.

---

## Quick-Start Checklist

- [ ] Correct Polaris target chosen for the surface (admin, checkout, accounts, POS)
- [ ] Component layer matches Polaris's current direction
- [ ] Colors referenced via `--p-color-*` roles only
- [ ] Spacing from the `--p-space-*` 4px scale
- [ ] Hierarchy built from surfaces; shadows only on floating elements
- [ ] Every interactive element has an accessible name
- [ ] Keyboard path and focus visibility verified for the whole task
- [ ] Bulk and destructive actions confirmed and clearly labelled
- [ ] Overrides centralized in one token file and documented

---

## Sources

- Polaris / Shopify developer docs — https://shopify.dev/docs/api/polaris
- Polaris site (legacy line) — https://polaris.shopify.com/
- Design tokens (legacy line) — https://polaris.shopify.com/design/design-tokens

Note: the design-tokens path now redirects to the Shopify developer documentation,
which describes the web-components direction. Confirm which line you are targeting
before following any example.
