# Overview

Focused reference for **slint-material-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
