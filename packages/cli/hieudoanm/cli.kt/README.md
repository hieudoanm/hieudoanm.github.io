# `hieudoanm`

Personal CLI toolbox built with [Clikt](https://github.com/ajalt/clikt) and Kotlin — a peer implementation of the Go CLI at `../cobra.go/`.

## Features

- **200+ commands** across 26 modules: calc, casino, chess, colors, convert, crypto, data, docsify, doi, english, file, gemini, gh, image, mcp, net, openapi, openrouter, port, search, semver, system, telegram, time, version, web
- Shell completion (bash/zsh/fish) via `completion --shell <shell>`
- AI-powered subcommands (gemini, openrouter) via OpenRouter/Google Gemini APIs
- MCP server (`mcp serve`) that exposes all tools to AI agents via JSON-RPC over stdio
- Structured JSON output via `--json` flag on supported commands

## Install

### Prerequisites

- JDK 21+
- Gradle (or use the Gradle wrapper)

### Build

```bash
./gradlew build
```

### Run directly

```bash
./gradlew run --args="calc bmi 70 175"
```

### Fat JAR

```bash
./gradlew jar
java -jar build/libs/cli.kt-0.0.1.jar <command>
```

## Usage

### Shell completion

```bash
# Add to ~/.bashrc
source <(hieudoanm completion --shell bash)

# Add to ~/.zshrc
source <(hieudoanm completion --shell zsh)

# Fish
hieudoanm completion --shell fish > ~/.config/fish/completions/hieudoanm.fish
```

### Quick examples

```bash
hieudoanm calc bmi 70 175          # BMI calc (metric)
hieudoanm casino poker odds "Ah Kh" --simulations 1000
hieudoanm casino baccarat strategy --simulations 50000
hieudoanm colors convert-hex "#ff6600" --to hsl
hieudoanm convert base64 encode "hello world"
hieudoanm crypto hash sha256 "data"
hieudoanm doi fetch 10.1000/xyz123
hieudoanm file read README.md --lines 10
hieudoanm net ping example.com
hieudoanm search files --pattern "*.kt"
hieudoanm semver bump --minor --version 1.2.3
hieudoanm time world --zone Asia/Tokyo
hieudoanm version
```

### AI chat

```bash
hieudoanm gemini code "write a fibonacci function"
hieudoanm openrouter models                    # list models
hieudoanm openrouter code "explain monads"     # chat via OpenRouter
```

### MCP server

```json
{
  "mcpServers": {
    "hieudoanm": {
      "command": "hieudoanm",
      "args": ["mcp", "serve"]
    }
  }
}
```

Connect any MCP client (Claude Code, Cursor, VS Code, etc.) to expose all 180+ tools as MCP tools.

## Modules

| Module | Description | Key subcommands |
|--------|------------|-----------------|
| calc | Math & finance | bmi, tax, loan, currency, compound, stats, eval, random, prime, gcd, lcm |
| casino | Casino games | coin, dice, roulette, slots/play, baccarat/{play,strategy}, blackjack/{play,count}, poker/odds |
| chess | Chess analysis | fen-eval, fen-svg, pgn/{fen,uci}, elo, play, random, com/{player,leaderboards,titled} |
| colors | Color tools | convert-{hex,rgb,hsl,oklch,hcl}, palette, random |
| convert | Text transforms | {base64,morse,braille,camel,kebab,snake,pascal,slug,url} |
| crypto | Crypto ops | hash, jwt/{encode,decode}, uuid, totp, encrypt, decrypt, keygen, passwd |
| data | Data formats | json, csv, yaml |
| docsify | Code analysis | tree, scan, obsidian, cobra |
| doi | DOI resolution | fetch, cite, ref, validate |
| english | Dictionary | define |
| file | File ops | read, write, edit, grep, head, tail, checksum, chmod, count, duplicates, size, stats, type |
| gemini | Google Gemini AI | code |
| gh | GitHub utils | languages, license, coc, ignore, og |
| history | Command history | list, search, clear, stats |
| image | Image utils | info, convert, dominant |
| mcp | MCP server | serve |
| net | Network | dns, ping, http, ip, whois, cert/{info,check}, wifi, status, info, check, serve |
| openapi | OpenAPI | validate, openapi2postman |
| openrouter | OpenRouter AI | code, models, serve, status, hook |
| port | Port utils | check, find, scan |
| search | Search tools | files, text, code, web |
| semver | Semver ops | validate, compare, sort, bump, range |
| system | System info | info, env, path, disk, battery, clipboard, monitor |
| telegram | Telegram | message/send, webhook/{set,info,delete} |
| time | Time tools | clock/now, epoch, cron, world, timer, stopwatch, pomodoro, age, until |
| version | CLI version | — |
| web | Web tools | weather, snapshot, shopify/detect, instagram/download, youtube/{fetch,thumbnails}, simplify/{csv,md} |

## Development

### Build

```bash
./gradlew build
```

### Test

```bash
./gradlew test
```

### Lint / format

(Add `ktlint` or `detekt` as desired)

### Add a new command

1. Create a class extending `CliktCommand` in `commands/` (one file per command)
2. Register it via `subcommands()` in the parent command
3. Rebuild: `./gradlew compileKotlin`

### Project structure

```
src/main/kotlin/io/github/hieudoanm/cli/
├── Main.kt              # Entry point, root command, subcommand registration
├── commands/            # All command implementations (one per module)
│   ├── Calc.kt
│   ├── Casino.kt
│   ├── Completion.kt
│   ├── Mcp.kt
│   └── ...
└── services/            # Shared utilities
    ├── Mcp.kt           # MCP server runtime
    ├── History.kt       # Command history tracking
    ├── Requests.kt      # HTTP client wrapper
    └── Formatting.kt    # Text formatting helpers
```

## LICENSE

[GPL-3.0](./LICENSE)
