# sass: Basic Usage

Sass — most mature CSS preprocessor with SCSS syntax, variables, nesting, mixins, functions, and modules, compiled via Dart Sass.

## Scenario

Use this example as a starting point when applying **sass** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Syntax: SCSS vs Sass** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```scss
// components/_button.scss
@use "../tokens" as t;

.button {
  display: inline-flex;
  align-items: center;
  gap: t.$space-2;
  padding-inline: t.$space-3;
  border-radius: t.$radius-md;
  background: t.$color-primary;

  &:hover {
    filter: brightness(1.1);
  }

  &--ghost {
    background: transparent;
    border: 1px solid t.$color-primary;
  }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
