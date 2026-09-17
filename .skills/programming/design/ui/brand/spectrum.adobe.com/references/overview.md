# Overview

Focused reference for **spectrum-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
