# Color in CSS

> Gradients, palettes and theme roles for shipping color to the browser.

App route: `/colors/css/`

## Gradients

CSS interpolates between color stops. A linear gradient blends along a line at a
chosen angle; a radial gradient blends outward from a center. The midpoint of
two colors is their RGB average, which can look muddy when the stops are
complementary.

Gradients are cheap to author, but using them where a flat scale would do adds
needless variation — reserve them for moments.

## Palettes and tokens

A strong palette keeps colors balanced: a dominant hue for large areas,
variations in lightness for hierarchy, and one or two accents from a harmonizing
spot on the wheel. Random palettes should be checked for contrast and for how
they feel together.

Consistent scales become CSS custom properties named by step, so components
reference a single palette instead of hard-coded hex values.

## Theme roles

Design systems map a palette onto named roles. In DaisyUI each role such as
primary, secondary or base-100 is a CSS variable, and the content roles hold the
readable text color for their paired background.

Theming tools read those computed variables at runtime, so the palette you
browse is always the theme actually applied.

## Examples

- [Gradient Builder](/colors/css/gradient) — Compose linear and radial CSS
  gradients from two or three stops.
- [Palette Generator](/colors/css/palette) — Roll a random harmonious five-color
  palette.
- [Theme Colors](/colors/css/theme) — Browse the active theme palette roles as
  copyable CSS variables.
