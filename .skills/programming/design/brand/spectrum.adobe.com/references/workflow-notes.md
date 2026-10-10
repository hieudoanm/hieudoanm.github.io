# Workflow notes

Focused reference for **spectrum-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

```css
/* application code consumes the alias, never the primitive */
.panel {
  background: var(--alias-background-color-primary);
  color: var(--alias-label-text-color);
}
```

Referencing a global token directly in a component hard-codes today's value and
breaks the moment a theme or mode changes it. This is the most common Spectrum
integration mistake.

Confirm the exact global and alias namespaces for your target version in the
Spectrum Hub before writing code — they are the part most affected by the current
reorganization.

---

## 3. Density Is the Point

Spectrum's distinguishing contribution. The same component must render at several
densities so that panels can pack more without shrinking text below legibility.

- Dense surfaces: toolbars, inspectors, asset lists, layer lists.
- Regular surfaces: dialogs, panels, settings.
- Density is selected at the container, not per component. A toolbar at one density
  next to a panel at another reads as a bug even when both are technically correct.
- When vertical space is scarce, remove items or collapse into a menu before
  dropping to a denser scale. Reducing legibility is the last resort.

Consult the density foundations page for the current set of scales and the exact
tokens that drive them.

---

## 4. Typography

- Spectrum ships **Adobe Clean** for UI and **Adobe Clean Text** for running text.
  These are licensed Adobe fonts — do not bundle them in a repo without the license.
- Type scale tokens separate UI roles (label, heading, body, caption) from sizes.
  Use the role, not a pixel size.
- Tool UI needs short, scannable labels. If a label does not fit, shorten the label;
  do not shrink the type below the role's defined size.
- Weight and spacing carry hierarchy in dense surfaces, not size.

If you need a substitute outside Adobe products, choose a neutral UI sans and
record it as a declared divergence rather than silently swapping.
