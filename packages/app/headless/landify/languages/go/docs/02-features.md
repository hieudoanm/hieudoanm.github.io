# Features

Landify is driven by the top-level `type:` key and supports twelve page types:

| Type      | Description                                                        |
| --------- | ------------------------------------------------------------------ |
| product   | Hero, features, demo video, CTA (default layout)                   |
| waitlist  | Email capture, launch date, social links                           |
| event     | Date/venue strip, agenda timeline, speaker grid                    |
| download  | Version/license badges, per-OS buttons, install snippet            |
| app       | Store badges, ratings, portrait 9:16 screenshot gallery            |
| pricing   | Tier cards with a "most popular" plan                              |
| portfolio | Avatar, skills chips, project grid                                 |
| docs      | Topic card links, optional code sample                             |
| faq       | Native `<details>` rows, no JavaScript                             |
| team      | Values strip, member card grid                                     |
| status    | State banner, uptime stats, incident log                           |
| linktree  | Compact profile with big link cards (the only type without a hero) |

## Themes

All 64 built-in theme presets are selectable at build time:

```bash
./bin/landify themes                     # list presets
./bin/landify build --theme slate        # build with a preset
```

Or define the eight base colors in `theme:` (`base`, `primary`, `secondary`,
`neutral`, `info`, `warning`, `success`, `error`) plus `radius`, and Landify
derives every other token — shades, tints, borders and WCAG-ready contrast —
automatically.

## Validation

`landify validate` reports every missing or invalid field at once and exits 1
on any problem, so a bad YAML file never produces a half-baked page. Parsing
uses `yaml.Decoder` with `KnownFields(true)`, so unknown YAML fields are
rejected.

## Social metadata

The optional `site.og` block feeds Open Graph + Twitter card tags in every
layout, with site-level fallbacks for title, description and site name. A
generated social card (`og/og.svg`, 1200 × 630) is written beside the page on
every build when `site.og` is configured.

## CLI

Nine subcommands on the root Cobra command: `new`, `validate`, `build`,
`themes`, `preview`, `serve`, `tui`, `studio`, `mcp`. `--file` (`-f`, default
`landify.yaml`) is a persistent root flag; `studio` and `serve` are gated
behind build tags / separate binaries.
