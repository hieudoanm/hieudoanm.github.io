# Workflow notes

Focused reference for **slint-material-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
