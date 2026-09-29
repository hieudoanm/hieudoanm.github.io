# Color Models

> The coordinate systems used to describe a color numerically.

App route: `/colors/models/`

## Additive and subtractive

Screens are **additive**: they start black and mix red, green and blue light.
Printers are **subtractive**: they start white and overlay cyan, magenta, yellow
and key (black) ink that absorbs light. The RGB and CMYK models exist for these
two ends of the pipeline.

Converting between the two is approximate — print smear and ink gamut change the
result — but for design work the math is close enough to preview.

## Perceptual models

**HSL** and **HSV** describe color the way people think about it: a _hue_ angle
(0° red, 120° green, 240° blue), a _saturation_ from neutral gray to vivid, and
a lightness or value. These models make it easy to tune a color without guessing
which RGB numbers to change.

Both wrap the same underlying RGB space, so converting between them changes
coordinates, never the color itself.

## HEX as compact RGB

A six-digit **HEX** code is just RGB written in base 16: the first pair is red,
the second green, the third blue. A three-digit code doubles each digit, so
`#07c` means the same as `#0077cc`.

Being a fixed-width text format, HEX is what most design tools and style sheets
use, even though it is the least readable way to see how a color will behave.

## Examples

- [Color Converter](/colors/models/converter) — Convert the active color between
  HEX, RGB, HSL, HSV and CMYK.
- [Color Adjuster](/colors/models/adjuster) — Tune hue, saturation and lightness
  of any color with sliders.
- [Random Color](/colors/models/random) — Generate and lock a random color to
  inspect in every notation.
