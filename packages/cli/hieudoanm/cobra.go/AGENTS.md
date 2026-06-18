# hieudoanm CLI — AGENTS.md

Go CLI toolbox using `github.com/spf13/cobra`. Root command is `hieudoanm`, wired in `src/cmd/root.go`.

## Project Structure

- `src/cmd/{module}/` — Each top-level module is its own Go package with a `NewCommand()` function
- `src/cmd/root.go` — Registers all modules as subcommands via `init()`
- `src/libs/` — Internal shared libraries (`requests/`, `chat/`, `colors/`)

## Conventions

### Naming

Suffix convention — type comes last:
- Root command file: `{module}_root_cmd.go` (contains `func NewCommand()`)
- Subcommand files: `{module}_{subcommand}_cmd.go` (contain `func newXxxCmd()`, one per file)
- Service/helper files: `{topic}_service.go` (pure logic, no cobra commands)
- TUI files: `{topic}_tui.go` (bubbletea TUI model/view/update)
- Test files: `{source_file}_test.go` (same package, no `_test` suffix), e.g. `bmi_cmd_test.go`
- One subcommand per file

### Flags & Error Handling

- `--json` flag: persistent flag on the module root, package-level `var jsonOutput bool`
- `RunE` pattern (return `error`), not `Run`
- Error messages are lowercase (Go convention)
- `fmt.Println` for output (not `cmd.Printf`)

### Imports

- Use `requests.Get()` from `src/libs/requests/` for HTTP calls (handles retries, timeouts, headers)

### Coding Style

- No comments in code unless explaining non-obvious logic
- Short functions (< 30 lines preferred)
- Error messages are lowercase (Go convention)
- `fmt.Println` for output (not `cmd.Printf`)

## Commands

Build: `go build ./...`
Vet: `go vet ./...`
Test all: `go test ./src/cmd/...`
Test single: `go test ./src/cmd/{module}/`
Lint: `golangci-lint run`

## Modules

25 modules registered in `src/cmd/root.go`. Key ones for AI agent use:

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
- **mcp** — MCP server exposing all CLI tools to AI agents (`mcp serve`)

### MCP module

- `mcp serve` — Start MCP stdio server. Dynamically discovers all cobra commands and exposes them as 189 MCP tools.
- Tool naming: dot notation matching the CLI path (e.g., `file.read`, `search.files`, `calc.bmi`, `time.clock.now`)
- Each tool's JSON schema is auto-generated from cobra flag definitions. Flags appear as JSON properties; positional args go in `_args` array.
- In-process execution: flags are set directly, positional args passed to `RunE`, stdout captured via pipe.
- Protocol: JSON-RPC 2.0 over stdio (newline-delimited JSON)
- Library: `src/libs/mcp/` — protocol types and server loop
- Connect via any MCP client (Claude Code, Cursor, VS Code, etc.)
- Configure in `.mcp.json`:
```json
{"mcpServers":{"hieudoanm":{"command":"hieudoanm","args":["mcp","serve"]}}}
```
- TTY-dependent commands (system.monitor, gemini chat, etc.) may fail when run via MCP since no TTY is available.
- Build: `go build ./...` — Vet: `go vet ./...`

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
- Run `go test ./src/cmd/...` — all packages pass
