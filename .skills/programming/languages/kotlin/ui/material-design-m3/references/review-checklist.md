# Review checklist

Focused reference for **material-design-m3**, excerpted from SKILL.md. The skill file remains the canonical guide.

- Loading dynamic color on unsupported OS versions without fallback.

## General Rules of Thumb

- Theming is token-first: define color, typography, and shape once, consume via roles.
- Use dynamic color when supported, custom scheme otherwise; always support dark.
- Prefer Material 3 components over custom visuals to stay accessible and consistent.
- Elevate via tonal overlays and shadows consistently across the app.

## Quick-Start Checklist

- [ ] Add `material3` dependency; wrap app in `MaterialTheme`.
- [ ] Define `ColorScheme` (dynamic where available + fallback) and typography/shape.
- [ ] Ensure dark theme objectivity (`darkColorScheme()`).
- [ ] Migrate components from M2 to M3; avoid mixing libraries.
- [ ] Verify dynamic color fallback on API < 31.
- [ ] Check contrast/accessibility and touch-target sizes.
- [ ] Test tonal overlays and elevation rendering across surfaces.
