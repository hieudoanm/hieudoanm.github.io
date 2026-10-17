# Landify (Go)

> Build a flat landing page from a single YAML file — plain HTML and CSS with
> zero runtime dependencies.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-static-blue)
![Go](https://img.shields.io/badge/go-1.27%2B-blue)

---

## What is Landify?

Landify turns one annotated YAML file into a complete single-file landing page.
The default `landify` binary is pure Go (no CGO), self-contained (templates,
partials and examples are embedded with `//go:embed`), and needs no external
assets or network calls.

- **Sections from one file** — theme, hero, features, pricing, FAQ, and more.
- **Plain HTML and CSS output** — no JavaScript.
- **Renders anywhere** — and never goes stale.

---

## Latest release

- **Version:** `app-headless-landify-latest` — rebuilt automatically on every
  push to the default branch (see [PACKAGING](11-deployment.md)).
- **What's new:** see the [ROADMAP](10-implementation-plan.md) and
  [CONTRIBUTING](09-testing-strategy.md).

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
> [PACKAGING](11-deployment.md). Every plain binary includes the terminal editor
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

See [PACKAGING](11-deployment.md) for the CI artifact pipeline and
[CONTRIBUTING](09-testing-strategy.md) for setup and dev commands.

---

## Getting started

```bash
# scaffold a content file, then validate and build it
./bin/landify new                 # writes landify.yaml (product layout)
./bin/landify validate            # strict schema check
./bin/landify build               # writes index.html
./bin/landify preview -p 8080     # preview at http://localhost:8080
```

Everything is embeddable — copy the generated HTML and CSS anywhere.

---

## License

See [LICENSE](../LICENSE).
