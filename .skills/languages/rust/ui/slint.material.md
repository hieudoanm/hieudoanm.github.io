---
name: slint-material-design
description: Best practices for building Material Design-styled desktop/embedded GUIs with Slint (Rust). Use when creating, styling, or reviewing a Slint app — covers the Material style, .slint theming, typography, elevation, and component patterns with suggested values.
---

# Slint + Material Design Best Practices

Slint ships a built-in **Material** style (`SLINT_STYLE=material` or set in `slint-build`) that already implements most Material Design conventions. The main job is not reinventing Material tokens but applying them consistently and not fighting the style with ad-hoc overrides.

---

## 1. Setup

Set the style at build time or runtime:

```toml
# build.rs / Cargo config
slint_build::compile("ui/app.slint").unwrap();
```

```rust
// runtime override (or set SLINT_STYLE env var before build)
slint::BackendSelector::new().backend_name("winit".into());
```

```bash
SLINT_STYLE=material-dark cargo run   # or material-light
```

Prefer `material-light` / `material-dark` explicitly over generic `material` so you control which variant ships, rather than inheriting OS theme unpredictably during development.

---

## 2. Color: Use Material Tokens, Don't Hardcode

Slint's Material style already defines a Material 3 color scheme via `Palette`. Reference it instead of raw hex values so light/dark switching works for free:

```slint
import { Palette } from "std-widgets.slint";

Rectangle {
    background: Palette.background;
}

Text {
    color: Palette.foreground;
}
```

If you need custom brand colors on top, define them once as a global and derive from Material roles rather than replacing them wholesale:

```slint
export global AppColors {
    out property <color> primary: #4F9CFF;
    out property <color> accent: #A78BFA;
    out property <color> error: #FF5C5C;
    out property <color> success: #4FD68C;
}
```

**Suggested palette** (if you need to define your own instead of relying on defaults):

| Role              | Light     | Dark      |
| ----------------- | --------- | --------- |
| Primary           | `#3B7DD8` | `#4F9CFF` |
| Secondary/Accent  | `#7C3AED` | `#A78BFA` |
| Background        | `#FAFAFA` | `#121212` |
| Surface           | `#FFFFFF` | `#1E1E1E` |
| On-surface (text) | `#1A1A1E` | `#E8E8EC` |
| Error             | `#D64545` | `#FF5C5C` |

---

## 3. Elevation (Shadows)

Material relies heavily on elevation to communicate hierarchy — Slint supports `drop-shadow-*` properties directly:

| Level | Use                    | Suggested shadow                                                                   |
| ----- | ---------------------- | ---------------------------------------------------------------------------------- |
| 0     | Flat background        | none                                                                               |
| 1     | Card, resting button   | `drop-shadow-blur: 4px; drop-shadow-color: #00000022; drop-shadow-offset-y: 1px;`  |
| 2     | Raised button, app bar | `drop-shadow-blur: 8px; drop-shadow-color: #00000030; drop-shadow-offset-y: 2px;`  |
| 3     | Dialog, menu, FAB      | `drop-shadow-blur: 16px; drop-shadow-color: #00000040; drop-shadow-offset-y: 4px;` |

```slint
Rectangle {
    border-radius: 12px;
    background: Palette.background;
    drop-shadow-blur: 8px;
    drop-shadow-color: #00000030;
    drop-shadow-offset-y: 2px;
}
```

Don't apply the same elevation to every surface — flat background (0) vs cards (1) vs dialogs (3) should be visually distinguishable at a glance.

---

## 4. Spacing Tokens (Material 8dp Grid)

Material Design is built on an 8px base unit. Define once, reuse everywhere:

```slint
export global Spacing {
    out property <length> xs: 4px;
    out property <length> sm: 8px;
    out property <length> md: 16px;
    out property <length> lg: 24px;
    out property <length> xl: 32px;
}
```

| Use                   | Value                                           |
| --------------------- | ----------------------------------------------- |
| Icon-to-text gap      | 8px                                             |
| Card internal padding | 16px                                            |
| Section gap           | 24px                                            |
| Page margin           | 16–24px (mobile), 24–32px (desktop)             |
| Button height         | 40px (dense), 48px (standard, Material default) |
| Touch target minimum  | 48x48px                                         |

---

## 5. Typography (Material Type Scale)

Slint's `material` style provides default `Text` sizing per widget, but for custom text elements, follow Material's type scale (values approximate; adjust to your `default-font-size`):

| Role          | Size    | Weight         |
| ------------- | ------- | -------------- |
| Display       | 32–40px | Regular/Medium |
| Headline      | 24–28px | Regular        |
| Title         | 18–20px | Medium         |
| Body          | 14–16px | Regular        |
| Label/caption | 11–12px | Medium         |

```slint
Text {
    text: "Section Title";
    font-size: 20px;
    font-weight: 500;
    color: Palette.foreground;
}
```

Limit a screen to 3 type roles max (e.g. Title + Body + Caption) — more starts looking inconsistent.

---

## 6. Shape (Corner Radius)

Material 3 uses consistent, purposeful rounding:

| Component  | Radius                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| Button     | 20px (full/pill for standard buttons) or 8px (for less prominent actions) |
| Card       | 12px                                                                      |
| Dialog     | 16–28px                                                                   |
| Text field | 4px (top corners only, for filled style)                                  |
| Chip       | 8px                                                                       |

Pick radii from one small set (e.g. `4 / 8 / 12 / 20`) — don't invent a new radius per component.

---

## 7. Components: Use `std-widgets.slint` First

Slint ships Material-styled widgets — use them before building custom ones:

```slint
import { Button, LineEdit, CheckBox, ComboBox, TabWidget, ProgressIndicator } from "std-widgets.slint";
```

- `Button` — has `primary: true` property for the filled/prominent Material button variant; leave `false` for a text/outlined-style secondary action.
- `LineEdit` — already implements Material's filled text-field look; don't rebuild input styling from scratch.
- `TabWidget` — implements the Material tab indicator automatically.
- `ProgressIndicator` — use for any operation >300ms, `indeterminate: true` for unknown-duration tasks.

Only drop to custom `Rectangle`/`Path` composition when a design genuinely isn't covered by std-widgets (e.g. a custom chart or a bespoke card layout) — and when you do, reuse the color/spacing/elevation tokens above so custom components still look native.

---

## 8. Layout

- Use `VerticalLayout` / `HorizontalLayout` with `spacing` and `padding` set from the `Spacing` tokens rather than manual `x`/`y` positioning.
- Use `GridLayout` for form-like or dashboard content.
- Respect minimum window size (`min-width`, `min-height` on the root `Window`) so Material spacing doesn't collapse on resize.

```slint
export component AppWindow inherits Window {
    min-width: 480px;
    min-height: 360px;
    VerticalLayout {
        padding: Spacing.md;
        spacing: Spacing.sm;
        // ...
    }
}
```

---

## 9. General Rules of Thumb

- **Don't fight the Material style** — overriding every widget's colors/shapes individually usually looks worse than adjusting the `Palette` globally.
- **Test both `material-light` and `material-dark`** — set via `SLINT_STYLE` — before shipping.
- **One primary color, one accent, neutral everything else** — Material is forgiving on layout but unforgiving on color sprawl.
- **Respect elevation semantics** — don't give a flat background the same shadow as a dialog.

---

## Quick-Start Checklist

- [ ] `SLINT_STYLE` explicitly set to `material-light`/`material-dark`
- [ ] Colors sourced from `Palette` or a single custom color global, not scattered hex literals
- [ ] Spacing values pulled from an 8px-based token set
- [ ] Elevation (drop-shadow) used to distinguish background / card / dialog levels
- [ ] Corner radii limited to one small consistent set
- [ ] Type roles limited to 3 per screen (title/body/caption)
- [ ] `std-widgets.slint` components used before custom-built ones
- [ ] Tested in both light and dark Material variants
