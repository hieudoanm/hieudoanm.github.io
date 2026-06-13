# hieudoanm CLI — AGENTS.md

Go CLI toolbox using `github.com/spf13/cobra`. Root command is `hieudoanm`, wired in `cmd/root.go`.

## Project Structure

- `cmd/{module}/` — Each top-level module is its own Go package with a `NewCommand()` function
- `cmd/root.go` — Registers all modules as subcommands via `init()`
- `libs/` — Internal shared libraries (`requests/`, `chat/`, `colors/`)

## Conventions

### Naming

- Root command file: `cmd_{module}_root.go` (contains `func NewCommand()`)
- Subcommand files: `cmd_{module}_{subcommand}.go` (contain `func newXxxCmd()`, one per file)
- Service/helper files: `service_{topic}.go` (pure logic, no cobra commands)
- TUI files: `tui_{topic}.go` (bubbletea TUI model/view/update)
- Test files: `{source_file}_test.go` (same package, no `_test` suffix)
- One subcommand per file

### Flags & Error Handling

- `--json` flag: persistent flag on the module root, package-level `var jsonOutput bool`
- `RunE` pattern (return `error`), not `Run`
- Error messages are lowercase (Go convention)
- `fmt.Println` for output (not `cmd.Printf`)

### Imports

- Use `requests.Get()` from `libs/requests/` for HTTP calls (handles retries, timeouts, headers)

### Coding Style

- No comments in code unless explaining non-obvious logic
- Short functions (< 30 lines preferred)
- Error messages are lowercase (Go convention)
- `fmt.Println` for output (not `cmd.Printf`)

## Commands

Build: `go build ./...`
Vet: `go vet ./...`
Test all: `go test ./cmd/...`
Test single: `go test ./cmd/{module}/`
Lint: `golangci-lint run`

## Modules

24 modules registered in `cmd/root.go`. Key ones for AI agent use:

- **file** — 13 subcommands: checksum, chmod, count, duplicates, edit, grep, head, read, size, stats, tail, type, write
- **search** — 4 subcommands: files (glob find), text (content search), web (DuckDuckGo), code (symbol search for Go/TS/Python/Rust)
- **docsify** — Codebase analysis: symbol extraction, call graph, directory tree, Obsidian wiki-links
- **crypto** — Hash (MD5/SHA1/SHA256/SHA512), JWT, UUID, TOTP, AES encrypt/decrypt, password gen
- **net** — DNS, ping, HTTP client, WHOIS, TLS certs, WiFi scan, cloud service status
- **data** — JSON query/diff/merge, CSV view/export, YAML lint/validate
- **web** — YouTube info/transcript, Instagram scrape, Shopify check, weather, webpage screenshot
- **gemini** / **openrouter** — AI chat TUI with model picker
- **gh** — GitHub language stats SVG, license, coc, og image, gitignore
- **system** — Monitor (CPU/mem/disk), clipboard, env, path, disk usage, battery
- **time** — Cron parser, epoch, timer, pomodoro, world clock, age
- **calc** — Tax, loan, compound, currency, BMI, unit conversion, stats, date math
- **colors** — RGB/HEX/HSL/CMYK/OKLCH/HCL conversion, palette generation, color schemes
- **convert** — Text transforms: camel/kebab/snake/pascal, morse, braille, base64, url, slugify
- **casino** — Blackjack, poker (odds eval), baccarat, slots, coin, dice, roulette
- **chess** — FEN/PGN analysis, SVG board render, stockfish engine, ECO openings, chess.com integration
- **port** — TCP port check, find available, scan common ports
- **telegram** — Send message, manage webhooks
- **doi** — DOI fetch, APA citation, validate
- **english** — Word definitions from GitHub raw JSON
- **semver** — Validate, compare, sort, bump, prerelease, range constraints
- **version** — Show CLI version

## Recent Additions

### file module extensions (AI agent operations)

- `file read <file>` — Read with line numbers, offset, truncation (`--lines`, `--offset`, `--numbers`, `--json`)
- `file write <file> [content]` — Write/append from arg or stdin (`--append`, `--mkdir`, `--mode`, `--json`)
- `file edit <file> <old> <new>` — Find-and-replace (`--regex`, `--preview`, `--count`, `--json`)
- `file grep <pattern> [files...]` — Regex content search (`--include`, `--context`, `--fixed`, `--ignore-case`, `--max-count`, `--json`)
- `file` now has 13 subcommands total

### search module (universal search)

- `search files <pattern> [root]` — Find files by glob
- `search text <pattern> [files...]` — Search file contents by regex
- `search web <query>` — Web search via DuckDuckGo (no API key)
- `search code <symbol> [dir]` — Find code symbol definitions (Go/TS/Python/Rust)
- Tested: 28 tests across 6 test files

### Test coverage

- All 24 modules have per-file tests
- Run `go test ./cmd/...` — all packages pass
