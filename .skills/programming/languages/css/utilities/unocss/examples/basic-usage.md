# unocss: Basic Usage

UnoCSS — instant, atomic CSS engine with on-demand utility generation, preset system, and JavaScript-free config file.

## Scenario

Use this example as a starting point when applying **unocss** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Ideas** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({ scale: 1.2 }),
  ],
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
