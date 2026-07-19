# Carbon Design System (IBM): 2. Themes and the Token Model

## Source guidance

This example applies the **2. Themes and the Token Model** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Sass tokens use a `$` prefix (`$layer-01`, `$interactive`, `$field-01`) and are
grouped into four categories: **color**, **spacing**, **typography**, **global**.
Global tokens hold the layer and component-level values.
Sass tokens compile to `--cds-*` custom properties, so the fastest way to find the
real name of a value is to read the compiled CSS rather than guess.
Customise by overriding token values with the Sass module `with` clause — never by
patching component internals:

## Example

This excerpt is from the cited **2. Themes and the Token Model** section.

```scss
@use '@carbon/react' with (
  $background: #ffffff,
  $layer-01: #f4f4f4
);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for carbon-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
