# Landify (Go)

> Build a flat landing page from a single YAML file — plain HTML and CSS with
> zero runtime dependencies.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-static-blue)
![Go](https://img.shields.io/badge/go-1.27%2B-blue)

---

## Latest release

- **Version:** `app-headless-landify-latest` — rebuilt automatically on every
  push to the default branch (see [PACKAGING](PACKAGING)).
- **What's new:** see the [ROADMAP](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the option that fits your environment.

### Install script

```bash
curl -fsSL https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/master/packages/app/headless/landify/languages/go/scripts/install.sh | bash
```

### Prebuilt binary

| No  | Platform | Architecture | Download Link                               | Note                          |
| --- | -------- | ------------ | ------------------------------------------- | ----------------------------- |
| 1   | Linux    | amd64        | [Download `landify`][download-linux-amd64]  | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `landify`][download-linux-arm64]  | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `landify`][download-darwin-amd64] | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `landify`][download-darwin-arm64] | Static binary, no deps needed |

[download-linux-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-landify-latest/app-headless-landify-landify-linux-amd64
[download-linux-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-landify-latest/app-headless-landify-landify-linux-arm64
[download-darwin-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-landify-latest/app-headless-landify-landify-darwin-amd64
[download-darwin-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-landify-latest/app-headless-landify-landify-darwin-arm64

```bash
chmod +x landify
./landify new
```

> The pipeline cross-compiles all four platforms with `make build-all`; see
> [PACKAGING](PACKAGING). Every plain binary includes the terminal editor
> (`landify tui`) — build commands and editing work without CGO or a display.
> The `studio` desktop GUI ships separately as `landify-gui`
> (`make build-gui`, needs CGO).

### Build from source

Prefer to build it yourself? Clone, build, and use in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/headless/landify/go
make build
./bin/landify new
```

See [PACKAGING](PACKAGING) for the CI artifact pipeline and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## Getting started

```bash
# scaffold a content file, then validate and build it
./bin/landify new                 # writes landify.yaml (product layout)
./bin/landify validate            # strict schema check
./bin/landify build               # writes index.html
./bin/landify serve -p 8080       # preview at http://localhost:8080
```

Everything is embeddable — copy the generated HTML and CSS anywhere.

---

## About

Landify turns one annotated YAML file into a complete single-file landing page:
theme, hero, features, pricing, FAQ, and more. Output is plain HTML and CSS
with no JavaScript, so it renders anywhere and never goes stale.

---

## Features

### Layouts

Twelve page types driven by the top-level `type:` key:

- **product** (default) — hero, features, demo video, CTA
- **waitlist** — email capture, launch date, social links
- **event** — date/venue, agenda timeline, speaker grid
- **download** — version badges, per-OS buttons, install snippet
- **app** — store badges, ratings, portrait screenshot gallery
- **pricing** — tier cards with a "most popular" plan
- **portfolio** — avatar, skills chips, project grid
- **docs** — topic card links, code sample
- **faq** — native `<details>` rows (no JavaScript)
- **team** — values strip, member card grid
- **status** — state banner, uptime stats, incident log
- **linktree** — compact profile with big link cards

### Themes

All 64 built-in presets are selectable at build time:

```bash
./bin/landify themes                     # list presets
./bin/landify build --theme slate        # build with a preset
```

Or define the eight base colors in `theme:` and let Landify derive every other
token — shades, tints, borders and WCAG-readable contrast — automatically.

### Validation

`landify validate` reports every missing or invalid field at once and exits 1
on any problem, so a bad YAML file never produces a half-baked page.

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](../LICENSE).
