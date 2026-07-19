# Implementation notes

Focused reference for **spectrum-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Theme and Mode

- **Theme** — the color scheme (light, dark, and any high-contrast variants).
- **Mode** — behavioral variants layered on a theme: size, density, and emphasis.
- A dark theme is not a separate design; it is the same roles with different values.

```css
.theme-dark {
  --alias-background-color-primary: #1d1d1d;
}

.density-compact .toolbar-item {
  --alias-component-padding-x: var(--global-dimension-size-50);
}
```

- Toggle the theme high on the tree — at the shell — so every descendant resolves
  against it.
- If a component needs different values at different densities, that is a mode, and
  the switch belongs on an ancestor.

---

## 6. Implementation: Pick Your Line

| Need                              | Package                          |
| --------------------------------- | -------------------------------- |
| React, full-featured, adaptive    | `@adobe/react-spectrum`          |
| Framework-agnostic web components | `@adobe/spectrum-web-components` |
| CSS-only, markup-level styling    | `@adobe/spectrum-css-temp-*`     |

- **React Spectrum** is the most capable: it handles adaptive responsive
  behavior, collections, and overlays with accessibility built in. Prefer it for
  new React work when you need those behaviors.
- **Web Components** are the framework-agnostic route and are a good fit for
  embedding Spectrum UI into a non-React host.
- **CSS-only** packages are for markup you are migrating; they are versioned
  individually, so pin deliberately.
- Do not mix the React and Web Component implementations for the same component in
  one surface. The density model and focus handling will diverge.

---

## 7. Accessibility

- Spectrum components ship keyboard behavior and ARIA. Reuse them instead of
  reimplementing keyboard handling for a toolbar, list, or overlay.
- Focus indicators are part of the component; never remove them without a
  replacement checked against every theme.
- Icon-only tool buttons need accessible names, and in a dense toolbar those names
  are often not visible — an accessible label plus a tooltip is the usual pairing.
- Never encode a property in color alone. In creative tools this means selection,
  visibility, and lock state each need a non-color signal.
- Respect reduced motion. Tool UIs animate a lot; animation is not feedback.
- Verify contrast against the actual surface the element sits on — over a canvas,
  that surface is user content you do not control.
