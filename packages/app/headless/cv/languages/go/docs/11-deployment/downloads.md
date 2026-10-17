# cv (Go)

> turn a single `cv.yaml` into a print-ready PDF — 64 templates, a Markdown
> export, an HTTP endpoint, and an MCP server, all in one static Go binary.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-static-blue)
![Go](https://img.shields.io/badge/go-1.27%2B-blue)

---

## Latest release

- **Version:** `app-headless-cv-latest` — rebuilt automatically on every push
  to the default branch (see [11-deployment.md](11-deployment.md)).
- **What's new:** see the [10-implementation-plan.md](10-implementation-plan.md).

---

## Installation

Pick the option that fits your environment.

### Prebuilt binary

| No  | Platform | Architecture | Download Link                       | Note                          |
| --- | -------- | ------------ | ----------------------------------- | ----------------------------- |
| 1   | Linux    | amd64        | [Download `cv`][download-linux-amd64]  | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `cv`][download-linux-arm64]  | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `cv`][download-darwin-amd64] | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `cv`][download-darwin-arm64] | Static binary, no deps needed |

[download-linux-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-cv-latest/app-headless-cv-cv-linux-amd64
[download-linux-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-cv-latest/app-headless-cv-cv-linux-arm64
[download-darwin-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-cv-latest/app-headless-cv-cv-darwin-amd64
[download-darwin-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-cv-latest/app-headless-cv-cv-darwin-arm64

```bash
chmod +x cv
./cv init
./cv pdf -t classic/classic -o cv.pdf
```

> The pipeline cross-compiles all four platforms with `make build-all`; see
> [11-deployment.md](11-deployment.md). The binary is pure Go (no CGO) and ships
> as a standalone artifact.

### Build from source

Prefer to build it yourself? Clone, build, and use in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/headless/cv/languages/go
make build
./bin/cv init
```

See [11-deployment.md](11-deployment.md) for the CI artifact pipeline.

---

## Getting started

```bash
# scaffold a cv.yaml, then render it
./bin/cv init                          # writes cv.yaml
./bin/cv validate                      # required-field schema check
./bin/cv pdf -t classic/classic        # writes cv.pdf
./bin/cv md -o cv.md                   # writes a Markdown version

# serve the HTTP API
./bin/cv serve                         # POST /pdf, GET /health on :8080
```

---

## About

cv renders a resume from one YAML file into whichever format you need. The
content lives in `cv.yaml`; the look comes from a template. The same data
drives a PDF, a Markdown document, an HTTP request, or an MCP tool call.

- **One source file** — every section of the CV in plain YAML.
- **64 templates** — grouped by visual family, addressed as `<group>/<name>`.
- **Renders anywhere** — a standalone binary, an HTTP endpoint, or an MCP tool.

---

## Features

### 64 templates

Eight groups of eight, each a complete HTML document with an inline stylesheet:

- **classic** — ceremony, classic, elegant, inkwell, pinnacle, terra, topaz,
  vintage
- **minimal** — align, compact, lattice, minimal, quartz, simple, slate, zen
- **sidebar** — aurora, beacon, clean, dusk, harbor, iris, modern, nova
- **bands** — ember, executive, kinetic, meadow, sterling, summit, timber, wave
- **colorful** — amber, azure, glow, prism, pulse, saffron, sol, solstice
- **natural** — flora, grove, nectar, oasis, peaks, pine, ridge, tide
- **soft** — breeze, canvas, copper, coral, marble, opal, rose, sherbet
- **specialty** — academic, bold, creative, muse, orbit, professional, sierra,
  technical

```bash
./bin/cv pdf -t sidebar/aurora -o cv.pdf
```

### Export formats

- **PDF** — A4, zero margins, print-ready
- **Markdown** — portable `cv.md` for repositories and static sites
- **HTTP** — `POST /pdf` with a JSON body returns `application/pdf`
- **MCP** — `cv mcp serve` exposes tools over stdio to LLM clients

### Validation

`cv validate` checks the required fields (`personal`, at least one experience,
education, and skill group) and exits non-zero with the offending field name,
so a bad `cv.yaml` never produces a half-rendered PDF.

### No external engine

HTML is converted to PDF in-process by a pure-Go renderer. There is no
`wkhtmltopdf` binary, no headless Chrome, and no CGO to install.

---

## Next steps

- Curious what's coming? Check the [10-implementation-plan.md](10-implementation-plan.md).

---

## License

See [../../LICENSE](../../LICENSE).
