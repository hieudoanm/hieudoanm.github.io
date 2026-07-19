---
name: spectrum-design-system
description: Build Adobe creative-tool and productivity UI on the Spectrum design system. Covers the global/alias token split, Spectrum's canvas-plus-chrome density model, UI typography, theme and mode handling, the React Spectrum / Web Components / CSS-only implementations, tool-surface accessibility, and how to avoid forking the system. Use when building or reviewing creative editors, panels, toolbars, inspectors, or Adobe-adjacent enterprise UI.
---

# Spectrum Design System (Adobe)

Spectrum is the design system behind Adobe's creative and productivity
experiences. It is the right reference when the UI is **chrome around a canvas**:
an editor, an inspector, a toolbar, a panel — surfaces where the user's attention
belongs on the content and the interface's job is to stay out of the way.

**You buy:** a density model built specifically for tool UIs, a two-tier token
system that separates primitives from semantics, themes and modes, and three
mature implementations including React Spectrum.

**You pay:** Spectrum is opinionated about density in a way most app chrome is not,
its documentation has been reorganized around the Spectrum Hub, and the current
version is still in transition.

**Version note:** Spectrum has moved through versions, with Spectrum 2 rebuilding
the token foundation for clarity. Confirm which version you are targeting — the
token names differ, and the current documentation is organised per platform.

---

## 1. Core Principles

- **The canvas is the content.** UI is chrome; chrome must not compete with the
  work.
- **Density is a first-class variable.** Creative tools change what is on screen
  constantly, so the same component appears at multiple densities.
- **Primitives vs semantics.** A global token is a raw value; an alias token is
  what a value _means_. Components consume aliases, never globals.
- **Modes are not themes.** A theme is a color scheme; a mode changes how the same
  scheme behaves (size, density, emphasis). Conflating them is a common bug.
- **Consistency across products.** A user who knows Photoshop's panels already
  knows Spectrum's.
- **Never fork.** Customize through tokens; a fork is unmaintainable by definition.

---

## 2. The Two-Tier Token Model

```
primitive (global)   ->   semantic (alias)   ->   component
```

- **Global tokens** hold raw values: colors, dimensions, font sizes, durations.
  They know nothing about where they will be used.
- **Alias tokens** bind meaning: "this surface color is a background", "this is an
  border that must pass contrast". This is the tier components consume.
- **Component tokens** are internal to a component and should not be referenced
  from application code.

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
