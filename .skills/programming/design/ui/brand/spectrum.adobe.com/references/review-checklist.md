# Review checklist

Focused reference for **spectrum-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 8. Declaring Divergence

1. Customize through alias tokens or a theme; never by editing component internals.
2. A divergence needs a token, a reason, and a test in every density it can appear in.
3. If a change requires different markup at different densities, that is a design
   gap — escalate it rather than forking the component.
4. Never mix Spectrum implementations of the same component.

---

## General Rules of Thumb

- Consume alias tokens, never globals.
- Set density at the container, so a surface is internally consistent.
- Theme high on the tree; treat mode as a separate axis from color.
- Use the React, Web Component, or CSS line — do not mix them per component.
- Keep Adobe Clean unlicensed artifacts out of the repo.
- Density reductions come after item removal, not before.
- A tooltip is not an accessible name; both may be needed.
- Forking Spectrum is a decision to own it permanently. Make it explicitly.

---

## Quick-Start Checklist

- [ ] Target Spectrum version and implementation line confirmed
- [ ] Application code references alias tokens only
- [ ] Theme applied at the shell, modes handled separately
- [ ] Density set per container, consistent across sibling panels
- [ ] Focused surfaces verified at each density they can reach
- [ ] Keyboard path exercised for toolbar, panel, and overlay interactions
- [ ] Accessible names present on every icon-only control
- [ ] Contrast checked against real surfaces, including over canvas content
- [ ] Every divergence recorded with the token that carries it

---

## Sources

- Spectrum Hub (current documentation home) — https://s2.spectrum.adobe.com/
- Adobe Spectrum overview — https://spectrum.adobe.com/
- Foundations — https://s2.spectrum.adobe.com/foundations
- React Spectrum — https://react-spectrum.adobe.com/
