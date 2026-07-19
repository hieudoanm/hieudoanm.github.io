# Review checklist

Focused reference for **slint-material-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
