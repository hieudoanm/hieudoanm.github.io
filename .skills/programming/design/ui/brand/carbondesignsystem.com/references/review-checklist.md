# Review checklist

Focused reference for **carbon-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

Divergence is allowed and should be written down. When you depart from Carbon:

1. State what you changed and why (product requirement, not taste).
2. Do it by adding or overriding a **token**, so the change is theme-aware.
3. Keep the deviation in one file. Divergence scattered across components is
   indistinguishable from having no design system.
4. Re-check contrast in all four themes.

If you find yourself overriding three or more tokens to make one component look
different, the honest conclusion is that this surface is not Carbon.

---

## General Rules of Thumb

- Reference roles, never palette values or hex codes, in components.
- Choose the theme once, at the app shell, and let it cascade.
- Productive type for anything the user operates; editorial only for reading.
- Spacing from the scale, layout from the grid, depth from the layers.
- Use the component library for anything with keyboard behaviour.
- One component layer per surface — React or Web Components, not both.
- Test every theme before calling a screen done.
- Write down each divergence, with the token that carries it.

---

## Quick-Start Checklist

- [ ] `@carbon/react` (or Web Components) installed; the other layer not mixed in
- [ ] Theme selected at the shell, from `white` / `g10` / `g90` / `g100`
- [ ] No hex codes or `$blue-*` palette references inside components
- [ ] `$background`, `$text-primary`, `$layer-01` used instead of ad-hoc colors
- [ ] Productive type styles throughout the UI, editorial reserved for prose
- [ ] Spacing and grid spans from the system, not hard-coded percentages
- [ ] Keyboard paths exercised for every interactive element
- [ ] All four themes checked for contrast and focus visibility
- [ ] Every divergence recorded with its token

---

## Sources

- Carbon docs — https://carbondesignsystem.com/
- Themes (verified for this file) — https://carbondesignsystem.com/building-blocks/foundations/themes
- Foundations index — https://carbondesignsystem.com/building-blocks/foundations
- IBM Design Language — https://ibm.com/design/language
- Token source of truth — https://github.com/carbon-design-system/carbon/tree/main/packages/themes
