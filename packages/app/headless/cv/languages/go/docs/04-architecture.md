# Architecture

## Tech Stack

| Layer        | Choice                                        |
| ------------ | --------------------------------------------- |
| Language     | Go 1.27+ (module `cv`)                        |
| CLI          | `github.com/spf13/cobra`                      |
| YAML parsing | `gopkg.in/yaml.v3`                            |
| Templating   | `text/template` (stdlib)                      |
| HTML → PDF   | `github.com/chinmay-sawant/gowkhtmltopdf`     |
| HTTP         | Standard `net/http`                           |
| MCP          | Hand-rolled JSON-RPC 2.0 over stdio           |
| Testing      | Standard `go test`, table-driven tests        |

No network calls and no external services. The binary is pure Go — it compiles
with `CGO_ENABLED=0` and ships as a standalone artifact with no external assets
beyond the template directory.

`text/template` is used rather than `html/template` on purpose: the templates
embed a full inline `<style>` block and the CV content is authored in the YAML
file, so HTML auto-escaping would corrupt both. The data is trusted input
produced by the user who runs the tool.

## Directory Structure

```txt
go/
├── main.go              # Entrypoint (package main) — calls cmd.Execute()
├── cmd/                 # Cobra command wiring (thin — delegate to internal)
│   ├── root.go          # root command, Execute()
│   ├── init.go          # cv init  — write a default cv.yaml
│   ├── validate.go      # cv validate [file] — schema checks
│   ├── pdf.go           # cv pdf — render a template to PDF
│   ├── md.go            # cv md  — render a Markdown representation
│   ├── serve.go         # cv serve — HTTP POST /pdf, GET /health
│   └── mcp.go           # cv mcp serve — JSON-RPC over stdio
├── internal/
│   ├── cv/
│   │   ├── types.go     # CVData and nested section structs
│   │   └── cv.go        # LoadCV, WriteDefaultCV, ListTemplates, GeneratePDF
│   └── mcp/
│       └── protocol.go  # JSON-RPC 2.0 envelope + stdio server
├── templates/           # 8 groups × 8 templates = 64
│   ├── bands/           # ember, executive, kinetic, meadow, sterling,
│   │                    #   summit, timber, wave
│   ├── classic/         # ceremony, classic, elegant, inkwell, pinnacle,
│   │                    #   terra, topaz, vintage
│   ├── colorful/        # amber, azure, glow, prism, pulse, saffron,
│   │                    #   sol, solstice
│   ├── minimal/         # align, compact, lattice, minimal, quartz,
│   │                    #   simple, slate, zen
│   ├── natural/         # flora, grove, nectar, oasis, peaks, pine,
│   │                    #   ridge, tide
│   ├── sidebar/         # aurora, beacon, clean, dusk, harbor, iris,
│   │                    #   modern, nova
│   ├── soft/            # breeze, canvas, copper, coral, marble, opal,
│   │                    #   rose, sherbet
│   └── specialty/       # academic, bold, creative, muse, orbit,
│                        #   professional, sierra, technical
├── bin/                 # Build output directory (git-ignored)
├── go.mod
├── go.sum
├── Makefile
├── Dockerfile
└── docs/                # This documentation set
```

Generated example artifacts live in the app directory at
`packages/app/headless/cv/examples/`:

```txt
examples/
├── cv.yaml              # canonical populated CV (source for every theme)
├── cv.md                # cv md output
└── themes/<group>/<name>.pdf
```

## Pipeline

```txt
cv.yaml ─(LoadCV, yaml.v3)─► CVData
    │
    ├─(renderTemplate, text/template)─► HTML
    │        templates/<group>/<name>.html
    │            └─(gowkhtmltopdf)─► PDF bytes ─► -o output file
    │
    ├─(generateMarkdown, strings.Builder)─► cv.md
    │
    ├─ HTTP  POST /pdf (JSON body)─► CVData ─► GeneratePDF ─► application/pdf
    │
    └─ MCP  stdio, newline-delimited JSON-RPC 2.0 ─► tools/call
```

Every command is a thin wrapper: it parses flags, loads the CV once, and hands
the data to `internal/cv`. Nothing in `cmd/` contains rendering logic.

## Modules

### Data model (`internal/cv/types.go`)

`CVData` is the single in-memory representation, decoded from YAML and from the
HTTP request body. It carries ten sections:

| Field            | Type              | YAML key         |
| ---------------- | ----------------- | ---------------- |
| `Personal`       | `Personal`        | `personal`       |
| `Summary`        | `string`          | `summary`        |
| `Experience`     | `[]Experience`    | `experience`     |
| `Education`      | `[]Education`     | `education`      |
| `Projects`       | `[]Project`       | `projects`       |
| `Skills`         | `[]SkillGroup`    | `skills`         |
| `Certifications` | `[]Certification` | `certifications` |
| `Languages`      | `[]Language`      | `languages`      |
| `Interests`      | `string`          | `interests`      |
| `References`     | `[]Reference`     | `references`     |

`Personal` holds `fullName`, `jobTitle`, `email`, `phone`, `address`,
`website`, `linkedin`, and `github`. Every list entry has a stable `id` field,
and both `yaml` and `json` struct tags are declared so the same struct serves
the CLI and the HTTP API. Optional fields (for example `education.gpa`,
`education.relevantSubjects`, `projects.organization`) are omitted from output
when empty.

### Loading & generation (`internal/cv/cv.go`)

- `LoadCV(path)` — reads the file and unmarshals it into `CVData`.
- `WriteDefaultCV(path)` — writes the annotated starter `cv.yaml` used by
  `cv init`.
- `ListTemplates()` — walks `templates/` and returns every template's path
  relative to that directory with the `.html` suffix stripped, e.g.
  `classic/classic`. Falls back to `classic/classic` when the directory is
  empty. The walk is lexical, so the first entry is `bands/ember`.
- `GeneratePDF(data, template, output)` — renders the template and writes the
  PDF through `gowkhtmltopdf` at A4 with zero margins (the templates draw their
  own page padding):

  ```go
  doc := gwkhtmltopdf.NewDocument(gwkhtmltopdf.Page{
      Source: gwkhtmltopdf.HTML([]byte(htmlContent)),
  })
  doc.PageSize = "A4"
  doc.Margin = gwkhtmltopdf.Margin{Top: 0, Right: 0, Bottom: 0, Left: 0}
  doc.WritePDF(ctx, out)
  ```

- `renderTemplate(data, template)` — resolves and executes the template:
  1. try `templates/<template>.html`;
  2. otherwise walk `templates/` for a file whose path relative to
     `templates/` (minus `.html`) equals the requested name (this is what makes
     `classic/classic` work);
  3. otherwise fall back to `templates/classic/classic.html`;
  4. otherwise emit a minimal built-in HTML document.

### Templates (`templates/`)

Each template is a complete, self-contained HTML document with an inline
`<style>` block, so it renders identically whether it is opened in a browser or
fed to the PDF engine. Templates are addressed as `<group>/<name>` (see the
group listing above). They are grouped by visual family rather than by layout:
within a group the eight members share a structure and differ in palette,
typography, and accents.

> `cv pdf` with no `-t` uses the first template returned by
> `ListTemplates()` — currently `bands/ember`.

### CLI commands (`cmd/`)

All commands are thin Cobra wrappers that delegate to `internal/cv`:

| Command            | Flags                              | Purpose                              |
| ------------------ | ---------------------------------- | ------------------------------------ |
| `init`             | —                                  | Write a default `cv.yaml`           |
| `validate [file]`  | —                                  | Check required fields (exit 1 on error) |
| `pdf`              | `-i`, `-o`, `-t`                   | Render a template to PDF            |
| `md`               | `-i`, `-o`                         | Render Markdown                     |
| `serve`            | —                                  | HTTP server (`PORT`, default 8080)  |
| `mcp serve`        | —                                  | MCP server over stdio               |

`cmd/root.go` sets `SilenceUsage` and `SilenceErrors`, so a failing command
prints one actionable line (`cv: ...`) rather than a usage dump.

### HTTP server (`cmd/serve.go`)

`cv serve` exposes two routes on `net/http`'s default mux:

| Method | Endpoint  | Description                                      |
| ------ | --------- | ------------------------------------------------ |
| POST   | `/pdf`    | Decode a `CVData` JSON body, render, return PDF  |
| GET    | `/health` | `{"status":"ok"}`                                |

`POST /pdf` accepts an optional `?template=<group>/<name>` query parameter and
falls back to the first template. The rendered PDF is written to a temp file,
served, and deleted. The listen port comes from the `PORT` environment variable
(default `8080`).

### MCP server (`internal/mcp/protocol.go`)

`cv mcp serve` speaks newline-delimited JSON-RPC 2.0 over stdio, which is the
transport MCP clients (Claude Code, Cursor, VS Code) expect. It implements
`initialize`, `tools/list`, and `tools/call`. The advertised tools are
`cv_init`, `cv_pdf`, and `cv_templates`.

> The `tools/call` handlers are presently stubs that return `"ok"`; wiring them
> to `internal/cv` is tracked in [10-implementation-plan.md](10-implementation-plan.md).

## Configuration

`cv` reads no config files. Everything is a flag or an environment variable:

| Source           | Name    | Default    | Purpose                    |
| ---------------- | ------- | ---------- | -------------------------- |
| `pdf` flag       | `-t`    | first template | Template as `group/name` |
| `pdf`/`md` flag  | `-i`    | `cv.yaml`  | Input YAML file            |
| `pdf` flag       | `-o`    | `cv.pdf`   | Output PDF file            |
| `md` flag        | `-o`    | `cv.md`    | Output Markdown file       |
| environment      | `PORT`  | `8080`     | HTTP listen port (`serve`) |

## Dependencies

Direct dependencies:

- `github.com/spf13/cobra` — CLI framework
- `gopkg.in/yaml.v3` — YAML decoding
- `github.com/chinmay-sawant/gowkhtmltopdf` — HTML → PDF rendering

`gowkhtmltopdf` pulls in a number of pure-Go transitive dependencies (font and
TeX layout, `tdewolff/canvas`, Brotli, `goldmark`). It replaces the archived
`wkhtmltopdf` binary: it needs no external process and no CGO, which is why the
`Makefile` builds with `CGO_ENABLED=0`.

Before adding a dependency:

1. Check whether the standard library can solve the problem.
2. Check whether the dependency is actively maintained.
3. Check its licence.
4. Check its size and transitive dependencies.
5. Check whether it meaningfully improves the project.

Avoid dependency creep.
