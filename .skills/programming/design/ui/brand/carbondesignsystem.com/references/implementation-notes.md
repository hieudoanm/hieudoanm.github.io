# Implementation notes

Focused reference for **carbon-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Elevation Is a Layer, Not a Shadow

Carbon models surfaces as layers rather than as a pile of shadows:

```scss
.card {
  background: $layer-01;
}

.card--raised {
  background: $layer-accent-01;
}
```

- `$layer-01` … nested containers; `$layer-accent-01` for the raised/popover plane.
- A container that needs a shadow is usually a `$layer-accent` surface plus a
  border. Reach for the layer first.
- Overlays (`modal`, `popover`, `toggletip`) sit on the accent layer and own the
  focus indicator.

---

## 7. Implementation: Which Package

| Need               | Package                          |
| ------------------ | -------------------------------- |
| React components   | `@carbon/react`                  |
| Framework-agnostic | `@carbon/web-components`         |
| Themes and tokens  | `@carbon/themes`                 |
| Grid and layout    | `@carbon/layout`, `@carbon/grid` |
| Icons              | `@carbon/icons-react`            |
| Charts             | `@carbon/charts`                 |

Pick one component layer and stay in it. Carbon publishes both React and Web
Components from the same design source; mixing them in one surface produces two
focus systems and two token namespaces fighting each other.

For an existing React codebase, `@carbon/react` is the low-friction choice. For a
design-system-agnostic or framework-portable embed, use Web Components.

---

## 8. Accessibility

- Carbon components ship keyboard interaction, focus management, and ARIA for the
  complex widgets. Prefer them to native elements plus your own key handling.
- WCAG AA is the baseline Carbon is held to; do not ship a variant that regresses it.
- Focus indicators are part of the layer system — never `outline: none` without a
  replacement you have checked against a dark theme.
- Never encode state in color alone. Status needs an icon, a label, or both.
- Disabled is not the same as hidden. Removing a control from the layout changes
  what the user knows the system can do.
- Test all four themes, not just white. Contrast regressions hide in `g90`.

---

## 9. Declaring Divergence
