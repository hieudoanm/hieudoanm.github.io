# Slint + Material Design Best Practices: Basic Usage

Best practices for building Material Design-styled desktop/embedded GUIs with Slint (Rust). Use when creating, styling, or reviewing a Slint app — covers the Material style, .slint theming, typography, elevation, and component patterns with suggested values.

## Scenario

Use this example as a starting point when applying **slint-material-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Color: Use Material Tokens, Don't Hardcode** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```slint
import { Palette } from "std-widgets.slint";

Rectangle {
    background: Palette.background;
}

Text {
    color: Palette.foreground;
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
