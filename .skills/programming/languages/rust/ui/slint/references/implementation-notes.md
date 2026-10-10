# Implementation notes

Focused reference for **slint-material-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
