# Tech Stack

| Layer        | Choice                                    |
| ------------ | ----------------------------------------- |
| Language     | Go 1.27+ (module `landify`)               |
| CLI          | `github.com/spf13/cobra`                  |
| YAML parsing | `gopkg.in/yaml.v3` (strict `KnownFields`) |
| Rendering    | `html/template` (stdlib)                  |
| Desktop GUI  | `fyne.io/fyne/v2` (behind the `gui` tag)  |
| Terminal UI  | charmbracelet bubbletea + bubbles         |
| Assets       | `embed.FS` via `//go:embed`               |
| MCP          | Hand-rolled JSON-RPC 2.0 over stdio        |
| Testing      | Standard `go test`, table-driven tests    |

## Binaries

- `landify` — pure Go (no CGO), static, embeds templates/partials/examples;
  ships the `tui` terminal editor in every build.
- `landify-gui` — fyne desktop studio, CGO enabled, built separately via
  `make build-gui`.

## Build flags

See the configuration table in [ARCHITECTURE](04-architecture.md).
