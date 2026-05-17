# hieudoanm CLI

Personal CLI toolbox with 25+ modules covering system monitoring, crypto, file operations, search, color conversion, chess analysis, and more.

## Modules

| Module | Description |
|--------|-------------|
| `calc` | Financial calculators (tax, loan, compound, BMI, unit conversion, stats, date math) |
| `casino` | Blackjack, poker odds, baccarat, slots, coin, dice, roulette |
| `chess` | FEN/PGN analysis, SVG board render, Stockfish engine, ECO openings, Chess.com |
| `colors` | RGB/HEX/HSL/CMYK/OKLCH/HCL conversion, palette generation |
| `convert` | Text transforms (camel/kebab/snake/pascal, morse, braille, base64, url, slugify) |
| `crypto` | Hash (MD5/SHA1/SHA256/SHA512), JWT, UUID, TOTP, AES encrypt/decrypt, password gen |
| `data` | JSON query/diff/merge, CSV view/export, YAML lint/validate |
| `docsify` | Codebase analysis (symbol extraction, call graph, directory tree, Obsidian wiki-links) |
| `doi` | DOI fetch, APA citation, validate |
| `english` | Word definitions |
| `file` | Read, write, edit, grep, checksum, chmod, count, duplicates, head, tail, size, stats, type |
| `gemini` | AI chat TUI with Gemini |
| `gh` | GitHub language stats SVG, license, CoC, OG image, gitignore |
| `history` | Command history tracking, search, stats |
| `image` | Image conversion, dominant color, info |
| `mcp` | MCP server exposing all CLI tools to AI agents |
| `net` | DNS, ping, HTTP client, WHOIS, TLS certs, WiFi, cloud status |
| `openapi` | OpenAPI validation, Postman export |
| `openrouter` | AI chat TUI with OpenRouter, model picker |
| `port` | TCP port check, find available, scan common ports |
| `search` | Files (glob), text (regex), web (DuckDuckGo), code symbols (Go/TS/Python/Rust) |
| `semver` | Validate, compare, sort, bump |
| `system` | Monitor (CPU/mem/disk), clipboard, env, path, disk usage, battery |
| `telegram` | Send messages, manage webhooks |
| `time` | Cron parser, epoch, timer, pomodoro, world clock, age, stopwatch |
| `version` | Show CLI version |
| `web` | YouTube info/transcript, Shopify check, weather, webpage screenshot, content simplify |

## Usage

```bash
hieudoanm <module> <command> [flags]
```

All modules support `--json` (`-j`) for JSON output.

## Development

```bash
go build ./...
go test ./...
go vet ./...
```

## MCP Server

Start the MCP server for AI agent integration:

```bash
hieudoanm mcp serve
```

See `AGENTS.md` for detailed development conventions.
