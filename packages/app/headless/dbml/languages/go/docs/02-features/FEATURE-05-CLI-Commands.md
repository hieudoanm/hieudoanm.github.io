# dbml (Go) — FEATURE-05: CLI Commands

The Cobra command surface: `sql`, `mermaid`, `svg`, `all`, `serve`, and `mcp`. Priority: **P0** (core platform, [`02-features.md`](../02-features.md) §2). dbml is a software demonstration, not a full database modeling tool.

## 1. User-visible behaviour

| Command | Effect | Default output |
| ------- | ------ | -------------- |
| `dbml sql [input.dbml]` | Parse and generate SQL | `initial_schema.sql` (`-o`) |
| `dbml mermaid [input.dbml]` | Parse and generate a Mermaid ERD | `database-erd.mmd` (`-o`) |
| `dbml svg [input.dbml]` | Parse and render an SVG diagram | `schema.svg` (`-o`) |
| `dbml all [input.dbml]` | Parse once, write all three formats | current directory (`-d`/`--output-dir`) |
| `dbml serve` | Start the HTTP API | port `8080` (`-p`/`--port`) |
| `dbml mcp serve` | Start the MCP server on stdio | — |

- The input file defaults to `schema.dbml`, so `dbml all` in a directory containing `schema.dbml` completes the whole workflow with no flags.
- Success prints one `Generated ...: <path>` line per artifact to stdout; failure prints a single `dbml: <message>` line to stderr (usage is never dumped — `SilenceUsage`). Both outcomes currently exit 0 — see the exit-status gap in §5.
- `dbml --version` prints `dbml dev` for a default `make build`; `dbml --help` shows the command list and examples.
- `dbml serve` prints a startup box with the local URL, a network URL when reachable, and the Swagger UI link, then listens until SIGINT/SIGTERM prints `Shutting down server...` and exits 0.
- `dbml serve --debug` raises the logger to debug level; by default the logger (a text `slog` handler on stderr) only emits warnings and above.

## 2. Inputs

| Input | Notes |
| ----- | ----- |
| Positional argument | at most one input file path (`cobra.MaximumNArgs(1)`) |
| `-o` / `--output` | output file for `sql`, `mermaid`, `svg` |
| `-d` / `--output-dir` | output directory for `all` (default `.`, created with `os.MkdirAll`) |
| `-p` / `--port` | listen port for `serve` (default `8080`) |
| `--debug` | debug logging for `serve` |
| `-h`, `-v` | help and version |

dbml reads no environment variables and has no config files; flags are the only configuration ([`04-architecture.md`](../04-architecture.md) §7).

## 3. Outputs

- Files written with mode `0644`: the selected format for single-format commands, or `initial_schema.sql`, `database-erd.mmd`, and `schema.svg` for `all`.
- One success line per written file on stdout; errors on stderr.
- Long-running behaviour: `serve` and `mcp serve` run until interrupted or (for MCP) until stdin closes.

## 4. States

Per [`02-features.md`](../02-features.md) §4, all CLI states are required for MVP: progress is a single-shot run (the conversion pipeline `idle → parsing → generated → complete`, [`05-data-model.md`](../05-data-model.md) §5), success is the stdout confirmation lines, and failure is the `dbml: ...` stderr line (with exit status 0 even on failure — see §5). There is no interactive or empty-input prompt: a run either produces output files or fails.

## 5. Edge cases

- **No arguments** — the default `schema.dbml` is used; if it does not exist the command fails with `dbml: parse DBML: open file: ...`.
- **Too many arguments** — more than one positional file is rejected by Cobra with `dbml: accepts at most 1 arg(s), received 2` on stderr (and, like every failure, exit status 0).
- **Exit-status gap** — `main.go` calls `cmd.Execute()` and discards its return value, so the process exits 0 on every failure, including missing input files and unwritable outputs; only stderr distinguishes success from failure. Scripts and CI must parse the `dbml: ...` line.
- **Output directory missing** — `all` creates it (`0755`); a single-format command with an unwritable `-o` path fails with `dbml: write output: ...`.
- **Existing output files** — silently overwritten (write truncates); generation is deterministic, so re-running is idempotent for identical input.
- **Partial `all` failure** — files are written in order (SQL, then Mermaid, then SVG); a failure stops the run and names the artifact that failed (`write SQL: ...`, `write Mermaid: ...`, `write SVG: ...`).
- **`dbml mcp` alone** — prints the `mcp` command help; `dbml mcp serve` takes no extra arguments (`cobra.NoArgs`).
- **Startup box** — rendered by `cmd/box.go` for `serve`; it is a helper, not a `box` subcommand. The registered commands are exactly the six above plus Cobra's built-ins (`help`, `completion`).
- **Signals** — `serve` exits 0 on the first SIGINT/SIGTERM after printing its shutdown line; `mcp serve` cancels its context on SIGINT/SIGTERM and stops the stdio loop.

## 6. Acceptance conditions

- The MVP core workflow runs end to end: `dbml sql`, `dbml mermaid`, `dbml svg`, and `dbml all --output-dir ./output` each succeed against a valid `schema.dbml` ([`02-features.md`](../02-features.md) §4).
- `dbml --help` documents the same six commands and defaults as this page and [`README.md`](../README.md).
- Every failure reports one actionable `dbml: ...` message identifying what failed and which file was involved ([`01-requirements/functional-requirements.md`](../01-requirements/functional-requirements.md), FR-011). A non-zero exit status on failure is not yet met by the implementation (see §5).
- CLI behaviour is covered by table-driven tests ([`09-testing-strategy.md`](../09-testing-strategy.md) §3), and `make all` (format, lint, test, build) passes before handoff ([`08-tech-stack.md`](../08-tech-stack.md) §7).

## Cross-references

- Requirements: [`../01-requirements.md`](../01-requirements.md) · [`FR-006`](../01-requirements/functional-requirements.md)
- Feature index: [`02-features.md`](../02-features.md)
- Sibling features: [`FEATURE-06-HTTP-Server.md`](./FEATURE-06-HTTP-Server.md) · [`FEATURE-08-Error-Handling.md`](./FEATURE-08-Error-Handling.md)
- User stories: [`03-user-stories.md`](../03-user-stories.md) — US-005, US-008
- Architecture: [`04-architecture.md`](../04-architecture.md)
- Deployment: [`11-deployment.md`](../11-deployment.md)
